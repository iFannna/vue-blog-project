<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import SettingsHeader from "@/views/settings/SettingsHeader.vue";
import SettingsMainContainer from "@/views/settings/SettingsMainContainer.vue";
import WavesBackground from "@/components/WavesBackground.vue";

onMounted(() => {
  nextTick(() => {
    document.body.classList.add('bloglo-no-sidebar');
    document.body.classList.add('settings-page-active');
  });
});

onUnmounted(() => {
  document.body.classList.remove('bloglo-no-sidebar');
  document.body.classList.remove('settings-page-active');
});
</script>

<template>
  <div id="page" class="hfeed site settings-page-wrapper">
    <SettingsHeader />
    <SettingsMainContainer />
    <WavesBackground />
  </div>
</template>

<style scoped>
.settings-page-wrapper {
  min-height: 100vh;
  background: #f5f5f5;
  transition: background 0.3s ease;
}

:root[data-theme="dark"] .settings-page-wrapper {
  background: #3a3a3a;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 999;
}
</style>

<style>
/* 全局样式：彻底隔离设置页面，防止任何全局CSS干扰 */
body.settings-page-active .settings-page-wrapper {
  display: block !important;
  width: 100% !important;
  max-width: 100% !important;
}

/* 隐藏传统侧边栏 */
body.settings-page-active #secondary,
body.settings-page-active aside:not(.settings-sidebar) {
  display: none !important;
}

/* 重置所有可能影响布局的全局样式 */
body.settings-page-active .settings-main-wrapper,
body.settings-page-active .settings-container {
  display: flex !important;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
}

body.settings-page-active .settings-main-wrapper {
  display: block !important;
}
</style>