<script setup>
import { ref, onMounted } from "vue";
import router from "@/router/index.js";

const userInfo = ref({
  avatar: "https://java-ai-sau.oss-cn-beijing.aliyuncs.com/2025/04/312b700a-e1c7-42bf-aa23-5db8dc7121a6.jpg"
});

// 主题切换
const isDarkMode = ref(false);

// 触发侧边栏切换事件
const emit = defineEmits(['toggle-sidebar']);

const toggleSidebar = () => {
  router.push("/");
};

// 主题切换函数 - 圆形扩散动画
let themeToggleTimer = null;
const toggleTheme = async (event) => {
  if (themeToggleTimer) return;
  
  event.preventDefault();
  event.stopPropagation();
  
  // 检查浏览器是否支持 View Transitions API
  if (!document.startViewTransition) {
    applyThemeChange();
    return;
  }

  // 获取点击位置
  const x = event.clientX;
  const y = event.clientY;

  // 计算到屏幕四个角的距离，取最大值作为扩散半径
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  // 启动 View Transition
  const transition = document.startViewTransition(async () => {
    applyThemeChange();
  });

  // 等待过渡准备就绪，然后自定义动画
  transition.ready.then(() => {
    // 为新页面添加圆形扩散动画
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`
    ];

    document.documentElement.animate(
      {
        clipPath: clipPath
      },
      {
        duration: 800,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)'
      }
    );
  });
  
  // 防抖处理
  themeToggleTimer = setTimeout(() => {
    themeToggleTimer = null;
  }, 800);
};

// 应用主题变更
const applyThemeChange = () => {
  isDarkMode.value = !isDarkMode.value;

  if (isDarkMode.value) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("darkmode", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("darkmode", "light");
  }
};

onMounted(() => {
  const loginUser = localStorage.getItem("loginUser");
  if (loginUser) {
    const user = JSON.parse(loginUser);
    userInfo.value.avatar = user.avatar || userInfo.value.avatar;
  }
  
  // 初始化主题状态
  const darkmode = localStorage.getItem("darkmode");
  isDarkMode.value = darkmode === "dark";
  if (isDarkMode.value) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
});
</script>

<template>
  <header class="settings-header">
    <div class="header-content">
      <button class="menu-toggle" @click="toggleSidebar">
        <svg aria-hidden="true" focusable="false" class="octicon octicon-home" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
          <path d="M6.906.664a1.749 1.749 0 0 1 2.187 0l5.25 4.2c.415.332.657.835.657 1.367v7.019A1.75 1.75 0 0 1 13.25 15h-3.5a.75.75 0 0 1-.75-.75V9H7v5.25a.75.75 0 0 1-.75.75h-3.5A1.75 1.75 0 0 1 1 13.25V6.23c0-.531.242-1.034.657-1.366l5.25-4.2Zm1.25 1.171a.25.25 0 0 0-.312 0l-5.25 4.2a.25.25 0 0 0-.094.196v7.019c0 .138.112.25.25.25H5.5V8.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v5.25h2.75a.25.25 0 0 0 .25-.25V6.23a.25.25 0 0 0-.094-.195Z"></path>
        </svg>
      </button>
      <h1 class="page-title">设置</h1>
      <div class="header-right">
        <!-- 主题切换按钮 -->
        <button class="theme-toggle" @click="toggleTheme" :title="isDarkMode ? '切换到亮色模式' : '切换到暗色模式'">
          <svg v-if="!isDarkMode" class="theme-icon sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg v-else class="theme-icon moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
        
        <!-- 头像 -->
        <div class="header-avatar">
          <img :src="userInfo.avatar" alt="Avatar" />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* 顶部导航栏 */
.settings-header {
  height: 70px;
  background: #f5f5f5;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  margin: 0;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: background 0.3s ease;
}

/* 暗色主题下的导航栏 */
:root[data-theme="dark"] .settings-header {
  background: #333333;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
  border: 1px solid rgba(0, 0, 0, 0.15);
  color: #333;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

:root[data-theme="dark"] .menu-toggle {
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.menu-toggle:hover {
  background: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.25);
}

:root[data-theme="dark"] .menu-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.page-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

:root[data-theme="dark"] .page-title {
  color: #fff;
}

/* 右侧容器：主题切换 + 头像 */
.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* 主题切换按钮 */
.theme-toggle {
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.15);
  color: #333;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  padding: 0;
}

:root[data-theme="dark"] .theme-toggle {
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.theme-toggle:hover {
  background: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.25);
}

:root[data-theme="dark"] .theme-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.theme-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease;
}

.sun-icon {
  color: #f59e0b;
}

.moon-icon {
  color: #60a5fa;
}

/* 头像 */
.header-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

:root[data-theme="dark"] .header-avatar {
  border-color: rgba(255, 255, 255, 0.2);
}

.header-avatar:hover {
  transform: scale(1.05);
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
  
  .header-right {
    gap: 0.5rem;
  }
  
  .theme-toggle,
  .menu-toggle {
    width: 36px;
    height: 36px;
  }
  
  .header-avatar {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.4rem;
  }
  
  .theme-toggle,
  .menu-toggle {
    width: 32px;
    height: 32px;
  }
  
  .theme-icon {
    width: 16px;
    height: 16px;
  }
}
</style>