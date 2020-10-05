<template>
  <div>
    <v-card class="table">
      <v-card-title>
        Departments
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="departments"
        :items-per-page="15"
        :footer-props="{
          itemsPerPageOptions: [15, 25, 100, -1],
        }"
        :search="search"
        class="elevation-1 mt-3"
      >
        <template v-slot:[salary]="{ item }">{{
          item.total_salary | dollarize
        }}</template>
        <template v-slot:[avg_salary]="{ item }">{{
          item.avg_salary | dollarize
        }}</template>
        <template v-slot:[department_name]="{ item }">
          <router-link
            :to="`/departments/${item.department_name}-${item.campus_name}`"
            >{{ item.department_name }}</router-link
          >
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Department", value: "department_name" },
        { text: "Campus", value: "campus_name" },
        { text: "Employees", value: "num_employees", align: "center" },
        { text: "Total Salaries", value: "total_salary", align: "right" },
        { text: "Avg Salary", value: "avg_salary", align: "right" },
      ],
      departments: [],
      search: "",
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
  max-width: 650px;
  margin: auto;
}
</style>