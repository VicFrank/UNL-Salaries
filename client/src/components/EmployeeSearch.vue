<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    :filter="customFilter"
    color="white"
    hide-no-data
    hide-selected
    item-text="Description"
    item-value="API"
    label="Employees"
    placeholder="Search by name..."
    prepend-icon="mdi-database-search"
    return-object
  ></v-autocomplete>
</template>

<script>
export default {
  model: {
    prop: "model",
    event: "change",
  },

  props: {
    model: String,
  },

  data: () => ({
    employees: [],
    isLoading: false,
    search: null,
  }),

  computed: {
    items() {
      return this.employees.map((entry) => {
        return entry.full_name;
      });
    },
  },

  methods: {
    customFilter(item, queryText, itemText) {
      const fullName = itemText.toLowerCase();
      const itemWords = fullName.split(" ");
      const searchText = queryText.toLowerCase();
      const searchWords = searchText.split(" ");

      const isSubstring = fullName.indexOf(searchText) > -1;

      let matchingNames = true;

      // if every word in the search matches a word in the item
      for (let searchWord of searchWords) {
        let foundMatch = false;
        for (let itemWord of itemWords) {
          foundMatch = foundMatch || itemWord.indexOf(searchWord) > -1;
        }
        matchingNames = matchingNames && foundMatch;
      }

      return isSubstring || matchingNames;
    },
  },

  watch: {
    search() {
      // Items have already been loaded
      if (this.employees.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch("/api/employees")
        .then((res) => res.json())
        .then((res) => {
          this.employees = res;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
    model() {
      this.$emit("change", this.model);
      this.$router.push(`/employees/${this.model}`);
    },
  },
};
</script>

<style>
</style>