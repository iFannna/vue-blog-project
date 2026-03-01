<script setup>
import { ref } from "vue";
import PrimaryContent from "@/views/settings/Main.vue";
import SettingsSidebar from "@/views/settings/Sidebar.vue";

const activeMenu = ref("profile");
</script>

<template>
  <div id="main" class="site-main">
    <div class="bloglo-container">
      <SettingsSidebar v-model:activeMenu="activeMenu" />
      <PrimaryContent v-model:activeMenu="activeMenu" />
    </div>
  </div>
</template>

<style scoped>
.bloglo-container {
  margin: 0;
}
</style>