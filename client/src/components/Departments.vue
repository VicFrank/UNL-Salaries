<template>
  <div>
    <h1 class="text-center">Departments</h1>
    <v-data-table
      :headers="headers"
      :items="departments"
      :items-per-page="15"
      class="elevation-1 mt-3 table"
    >
      <template v-slot:[salary]="{ item }">{{
        item.total_salary | dollarize
      }}</template>
      <template v-slot:[avg_salary]="{ item }">{{
        item.avg_salary | dollarize
      }}</template>
      <template v-slot:[department_name]="{ item }">
        <router-link :to="`/departments/${item.department_name}`">{{
          item.department_name
        }}</router-link>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Department", value: "department_name" },
        { text: "Employees", value: "num_employees", align: "center" },
        { text: "Total Salaries", value: "total_salary", align: "right" },
        { text: "Avg Salary", value: "avg_salary", align: "right" },
      ],
      departments: [],
    };
  },

  computed: {
    salary() {
      return `item.total_salary`;
    },
    avg_salary() {
      return `item.avg_salary`;
    },
    department_name() {
      return `item.department_name`;
    },
  },

  created() {
    fetch(`/api/salaries/departments`)
      .then((res) => res.json())
      .then((departments) => {
        this.departments = departments;
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