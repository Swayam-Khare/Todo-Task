import { createApp } from "vue";
import { createPinia } from "pinia";
// import router from "../routes.js";

import App from "./App.vue";
import "../assets/main.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
// app.use(router);
app.mount("#app");
