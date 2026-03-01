<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goHome = () => router.push("/");
</script>

<template>
  <div class="not-found-page">
    <h1 class="not-found-title">404</h1>
    <p class="not-found-desc">抱歉，您访问的页面不存在</p>
    <button class="not-found-btn" @click="goHome">返回首页</button>
  </div>
</template>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  padding: 2rem;
  box-sizing: border-box;
}

.not-found-title {
  font-size: 120px;
  color: #fc6668;
  margin: 0;
  line-height: 1;
}

.not-found-desc {
  font-size: 24px;
  color: #666;
  margin: 1rem 0 2rem;
}

.not-found-btn {
  padding: 0.75rem 2rem;
  font-size: 16px;
  color: #fff;
  background: #fc6668;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.not-found-btn:hover {
  background: #e05558;
}
</style>
