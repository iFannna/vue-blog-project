<template>
  <!--页头-->
  <header id="masthead" class="site-header">
    <div id="bloglo-header">
      <div id="bloglo-header-inner">
        <div class="bloglo-container bloglo-header-container">
          <div class="bloglo-logo bloglo-header-element">
            <div class="logo-inner">
              <a href="" rel="home" class="">
                <img
                  src="https://java-ai-sau.oss-cn-beijing.aliyuncs.com/Blog.png"
                  alt="Blog"
                  width="330"
                  height="72"
                  class=""
                />
              </a>
              <h1 class="site-title screen-reader-text">
                <a href="" rel="home"> Blog </a>
              </h1>
            </div>
          </div>
          <!-- 移动端菜单 -->
          <span class="bloglo-header-element bloglo-mobile-nav">
            <button
              class="bloglo-hamburger hamburger--spin bloglo-hamburger-bloglo-primary-nav"
            >
              <span class="hamburger-box">
                <span class="hamburger-inner"></span>
              </span>
            </button>
            <nav
              class="site-navigation main-navigation bloglo-primary-nav bloglo-nav bloglo-header-element"
            >
              <ul class="menu">
                <li
                  id="menu-item-815"
                  class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-815"
                >
                  <a href="/"><span>主页</span></a>
                </li>
                <!-- 移动端登录按钮：未登录显示，已登录隐藏 -->
                <li
                  v-if="!userInfo"
                  id="menu-item-816"
                  class="menu-item menu-item-type-post_type menu-item-object-page menu-item-816"
                >
                  <a href="/login"><span>登录</span></a>
                </li>
                <li
                  id="menu-item-816"
                  class="menu-item menu-item-type-post_type menu-item-object-page menu-item-816"
                >
                  <a href="/about"><span>关于</span></a>
                </li>
                <li
                  id="menu-item-829"
                  class="menu-item menu-item-type-post_type menu-item-object-page menu-item-829"
                >
                  <a href=""><span>联系</span></a>
                </li>
              </ul>
            </nav>
          </span>
          <!-- 电脑端菜单 -->
          <nav
            class="site-navigation main-navigation bloglo-primary-nav bloglo-nav bloglo-header-element"
            role="navigation"
          >
            <ul class="menu">
              <li :class="getMenuItemClass('/')">
                <router-link to="/"><span>主页</span></router-link>
              </li>
              <li :class="getMenuItemClass('/about')">
                <router-link to="/about"><span>关于</span></router-link>
              </li>
              <li :class="getMenuItemClass('/contact')">
                <router-link to="/contact"><span>联系</span></router-link>
              </li>
              <li :class="getMenuItemClass('/settings')">
                <router-link to="/settings"><span>设置</span></router-link>
              </li>
            </ul>
          </nav>
          <!-- 顶部右侧小组件 -->
          <div
            class="bloglo-header-widgets bloglo-header-element bloglo-widget-location-right"
          >
            
            <!-- 浅色/深色主题切换图标 -->
            <div
              class="bloglo-header-widget__darkmode bloglo-header-widget bloglo-all"
            >
              <div class="bloglo-widget-wrapper">
                <label
                  class="bloglo-darkmode"
                  for="lightdarkswitch"
                  tabindex="0"
                  @click="toggleTheme"
                >
                  <input
                    type="checkbox"
                    id="lightdarkswitch"
                    :checked="isDarkMode"
                    :class="{ active: isDarkMode }"
                  />
                  <div class="bloglo-darkmode-toogle"></div>
                </label>
              </div>
            </div>
            <!-- 搜索图标 -->
            <div
              class="bloglo-header-widget__search bloglo-header-widget bloglo-all"
            >
              <div class="bloglo-widget-wrapper">
                <div aria-haspopup="true">
                  <a href="#" class="bloglo-search">
                    <svg
                      class="bloglo-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                    >
                      <path
                        d="M28.962 26.499l-4.938-4.938c1.602-2.002 2.669-4.671 2.669-7.474 0-6.673-5.339-12.012-12.012-12.012S2.669 7.414 2.669 14.087a11.962 11.962 0 0012.012 12.012c2.803 0 5.472-1.068 7.474-2.669l4.938 4.938a1.745 1.745 0 002.469 0 1.745 1.745 0 00-.6-2.869zm-14.281-3.469c-4.938 0-8.943-4.005-8.943-8.943s4.005-8.943 8.943-8.943 8.943 4.005 8.943 8.943-4.005 8.943-8.943 8.943z"
                      />
                    </svg>
                  </a>

                  <div
                    class="bloglo-search-simple bloglo-search-container dropdown-item"
                  >
                    <form
                      role="search"
                      method="get"
                      class="bloglo-search-form"
                      action="搜索前往地址"
                    >
                      <label class="bloglo-form-label">
                        <input
                          type="search"
                          class="bloglo-input-search"
                          placeholder="Search"
                          value=""
                          name="s"
                          autocomplete="off"
                        />
                      </label>

                      <button
                        type="submit"
                        class="bloglo-animate-arrow right-arrow"
                        aria-hidden="true"
                        role="button"
                        tabindex="0"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 25 18"
                        >
                          <path
                            class="arrow-handle"
                            d="M2.511 9.007l7.185-7.221c.407-.409.407-1.071 0-1.48s-1.068-.409-1.476 0L.306 8.259a1.049 1.049 0 000 1.481l7.914 7.952c.407.408 1.068.408 1.476 0s.407-1.07 0-1.479L2.511 9.007z"
                          ></path>
                          <path
                            class="arrow-bar"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M1 8h28.001a1.001 1.001 0 010 2H1a1 1 0 110-2z"
                          ></path>
                        </svg>
                      </button>
                      <button
                        type="button"
                        class="bloglo-search-close"
                        aria-hidden="true"
                        role="button"
                      >
                        <svg
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M6.852 7.649L.399 1.195 1.445.149l6.454 6.453L14.352.149l1.047 1.046-6.454 6.454 6.454 6.453-1.047 1.047-6.453-6.454-6.454 6.454-1.046-1.047z"
                            fill="currentColor"
                            fill-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <!-- 社交联系方式图标 -->
            <div
              class="bloglo-header-widget__socials bloglo-header-widget bloglo-hide-mobile"
            >
              <div class="bloglo-widget-wrapper">
                <nav class="bloglo-social-nav minimal-fill bloglo-large">
                  <ul id="menu-social-menu-default" class="bloglo-socials-menu">
                    <!-- Github -->
                    <li class="menu-item">
                      <a href="">
                        <span>
                          <img
                            src="https://java-ai-sau.oss-cn-beijing.aliyuncs.com/github.png"
                            width="32"
                            height="32"
                            class="bloglo-icon"
                          /><img
                            src="https://java-ai-sau.oss-cn-beijing.aliyuncs.com/github.png"
                            width="32"
                            height="32"
                            class="bloglo-icon bottom-icon"
                          />
                        </span>
                      </a>
                    </li>
                    <!-- Gitee -->
                    <li class="menu-item">
                      <a href="">
                        <span>
                          <img
                            src="https://java-ai-sau.oss-cn-beijing.aliyuncs.com/gitee.png"
                            width="32"
                            height="32"
                            class="bloglo-icon"
                          /><img
                            src="https://java-ai-sau.oss-cn-beijing.aliyuncs.com/gitee.png"
                            width="32"
                            height="32"
                            class="bloglo-icon bottom-icon"
                          />
                        </span>
                      </a>
                    </li>
                    
                  </ul>
                </nav>
              </div>
            </div>
            <!-- 订阅按钮 -->
            <div
              class="bloglo-header-widget__button bloglo-header-widget bloglo-hide-mobile-tablet"
            >
              <div class="bloglo-widget-wrapper">
                <a class="btn-small bloglo-btn login-btn"><span>订阅</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const isDarkMode = ref(false);
