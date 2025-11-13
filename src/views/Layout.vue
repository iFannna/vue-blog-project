<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import ScrollTopButton from "@/components/ScrollTopButton.vue";
import WavesBackground from "@/components/WavesBackground.vue";

import MainContainer from "@/views/MainContainer.vue";

export default {
  name: "LayoutView",
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
  <div
    class="home blog bloglo-layout__fw-contained bloglo-header-layout-2 bloglo-menu-animation-squarebox bloglo-header__separators-none bloglo-blog-horizontal bloglo-page-title-align-left bloglo-has-sidebar bloglo-sticky-sidebar bloglo-sidebar-style-3 bloglo-sidebar-position__right-sidebar bloglo-sidebar-r__after-content entry-media-hover-style-1 bloglo-copyright-layout-1 is-section-heading-init-s2 is-footer-heading-init-s1 bloglo-input-supported validate-comment-form bloglo-menu-accessibility"
  >
    <div id="page" class="hfeed site">
      <Header />
      <MainContainer />
      <Footer />
      <ScrollTopButton />
      <WavesBackground />
    </div>
  </div>
</template>



<style></style>
