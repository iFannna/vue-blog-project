<template>
  <!-- 全局悬浮按钮：回到顶部 -->
  <a
    href="#"
    id="bloglo-scroll-top"
    :class="['bloglo-scroll-top', { 'bloglo-visible': isVisible }]"
    title="回到顶部"
    @click.prevent="scrollToTop"
  >
    <span class="bloglo-scroll-icon" aria-hidden="true">
      <svg
        class="bloglo-icon top-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          d="M24.958 18.491l-8.008-8.008a1.29 1.29 0 00-1.868 0l-8.008 8.008c-.534.534-.534 1.335 0 1.868s1.335.534 1.868 0l7.074-7.074 7.074 7.074c.267.267.667.4.934.4s.667-.133.934-.4a1.29 1.29 0 000-1.868z"
        />
      </svg>
      <svg
        class="bloglo-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          d="M24.958 18.491l-8.008-8.008a1.29 1.29 0 00-1.868 0l-8.008 8.008c-.534.534-.534 1.335 0 1.868s1.335.534 1.868 0l7.074-7.074 7.074 7.074c.267.267.667.4.934.4s.667-.133.934-.4a1.29 1.29 0 000-1.868z"
        />
      </svg>
    </span>
  </a>
</template>

<script>
export default {
  name: "ScrollTopButton",
  data() {
    return {
      isVisible: false,
      rafId: null,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll, { passive: true });
    window.addEventListener("resize", this.onScroll, { passive: true });
    this.onScroll();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onScroll);
    if (this.rafId) cancelAnimationFrame(this.rafId);
  },
  methods: {
    onScroll() {
      if (this.rafId) cancelAnimationFrame(this.rafId);
      this.rafId = requestAnimationFrame(() => {
        const y =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0;
        this.isVisible = y > 450;
      });
    },
    scrollToTop() {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (_) {
        // Fallback for older browsers
        const step = () => {
          const pos =
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;
          if (pos > 0) {
            window.scrollTo(0, Math.floor(pos - pos / 8));
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
      }
    },
  },
};
</script>

<style scoped>

</style>