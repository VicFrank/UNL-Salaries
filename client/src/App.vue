<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>

      <v-btn href="http://www.dailynebraskan.com" target="_blank" text>
        <span class="mr-2">Daily Nebraskan</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <Employees />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Employees from "./components/Employees";
export default {
  name: "App",

  components: {
    Employees,
  },

  data: () => ({
    //
  }),
};
</script>
