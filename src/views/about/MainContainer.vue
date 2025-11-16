<template>
  <div id="main" class="site-main">
    <Breadcrumbs />
    <div class="bloglo-container">
      <PrimaryContent />
    </div>
    <YouMayLike />
  </div>
</template>

<script setup>
import PrimaryContent from "@/views/about/Main.vue";
import YouMayLike from "@/components/YouMayLike.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
</script>

<style scoped>

</style>
