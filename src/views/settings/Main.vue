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
</style>