<template>
  <v-data-table
    :headers="headers"
    :items="salaries"
    dense
    items-per-page="100"
    class="elevation-1 mt-3"
  ></v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "full_name",
        },
        { text: "Campus", value: "campuses" },
        { text: "Departments", value: "departments" },
        { text: "Positions", value: "positions" },
        { text: "Salary", value: "total_salary" },
      ],
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

<style scoped></style>
