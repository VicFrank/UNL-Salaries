<template>
  <div>
    <v-card dark color="blue darken-3 mb-3 filters">
      <v-container fluid>
        <EmployeeSearch v-model="employeeName" />
      </v-container>
    </v-card>

    <EmployeesTable :salaries="salaries" />
  </div>
</template>

<script>
import EmployeesTable from "./EmployeesTable";
import EmployeeSearch from "./EmployeeSearch";

export default {
  components: {
    EmployeesTable,
    EmployeeSearch,
  },

  data() {
    return {
      employeeName: null,
      salaries: [],
    };
  },

  created() {
    fetch(`/api/salaries`)
      .then((res) => res.json())
      .then((salaries) => {
        this.salaries = salaries;
      });
  },
};
</script>

<style scoped>
.filters {
  margin: auto;
  max-width: 1200px;
}
</style>