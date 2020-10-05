<template>
  <v-app>
    <v-app-bar app dark class="dn-color">
      <v-toolbar-title class="mr-3"> NU Salaries </v-toolbar-title>
      <v-btn to="/" text>Employees</v-btn>
      <v-btn to="/departments" text>Departments</v-btn>
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

<style>
.dn-color {
  background-color: #ba1f1f !important;
}
</style>
