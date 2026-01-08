import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import Auth from "./views/Auth.vue";
import Chat from "./views/Chat.vue";

const routes = [
  { path: "/auth", component: Auth },
  { path: "/", component: Chat },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount("#app");
