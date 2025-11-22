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

// 侧边栏菜单项
const menuItems = ref([
  { id: "profile", icon: "👤", label: "个人资料", path: "/settings/profile" },
  { id: "general", icon: "⚙️", label: "通用", path: "/settings/general" },
  { id: "notifications", icon: "🔔", label: "通知", path: "/settings/notifications" }
]);

const functionItems = ref([
  { id: "history", icon: "🕐", label: "历史记录", path: "/settings/history" },
  { id: "collections", icon: "📚", label: "我的收藏", path: "/settings/collections" },
  { id: "comments", icon: "💬", label: "我的评论", path: "/settings/comments" },
  { id: "messages", icon: "📦", label: "我的留言", path: "/settings/messages" }
]);

const privateItems = ref([
  { id: "security", icon: "🛡️", label: "账号与安全", path: "/settings/security" },
  { id: "privacy", icon: "✉️", label: "个人信息收集清单", path: "/settings/privacy" },
  { id: "help", icon: "💭", label: "关于与帮助", path: "/settings/help" },
  { id: "logout", icon: "↩️", label: "退出登录", path: null }
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
        <p class="user-username">{{ userInfo.username }}</p>
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
            <span class="nav-icon">{{ item.icon }}</span>
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
            <span class="nav-icon">{{ item.icon }}</span>
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
            <span class="nav-icon">{{ item.icon }}</span>
            <span class="nav-label" v-show="!collapsed">{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
/* 左侧边栏 */
.settings-sidebar {
  width: 320px;
  flex-shrink: 0;
  background: rgba(26, 32, 44, 0.4);
  padding: 2rem 1.5rem;
  transition: width 0.3s ease;
  overflow-y: auto;
}

.settings-sidebar.collapsed {
  width: 80px;
}

.settings-sidebar.collapsed .user-card {
  justify-content: center;
}

.user-card {
  background: rgba(26, 32, 44, 0.6);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  transition: all 0.3s ease;
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-nickname {
  font-size: 1.6rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-username {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 0.5rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-account-type {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
}

/* 导航菜单 */
.sidebar-nav {
  background: rgba(26, 32, 44, 0.6);
  border-radius: 12px;
  padding: 1rem;
}

.nav-section {
  margin-bottom: 1.5rem;
}

.nav-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  margin: 0 0 0.8rem 0.8rem;
  font-weight: 600;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.3rem;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.nav-item.active {
  background: var(--bloglo-primary, #0554f2);
  color: #fff;
}

.nav-icon {
  font-size: 1.6rem;
  margin-right: 0.8rem;
  width: 24px;
  display: inline-flex;
  justify-content: center;
  flex-shrink: 0;
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
}

/* 响应式设计 */
@media (max-width: 768px) {
  .settings-sidebar {
    width: 100%;
  }

  .settings-sidebar.collapsed {
    width: 100%;
  }
}
</style>