import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

import filters from "./filters/filters";
import router from "./router/router";

filters.create(Vue);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
