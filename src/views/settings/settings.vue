<script setup>
import SettingsHeader from "@/views/settings/SettingsHeader.vue";
import SettingsMainContainer from "@/views/settings/SettingsMainContainer.vue";
import WavesBackground from "@/components/WavesBackground.vue";
</script>

<template>
  <div id="page" class="hfeed site">
    <SettingsHeader />
    <SettingsMainContainer />
    <WavesBackground />
  </div>
</template>

<style scoped>
/* 移除原有的 settings-page 特定样式，使用与主页一致的样式 */
</style>