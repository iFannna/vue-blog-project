<script setup>
import { useRouter } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import WavesBackground from "@/components/WavesBackground.vue";

const router = useRouter();

const goHome = () => {
  router.push("/");
};
</script>

<template>
  <div id="page" class="hfeed site">
    <Header />
    <div id="main" class="site-main">
      <div class="bloglo-container">
        <div class="not-found-content">
          <h1>404</h1>
          <p>抱歉，您访问的页面不存在</p>
          <button class="bloglo-btn" @click="goHome">返回首页</button>
        </div>
      </div>
    </div>
    <Footer />
    <WavesBackground />
  </div>
</template>

<style scoped>
.not-found-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 4rem 2rem;
}

.not-found-content h1 {
  font-size: 120px;
  color: var(--bloglo-primary, #fc6668);
  margin: 0;
  line-height: 1;
}

.not-found-content p {
  font-size: 24px;
  color: var(--bloglo-secondary, #666);
  margin: 1rem 0 2rem;
}
</style>
