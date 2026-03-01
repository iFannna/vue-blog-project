<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);

const activeMenu = defineModel("activeMenu", { default: "profile" });

const userMenus = [
  { key: "profile", label: "个人资料" },
  { key: "security", label: "账户安全" },
  { key: "notification", label: "通知设置" },
  { key: "interactions", label: "我的互动" },
];

const adminMenus = [
  { key: "content", label: "内容管理" },
  { key: "comments", label: "评论审核" },
  { key: "users", label: "用户管理" },
  { key: "site", label: "网站设置" },
  { key: "statistics", label: "数据统计" },
];

const selectMenu = (key) => {
  activeMenu.value = key;
};

const defaultAvatar = "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png";
</script>

<template>
  <aside
    id="secondary"
    class="widget-area bloglo-sidebar-container"
    role="complementary"
  >
    <div class="bloglo-sidebar-inner">
      <!-- 个人信息 -->
      <div class="bloglo-sidebar-widget bloglo-widget bloglo-entry widget widget_block">
        <div class="is-content-justification-left is-nowrap is-layout-flex">
          <div class="wp-block-image is-style-rounded">
            <figure class="alignleft size-large is-resized">
              <img
                loading="lazy"
                decoding="async"
                :src="userInfo?.avatar || defaultAvatar"
                alt="用户头像"
                style="object-fit: cover; width: 70px; height: 70px"
              />
            </figure>
          </div>
          <p style="font-size: 1.6rem">
            <strong>{{ userInfo?.nickname || '昵称' }}</strong><br />
            {{ userInfo?.email || '邮箱地址' }}
          </p>
        </div>
      </div>

      <!-- 基础设置-->
      <div class="bloglo-sidebar-widget bloglo-widget bloglo-entry widget widget_block">
        <div class="h4 widget-title">基础设置</div>
        <ul class="settings-menu">
          <li
            v-for="menu in userMenus"
            :key="menu.key"
            :class="{ 'menu-active': activeMenu === menu.key }"
            @click="selectMenu(menu.key)"
          >
            <a href="javascript:;">{{ menu.label }}</a>
          </li>
        </ul>
      </div>

      <!-- 管理设置-->
      <div class="bloglo-sidebar-widget bloglo-widget bloglo-entry widget widget_block">
        <div class="h4 widget-title">管理设置</div>
        <ul class="settings-menu">
          <li
            v-for="menu in adminMenus"
            :key="menu.key"
            :class="{ 'menu-active': activeMenu === menu.key }"
            @click="selectMenu(menu.key)"
          >
            <a href="javascript:;">{{ menu.label }}</a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<style scoped>

/* 选中状态 */
.settings-menu li.menu-active a {
  color: var(--bloglo-primary, #FC6668);
  font-weight: 600;
}

</style>