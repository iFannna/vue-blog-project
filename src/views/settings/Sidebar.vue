<script setup>
import { ref, onMounted } from "vue";
</script>

<template>
  <!--侧边栏--->
  <aside
    id="secondary"
    class="widget-area bloglo-sidebar-container"
    role="complementary"
  >
    <div class="bloglo-sidebar-inner">
      <!--个人信息-->
      <div
        class="bloglo-sidebar-widget bloglo-widget bloglo-entry widget widget_block"
      >
        <div class="is-content-justification-left is-nowrap is-layout-flex">
          <div class="wp-block-image is-style-rounded">
            <figure class="alignleft size-large is-resized">
              <img
                loading="lazy"
                decoding="async"
                width="1024"
                height="731"
                src="https://java-ai-sau.oss-cn-beijing.aliyuncs.com/2025/04/312b700a-e1c7-42bf-aa23-5db8dc7121a6.jpg"
                alt=""
                style="object-fit: cover; width: 70px; height: 70px"
                sizes="auto, (max-width: 1024px) 100vw, 1024px"
              />
            </figure>
          </div>
          <p style="font-size: 1.6rem">
            <strong>昵称</strong><br />用户名 &amp; 邮箱
          </p>
        </div>

        <ul>
          <li><a href="/">1111</a></li>
          <li><a href="/">2222</a></li>
          <li><a href="/">3333</a></li>
        </ul>
      </div>
      <div
        class="bloglo-sidebar-widget bloglo-widget bloglo-entry widget widget_meta"
      >
        <ul>
          <li><a href="/">1111</a></li>
          <li><a href="/">2222</a></li>
          <li><a href="/">3333</a></li>
        </ul>
      </div>
      <div
        class="bloglo-sidebar-widget bloglo-widget bloglo-entry widget widget_meta"
      >
        <ul>
          <li><a href="/">1111</a></li>
          <li><a href="/">2222</a></li>
          <li><a href="/">3333</a></li>
        </ul>
      </div>
      

      
    </div>
  </aside>
</template>

<style scoped>
.icons-container {
  margin-top: 1rem;
}
.icon-container {
  transition: transform 0.3s ease;
  display: inline-block;
  margin: 0 4px;
}
.icon-container:hover {
  transform: scale(1.1);
}
</style>
