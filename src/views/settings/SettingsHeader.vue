<script setup>
import { ref, onMounted } from "vue";
import router from "@/router/index.js";

const userInfo = ref({
  avatar: "https://java-ai-sau.oss-cn-beijing.aliyuncs.com/2025/04/312b700a-e1c7-42bf-aa23-5db8dc7121a6.jpg"
});

// 触发侧边栏切换事件
const emit = defineEmits(['toggle-sidebar']);

const toggleSidebar = () => {
  router.push("/");
};

onMounted(() => {
  const loginUser = localStorage.getItem("loginUser");
  if (loginUser) {
    const user = JSON.parse(loginUser);
    userInfo.value.avatar = user.avatar || userInfo.value.avatar;
  }
});
</script>

<template>
  <header class="settings-header">
    <div class="header-content">
      <button class="menu-toggle" @click="toggleSidebar">
          <svg aria-hidden="true" focusable="false" class="octicon octicon-home" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" display="inline-block" overflow="visible" style="vertical-align: text-bottom;"><path d="M6.906.664a1.749 1.749 0 0 1 2.187 0l5.25 4.2c.415.332.657.835.657 1.367v7.019A1.75 1.75 0 0 1 13.25 15h-3.5a.75.75 0 0 1-.75-.75V9H7v5.25a.75.75 0 0 1-.75.75h-3.5A1.75 1.75 0 0 1 1 13.25V6.23c0-.531.242-1.034.657-1.366l5.25-4.2Zm1.25 1.171a.25.25 0 0 0-.312 0l-5.25 4.2a.25.25 0 0 0-.094.196v7.019c0 .138.112.25.25.25H5.5V8.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v5.25h2.75a.25.25 0 0 0 .25-.25V6.23a.25.25 0 0 0-.094-.195Z"></path></svg>

      </button>
      <h1 class="page-title">设置</h1>
      <div class="header-avatar">
        <img :src="userInfo.avatar" alt="Avatar" />
      </div>
    </div>
  </header>
</template>

<style scoped>
/* 顶部导航栏 - 非固定定位，移除左右边距 */
.settings-header {
  height: 70px;
  background: rgba(26, 32, 44, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0;
  padding: 0;
}

.header-content {
  height: 100%;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-toggle {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.menu-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}



.page-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.header-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.header-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    padding: 0 1rem;
  }

  .page-title {
    font-size: 1.6rem;
  }
}
</style>