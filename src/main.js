import { createApp } from "vue";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import router from "./router";

import { createPinia } from "pinia";

import axios from "axios";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.config.globalProperties.$axios = axios;

app.mount("#app");
