<template>
  <div id="main" class="site-main">
    <div class="bloglo-container">
      <SettingsSidebar />
      <PrimaryContent />
    </div>
  </div>
</template>

<script setup>
import PrimaryContent from "@/views/settings/Main.vue";
import SettingsSidebar from "@/views/settings/Sidebar.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
</script>

<style scoped>
.bloglo-container {
  margin: 0;
}
</style>
