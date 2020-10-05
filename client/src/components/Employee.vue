<template>
  <div>
    <h1 class="text-center">{{ employee_name }}</h1>
    <h4 class="text-center font-weight-light">
      {{ total_salary | dollarize }}
    </h4>
    <v-data-table
      :headers="headers"
      :items="salaries"
      :items-per-page="salaries.length"
      hide-default-footer
      class="elevation-1 mt-3 table"
    >
      <template v-slot:[budgeted_salary]="{ item }">{{
        item.budgeted_salary | dollarize
      }}</template>
      <template v-slot:[state_salary]="{ item }">{{
        item.state_salary | dollarize
      }}</template>
      <template v-slot:[other_salary]="{ item }">{{
        item.other_salary | dollarize
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
        { text: "Campus", value: "campus_name" },
        { text: "Position", value: "position_name", align: "right" },
        { text: "Total Salary", value: "budgeted_salary", align: "right" },
        { text: "State Salary", value: "state_salary", align: "right" },
        { text: "Other Salary", value: "other_salary", align: "right" },
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
    state_salary() {
      return "item.state_salary";
    },
    other_salary() {
      return "item.other_salary";
    },
    total_salary() {
      return this.salaries.reduce((a, b) => a + b.budgeted_salary, 0);
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
  max-width: 800px;
  margin: auto;
}
</style>