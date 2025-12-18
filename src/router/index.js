import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/home/Home.vue";
import AboutView from "@/views/about/About.vue";
import LoginView from "@/views/login/Login.vue";
import RegisterView from "@/views/register/Register.vue";
import SettingsView from "@/views/settings/Settings.vue";
import ArticleEditorView from "../views/editor/ArticleEditor.vue";
// import SettingsProfile from "@/views/settings/pages/SettingsProfile.vue";
// import SettingsGeneral from "@/views/settings/pages/SettingsGeneral.vue";
// import SettingsNotifications from "@/views/settings/pages/SettingsNotifications.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomeView },
    { path: "/about", component: AboutView },
    { path: "/login", component: LoginView },
    { path: "/register", component: RegisterView },
    {
      path: "/settings",
      component: SettingsView,
      
    },
    { path: "/post-new", component: ArticleEditorView },
  ]
});

export default router;