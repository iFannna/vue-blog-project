import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: () => import("@/views/home/Home.vue") },
    { path: "/about", component: () => import("@/views/about/About.vue") },
    { path: "/login", component: () => import("@/views/login/Login.vue") },
    { path: "/register", component: () => import("@/views/register/Register.vue") },
    {
      path: "/settings",
      component: () => import("@/views/settings/Settings.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/post-new",
      component: () => import("@/views/editor/ArticleEditor.vue"),
      meta: { requiresAuth: true },
    },
    { path: "/:pathMatch(.*)*", component: () => import("@/views/NotFound.vue") },
  ],
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    const userStore = useUserStore();
    if (!userStore.userInfo) {
      return { path: "/login" };
    }
  }
});

export default router;