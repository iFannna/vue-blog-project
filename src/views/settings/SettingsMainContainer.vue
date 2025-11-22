<script setup>
import { provide, ref } from "vue";
import SettingsSidebar from "@/views/settings/SettingsSidebar.vue";

// 侧边栏折叠状态
const sidebarCollapsed = ref(false);

// 提供给子组件使用
provide('sidebarCollapsed', sidebarCollapsed);

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

// 监听 header 的切换事件
const handleToggleSidebar = () => {
  toggleSidebar();
};
</script>

<template>
  <div id="main" class="settings-main">
    <div class="settings-container">
      <SettingsSidebar 
        :collapsed="sidebarCollapsed" 
        @toggle="toggleSidebar" 
      />
      <main class="settings-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.settings-main {
  width: 100%;
  margin: 0;
  padding: 0;
}

/* 主容器 */
.settings-container {
  display: flex;
  width: 100%;
  min-height: calc(100vh - 70px);
  margin: 0;
  padding: 0;
  gap: 0;
}

/* 右侧内容区域 */
.settings-content {
  flex: 1;
  background: rgba(0, 0, 0, 0.02);
  padding: 0;
  margin: 0;
  overflow-y: auto;
}

:root[data-theme="dark"] .settings-content {
  background: rgba(0, 0, 0, 0.2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .settings-container {
    flex-direction: column;
  }
}
</style>