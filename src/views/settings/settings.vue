<script setup>
import SettingsHeader from "@/views/settings/SettingsHeader.vue";
import SettingsMainContainer from "@/views/settings/SettingsMainContainer.vue";
</script>

<template>
  <div id="page" class="settings-page hfeed site">
    <SettingsHeader />
    <SettingsMainContainer />
  </div>
</template>

<style scoped>
.settings-page {
  min-height: 100vh;
  background: var(--bloglo-white, #ffffff);
  color: var(--bloglo-secondary, #232323);
  margin: 0;
  padding: 0;
}

/* 暗色主题适配 */
[data-theme="dark"] .settings-page {
  background: #1a202c;
}
</style>