import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import Auth from "./views/Auth.vue";
import Chat from "./views/Chat.vue";
import Settings from "./views/Settings.vue";

const routes = [
  { path: "/", component: Chat, meta: { requiresAuth: true } },
  { path: "/auth", component: Auth, meta: { requiresAuth: false } },
  { path: "/settings", component: Settings, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("token");
    if (token) {
      next();
    } else {
      next("/auth");
    }
  } else {
    next();
  }
});

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount("#app");