const userInfo = ref(null);
const isDropdownOpen = ref(false);

const defaultAvatar =
  "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png";

const getMenuItemClass = (path, isHome = false) => {
  const baseClasses = [
    "menu-item",
    "menu-item-type-post_type",
    "menu-item-object-page",
  ];

  if (isHome) {
    baseClasses.push(
      "menu-item-type-custom",
      "menu-item-object-custom",
      "menu-item-home"
    );
  }

  if (route.path === path) {
    baseClasses.push("current-menu-item", "current_page_item");
  }

  return baseClasses;
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const toggleTheme = async (event) => {
  event.preventDefault();
  event.stopPropagation();

  if (!document.startViewTransition) {
    applyThemeChange();
    return;
  }

  const x = event.clientX;
  const y = event.clientY;

  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  const transition = document.startViewTransition(async () => {
    applyThemeChange();
  });

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];

    document.documentElement.animate(
      {
        clipPath: clipPath,
      },
      {
        duration: 1000,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  });
};

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

const initUserInfo = () => {
  try {
    const loginUser = localStorage.getItem("loginUser");
    if (loginUser) {
      userInfo.value = JSON.parse(loginUser);
    }
  } catch (error) {
    console.error("获取用户信息失败:", error);
    userInfo.value = null;
  }
};

const goToProfile = () => {
  console.log("前往个人主页");
  isDropdownOpen.value = false;
};

