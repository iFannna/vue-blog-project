<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();

// 用户信息
const userInfo = ref({
  nickname: "SAu",
  username: "iFannna",
  avatar: "https://java-ai-sau.oss-cn-beijing.aliyuncs.com/2025/04/312b700a-e1c7-42bf-aa23-5db8dc7121a6.jpg"
});

// 侧边栏菜单项 - 使用 SVG 图标
const menuItems = ref([
  { 
    id: "profile", 
    label: "个人资料", 
    path: "/settings/profile",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>`
  },
  { 
    id: "general", 
    label: "通用", 
    path: "/settings/general",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>`
  },
  { 
    id: "notifications", 
    label: "通知", 
    path: "/settings/notifications",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>`
  }
]);

const functionItems = ref([
  { 
    id: "history", 
    label: "历史记录", 
    path: "/settings/history",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>`
  },
  { 
    id: "collections", 
    label: "我的收藏", 
    path: "/settings/collections",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>`
  },
  { 
    id: "comments", 
    label: "我的评论", 
    path: "/settings/comments",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>`
  },
  { 
    id: "messages", 
    label: "我的留言", 
    path: "/settings/messages",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>`
  }
]);

const privateItems = ref([
  { 
    id: "security", 
    label: "账号与安全", 
    path: "/settings/security",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>`
  },
  { 
    id: "privacy", 
    label: "个人信息收集清单", 
    path: "/settings/privacy",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>`
  },
  { 
    id: "help", 
    label: "关于与帮助", 
    path: "/settings/help",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>`
  },
  { 
    id: "logout", 
    label: "退出登录", 
    path: null,
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>`
  }
]);

// 跳转到指定路由
const navigateTo = (item) => {
  if (item.id === "logout") {
    handleLogout();
  } else if (item.path) {
    router.push(item.path);
  } else {
    ElMessage.info(`${item.label}功能开发中`);
  }
};

// 退出登录
const handleLogout = () => {
  ElMessage.success("退出登录成功");
  localStorage.removeItem("loginUser");
  router.push("/login");
};

// 页面加载
onMounted(() => {
  const loginUser = localStorage.getItem("loginUser");
  if (loginUser) {
    const user = JSON.parse(loginUser);
    userInfo.value.nickname = user.nickname || userInfo.value.nickname;
    userInfo.value.username = user.username || userInfo.value.username;
    userInfo.value.avatar = user.avatar || userInfo.value.avatar;
  }
});
</script>

<template>
  <aside class="settings-sidebar" :class="{ collapsed: collapsed }">
    <!-- 用户信息卡片 -->
    <div class="user-card">
      <img :src="userInfo.avatar" alt="Avatar" class="user-avatar" />
      <div class="user-info" v-show="!collapsed">
        <h2 class="user-nickname">{{ userInfo.nickname }}</h2>
        <p class="user-username">@{{ userInfo.username }}</p>
        <p class="user-account-type">你的个人账户</p>
      </div>
    </div>

    <!-- 导航菜单 -->
    <nav class="sidebar-nav">
      <div class="nav-section">
        <ul class="nav-list">
          <li
            v-for="item in menuItems"
            :key="item.id"
            :class="['nav-item', { active: $route.path === item.path }]"
            @click="navigateTo(item)"
            :title="item.label"
          >
            <span class="nav-icon" v-html="item.svg"></span>
            <span class="nav-label" v-show="!collapsed">{{ item.label }}</span>
          </li>
        </ul>
      </div>

      <div class="nav-section">
        <h3 class="section-title" v-show="!collapsed">功能</h3>
        <ul class="nav-list">
          <li
            v-for="item in functionItems"
            :key="item.id"
            :class="['nav-item', { active: $route.path === item.path }]"
            @click="navigateTo(item)"
            :title="item.label"
          >
            <span class="nav-icon" v-html="item.svg"></span>
            <span class="nav-label" v-show="!collapsed">{{ item.label }}</span>
          </li>
        </ul>
      </div>

      <div class="nav-section">
        <h3 class="section-title" v-show="!collapsed">隐私</h3>
        <ul class="nav-list">
          <li
            v-for="item in privateItems"
            :key="item.id"
            :class="['nav-item', { active: item.path && $route.path === item.path }]"
            @click="navigateTo(item)"
            :title="item.label"
          >
            <span class="nav-icon" v-html="item.svg"></span>
            <span class="nav-label" v-show="!collapsed">{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
/* 左侧边栏 - 参考主页样式优化 */
.settings-sidebar {
  width: 320px;
  flex-shrink: 0;
  background: linear-gradient(135deg, rgba(26, 32, 44, 0.5) 0%, rgba(26, 32, 44, 0.7) 100%);
  backdrop-filter: blur(10px);
  padding: 2rem 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.settings-sidebar::-webkit-scrollbar {
  width: 6px;
}

.settings-sidebar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.settings-sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.settings-sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.settings-sidebar.collapsed {
  width: 80px;
  padding: 2rem 0.8rem;
}

.settings-sidebar.collapsed .user-card {
  justify-content: center;
  padding: 1rem;
}

/* 用户信息卡片 - 优化样式 */
.user-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.user-card:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.user-card:hover .user-avatar {
  border-color: var(--bloglo-primary, #0554f2);
  transform: scale(1.05);
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-nickname {
  font-size: 1.6rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 0.3rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-username {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 0.5rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-account-type {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  font-weight: 500;
}

/* 导航菜单 - 优化样式 */
.sidebar-nav {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-section {
  margin-bottom: 1.8rem;
}

.nav-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  margin: 0 0 1rem 0.8rem;
  font-weight: 700;
  position: relative;
  padding-left: 0.8rem;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 14px;
  background: var(--bloglo-primary, #0554f2);
  border-radius: 2px;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 1rem 1.2rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.4rem;
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, var(--bloglo-primary, #0554f2) 0%, transparent 100%);
  transition: width 0.3s ease;
  z-index: 0;
}

.nav-item:hover::before {
  width: 100%;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(5, 84, 242, 0.2);
}

.nav-item.active {
  background: linear-gradient(135deg, var(--bloglo-primary, #0554f2) 0%, #0443c9 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(5, 84, 242, 0.4);
  font-weight: 600;
}

.nav-item.active::before {
  width: 100%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
}

/* SVG 图标样式 */
.nav-icon {
  width: 22px;
  height: 22px;
  margin-right: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.nav-icon :deep(svg) {
  width: 100%;
  height: 100%;
  stroke: currentColor;
  transition: all 0.3s ease;
}

.nav-item:hover .nav-icon :deep(svg) {
  transform: scale(1.1);
  filter: drop-shadow(0 0 4px currentColor);
}

.nav-item.active .nav-icon :deep(svg) {
  animation: iconPulse 2s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.settings-sidebar.collapsed .nav-icon {
  margin-right: 0;
}

.nav-label {
  font-size: 1.4rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.nav-item:hover .nav-label {
  letter-spacing: 0.02em;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .settings-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .settings-sidebar.collapsed {
    width: 100%;
  }
}

/* 暗色主题优化 */
[data-theme="dark"] .settings-sidebar {
  background: linear-gradient(135deg, rgba(17, 24, 39, 0.6) 0%, rgba(17, 24, 39, 0.8) 100%);
}

[data-theme="dark"] .user-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%);
}

[data-theme="dark"] .sidebar-nav {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%);
}

/* 浅色主题 */
[data-theme="light"] .settings-sidebar {
  background: linear-gradient(135deg, rgba(249, 250, 251, 0.95) 0%, rgba(243, 244, 246, 0.98) 100%);
  border-right: 1px solid rgba(0, 0, 0, 0.08);
}

[data-theme="light"] .user-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(249, 250, 251, 0.9) 100%);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

[data-theme="light"] .user-nickname,
[data-theme="light"] .nav-item {
  color: rgba(0, 0, 0, 0.85);
}

[data-theme="light"] .user-username {
  color: rgba(0, 0, 0, 0.6);
}

[data-theme="light"] .user-account-type,
[data-theme="light"] .section-title {
  color: rgba(0, 0, 0, 0.45);
}

[data-theme="light"] .sidebar-nav {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(249, 250, 251, 0.8) 100%);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

[data-theme="light"] .nav-item:hover {
  background: rgba(5, 84, 242, 0.08);
  color: var(--bloglo-primary, #0554f2);
}

[data-theme="light"] .user-avatar {
  border: 2px solid rgba(0, 0, 0, 0.1);
}
</style>