<script>
import Header from "@/components/Header.vue";
import MainContainer from "@/views/home/MainContainer.vue";
import Footer from "@/components/Footer.vue";
import ScrollTopButton from "@/components/ScrollTopButton.vue";
import WavesBackground from "@/components/WavesBackground.vue";

export default {
  name: "Home",
  components: {
    Header,
    MainContainer,
    Footer,
    ScrollTopButton,
    WavesBackground,
  },
};
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



<style></style>
