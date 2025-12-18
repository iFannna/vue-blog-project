<script setup>
import { onMounted, onUnmounted } from 'vue';
import Header from "@/components/Header.vue";
import MainContainer from "@/views/about/MainContainer.vue";
import Footer from "@/components/Footer.vue";
import ScrollTopButton from "@/components/ScrollTopButton.vue";
import WavesBackground from "@/components/WavesBackground.vue";

onMounted(() => {
  document.body.classList.add('bloglo-no-sidebar');
});

onUnmounted(() => {
  document.body.classList.remove('bloglo-no-sidebar');
});
</script>

<template>
    <div id="page" class="hfeed site">
      <Header />
      <MainContainer />
      <Footer />
      <ScrollTopButton />
      <WavesBackground />
    </div>
</template>

<style>
</style>
