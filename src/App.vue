<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  document.body.classList.add(
    'home', 'blog', 'bloglo-layout__fw-contained', 'bloglo-header-layout-2',
    'bloglo-menu-animation-squarebox', 'bloglo-header__separators-none',
    'bloglo-blog-horizontal', 'bloglo-page-title-align-left', 'bloglo-has-sidebar',
    'bloglo-sticky-sidebar', 'bloglo-sidebar-style-3', 'bloglo-sidebar-position__right-sidebar',
    'bloglo-sidebar-r__after-content', 'entry-media-hover-style-1', 'bloglo-copyright-layout-1',
    'is-section-heading-init-s2', 'is-footer-heading-init-s1', 'bloglo-input-supported',
    'validate-comment-form', 'bloglo-menu-accessibility'
  );
});
</script>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>