const goToStars = () => {
  console.log("前往收藏");
  isDropdownOpen.value = false;
};

const goToSettings = () => {
  console.log("前往设置");
  isDropdownOpen.value = false;
};

const logout = () => {
  localStorage.removeItem("loginUser");
  userInfo.value = null;
  isDropdownOpen.value = false;
};

onMounted(() => {
  const darkmode = localStorage.getItem("darkmode");
  isDarkMode.value = darkmode === "dark";

  if (isDarkMode.value) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }

  initUserInfo();
  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<style scoped>

/* ========== 头像容器 ========== */
.avatar-container {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.avatar-container:hover {
  opacity: 0.8;
}

.user-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ========== 下拉菜单 - 更饱满的设计 ========== */
.user-dropdown-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 320px;
  border-radius: 16px;
  padding: 12px;
  z-index: 1000;
  animation: dropdownFadeIn 0.15s ease-out;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans",
    Helvetica, Arial, sans-serif;
}

/* 浅色主题 */
html:not([data-theme="dark"]) .user-dropdown-menu {
  background-color: #ffffff;
  box-shadow: 0 8px 24px rgba(140, 149, 159, 0.2);
  border: 2px solid #d0d7de;
}

/* 深色主题 */
html[data-theme="dark"] .user-dropdown-menu {
  background-color: #161b22;
  box-shadow: 0 16px 32px rgba(1, 4, 9, 0.85);
  border: 2px solid #30363d;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========== 头部信息区 ========== */
.dropdown-header {
  display: flex;
  align-items: flex-start;
  padding: 14px;
  gap: 14px;
  border-radius: 10px;
  margin-bottom: 10px;
}

html:not([data-theme="dark"]) .dropdown-header {
  background-color: #f6f8fa;
}

html[data-theme="dark"] .dropdown-header {
  background-color: #0d1117;
}

.dropdown-avatar-wrapper {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
}

html:not([data-theme="dark"]) .dropdown-avatar-wrapper {
  border: 2px solid #d0d7de;
}

html[data-theme="dark"] .dropdown-avatar-wrapper {
  border: 2px solid #30363d;
}

.dropdown-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.dropdown-user-info {
  flex: 1;
  min-width: 0;
  padding-top: 4px;
}

.dropdown-name {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

html:not([data-theme="dark"]) .dropdown-name {
  color: #24292f;
}

html[data-theme="dark"] .dropdown-name {
  color: #e6edf3;
}

.dropdown-username {
  font-size: 14px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

html:not([data-theme="dark"]) .dropdown-username {
  color: #57606a;
}

html[data-theme="dark"] .dropdown-username {
  color: #8b949e;
}

/* ========== 分割线 ========== */
.dropdown-divider {
  height: 1px;
  margin: 10px 0;
}

html:not([data-theme="dark"]) .dropdown-divider {
  background-color: #d0d7de;
}

html[data-theme="dark"] .dropdown-divider {
  background-color: #21262d;
}

/* ========== 菜单列表 - 更大的字体和图标 ========== */
.dropdown-menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu-item button {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 14px;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  gap: 14px;
}

html:not([data-theme="dark"]) .dropdown-menu-item button {
  color: #24292f;
}

html[data-theme="dark"] .dropdown-menu-item button {
  color: #e6edf3;
}

/* Hover 效果 */
html:not([data-theme="dark"]) .dropdown-menu-item button:hover {
  background-color: #f6f8fa;
}

html[data-theme="dark"] .dropdown-menu-item button:hover {
  background-color: #30363d;
}

/* 退出登录特殊样式 */
html:not([data-theme="dark"]) .dropdown-menu-item button.logout-btn:hover {
  background-color: #ffebe9;
  color: #cf222e;
}

html[data-theme="dark"] .dropdown-menu-item button.logout-btn:hover {
  background-color: rgba(248, 81, 73, 0.15);
  color: #ff7b72;
}

/* ========== 图标 - 更大的尺寸 ========== */
.dropdown-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

html:not([data-theme="dark"]) .dropdown-icon {
  fill: #57606a;
}

html[data-theme="dark"] .dropdown-icon {
  fill: #7d8590;
}

html:not([data-theme="dark"])
  .dropdown-menu-item
  button.logout-btn:hover
  .dropdown-icon {
  fill: #cf222e;
}

html[data-theme="dark"]
  .dropdown-menu-item
  button.logout-btn:hover
  .dropdown-icon {
  fill: #ff7b72;
}

.dropdown-menu-item button span {
  flex: 1;
}

/* 确保父容器定位 */
.bloglo-widget-wrapper {
  position: relative;
}
</style>
