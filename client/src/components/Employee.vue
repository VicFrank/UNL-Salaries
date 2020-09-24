<template>
  <div>
    <h1 class="text-center">{{employee_name}}</h1>
    <v-data-table
      :headers="headers"
      :items="salaries"
      :items-per-page="salaries.length"
      hide-default-footer
      class="elevation-1 mt-3 table"
    >
      <template v-slot:[budgeted_salary]="{ item }">{{ item.budgeted_salary | dollarize }}</template>
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
        { text: "Campus", value: "campus_name" },
        { text: "Position", value: "position_name", align: "right" },
        { text: "Salary", value: "budgeted_salary", align: "right" },
      ],
    };
  },

  computed: {
    employee_name() {
      return this.$route.params.name;
    },
    budgeted_salary() {
      return "item.budgeted_salary";
    },
  },

  created() {
    fetch(`/api/salaries/employees/${this.employee_name}`)
      .then((res) => res.json())
      .then((salaries) => {
        this.salaries = salaries;
      });
  },
};
</script>

<style scoped>
.table {
  max-width: 600px;
  margin: auto;
}
</style>