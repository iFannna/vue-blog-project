import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/home/Home.vue";
import LoginView from "@/views/login/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomeView,},
    { path: "/login", component: LoginView,}
  ],
});

export default router;
