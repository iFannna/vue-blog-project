<template>
  <div id="main" class="site-main">
    <div class="bloglo-container">
      <PrimaryContent />
      <Sidebar />
    </div>
    <YouMayLike />
  </div>
</template>

<script>
import PrimaryContent from "@/components/PrimaryContent.vue";
import Sidebar from "@/components/Sidebar.vue";
import YouMayLike from "@/components/YouMayLike.vue";

export default {
  name: "MainContainer",
  components: {
    PrimaryContent,
    Sidebar,
    YouMayLike,
  },
};
</script>

<style scoped></style>
