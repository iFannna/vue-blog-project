<script setup>
import { defineAsyncComponent } from "vue";

const ProfileSettings = defineAsyncComponent(() => import("./components/ProfileSettings.vue"));
const AccountSecurity = defineAsyncComponent(() => import("./components/AccountSecurity.vue"));
const NotificationSettings = defineAsyncComponent(() => import("./components/NotificationSettings.vue"));
const MyInteractions = defineAsyncComponent(() => import("./components/MyInteractions.vue"));
const ContentManage = defineAsyncComponent(() => import("./components/ContentManage.vue"));
const CommentManage = defineAsyncComponent(() => import("./components/CommentManage.vue"));
const UserManage = defineAsyncComponent(() => import("./components/UserManage.vue"));
const SiteSettings = defineAsyncComponent(() => import("./components/SiteSettings.vue"));
const DataStatistics = defineAsyncComponent(() => import("./components/DataStatistics.vue"));

const activeMenu = defineModel("activeMenu", { default: "profile" });

const componentMap = {
  profile: ProfileSettings,
  security: AccountSecurity,
  notification: NotificationSettings,
  interactions: MyInteractions,
  content: ContentManage,
  comments: CommentManage,
  users: UserManage,
  site: SiteSettings,
  statistics: DataStatistics,
};
</script>

<template>
  <!--主要内容-->
  <div id="primary" class="content-area">
    <main id="content" class="site-content">
      <div class="settings-content-wrapper">
        <Transition name="fade" mode="out-in">
          <component :is="componentMap[activeMenu]" :key="activeMenu" />
        </Transition>
      </div>
    </main>
  </div>
</template>

<style scoped>
.content-area {
  padding-right: 0 !important;
}

.settings-content-wrapper {
  background: var(--bloglo-card-bg, #fff);
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-height: 500px;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

[data-theme="dark"] .settings-content-wrapper {
  background: rgba(30, 41, 59, 0.8);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
</style>