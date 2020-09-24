<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        <v-btn to="/" text>Salaries</v-btn>
        <v-btn to="/departments" text>Departments</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn href="http://www.dailynebraskan.com" target="_blank" text>
        <span class="mr-2">Daily Nebraskan</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
