<template>
  <v-data-table
    :headers="headers"
    :items="salaries"
    :items-per-page="20"
    class="elevation-1 mt-3 table"
  >
    <template v-slot:[full_name]="{ item }">
      <router-link :to="`/employees/${item.full_name}`">{{
        item.full_name
      }}</router-link>
    </template>
    <template v-slot:[salary]="{ item }">{{
      item.total_salary | dollarize
    }}</template>
    <template v-slot:[positions]="{ item }">{{ item.positions[0] }}</template>
    <template v-slot:[campuses]="{ item }">{{
      parseCampuses(item.campuses)
    }}</template>
    <template v-slot:[departments]="{ item }">
      <router-link :to="`/departments/${item.departments[0]}`">{{
        item.departments[0]
      }}</router-link>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    salaries: Array,
  },
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
        { text: "Salary", value: "total_salary", align: "right" },
      ],
    };
  },

  computed: {
    full_name() {
      return `item.full_name`;
    },
    salary() {
      return `item.total_salary`;
    },
    positions() {
      return `item.positions`;
    },
    campuses() {
      return `item.campuses`;
    },
    departments() {
      return `item.departments`;
    },
  },

  methods: {
    parseCampuses(campuses) {
      return campuses.join(", ");
    },
  },
};
</script>

<style scoped>
.table {
  max-width: 1200px;
  margin: auto;
}
</style>
