<template>
  <div id="main" class="site-main">
    <div class="bloglo-container">
      <PrimaryContent />
      <Sidebar />
    </div>
    <YouMayLike />
  </div>
</template>

<script setup>
import PrimaryContent from "@/views/home/Main.vue";
import Sidebar from "@/components/Sidebar.vue";
import YouMayLike from "@/components/YouMayLike.vue";
</script>

