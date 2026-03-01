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
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useTheme } from "@/composables/useTheme";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { isDarkMode, toggleTheme } = useTheme();
const userInfo = computed(() => userStore.userInfo);
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
  userStore.clearUserInfo();
  isDropdownOpen.value = false;
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<style scoped>
/* 确保父容器定位 */
.bloglo-widget-wrapper {
  position: relative;
}
</style>
