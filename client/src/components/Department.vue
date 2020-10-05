<template>
  <div>
    <h1 class="text-center">{{ departmentName }} {{ campusName }}</h1>
    <v-data-table
      :headers="headers"
      :items="salaries"
      :items-per-page="salaries.length"
      hide-default-footer
      class="elevation-1 mt-3 table"
    >
      <template v-slot:[full_name]="{ item }">
        <router-link :to="`/employees/${item.full_name}`">{{
          item.full_name
        }}</router-link>
      </template>
      <template v-slot:[budgeted_salary]="{ item }">{{
        item.budgeted_salary | dollarize
      }}</template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      salaries: [],
      headers: [
        {
          text: "Name",
          align: "start",
          value: "full_name",
        },
        { text: "Position", value: "position_name", align: "right" },
        { text: "Salary", value: "budgeted_salary", align: "right" },
      ],
    };
  },

  computed: {
    name() {
      return this.$route.params.name;
    },
    campusName() {
      return this.name.split("-")[0];
    },
    departmentName() {
      return this.name.split("-")[1];
    },
    budgeted_salary() {
      return "item.budgeted_salary";
    },
    full_name() {
      return "item.full_name";
    },
  },

  created() {
    if (!this.campusName || !this.departmentName) this.$router.push(`/404`);

    fetch(`/api/salaries/departments/${this.name}`)
      .then((res) => res.json())
      .then((salaries) => {
        this.salaries = salaries;
      });
  },
};
</script>

<style scoped>
.table {
  max-width: 1000px;
  margin: auto;
}
</style>