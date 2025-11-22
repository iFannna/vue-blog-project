<script setup>
import SettingsHeader from "@/views/settings/SettingsHeader.vue";
import SettingsMainContainer from "@/views/settings/SettingsMainContainer.vue";
import WavesBackground from "@/components/WavesBackground.vue";
</script>

<template>
  <div id="page" class="hfeed site settings-page">
    <SettingsHeader />
    <SettingsMainContainer />
    <WavesBackground />
  </div>
</template>

<style scoped>
/* 设置页面整体样式 - 使用新配色 */
.settings-page {
  min-height: 100vh;
  background: #f5f5f5;
  transition: background 0.3s ease;
}

/* 暗色主题 */
:root[data-theme="dark"] .settings-page {
  background: #3a3a3a;
}

/* View Transitions API 支持 */
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