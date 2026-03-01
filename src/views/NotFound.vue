<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面未找到</p>
    <button @click="goHome">返回首页</button>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 16px;
}

.not-found h1 {
  font-size: 80px;
  color: #fc6668;
  margin: 0;
}

.not-found p {
  font-size: 20px;
  color: #666;
}

.not-found button {
  padding: 10px 24px;
  background: #fc6668;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.not-found button:hover {
  background: #ff4c60;
}
</style>
