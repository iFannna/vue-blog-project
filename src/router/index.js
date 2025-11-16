import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/home/Home.vue";
import AboutView from "@/views/about/About.vue";
import LoginView from "@/views/login/Login.vue";
import RegisterView from "@/views/register/register.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomeView,},
    { path: "/about", component: AboutView,},
    { path: "/login", component: LoginView,},
    { path: "/register", component: RegisterView}
  ],
});

export default router;
