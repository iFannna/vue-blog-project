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
              aria-controls="bloglo-primary-nav"
              type="button"
            >
              <span class="hamburger-box">
                <span class="hamburger-inner"></span>
              </span>
            </button>

            <nav
              class="site-navigation main-navigation bloglo-primary-nav bloglo-nav bloglo-header-element"
              role="navigation"
            >
              <ul class="menu">
                
                <li
                  id="menu-item-815"
                  class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-815"
                >
                  <a href="" aria-current="page"><span>主页</span></a>
                </li>
                <li
                  id="menu-item-816"
                  class="menu-item menu-item-type-post_type menu-item-object-page menu-item-816"
                >
                  <a href="/login"><span>登录</span></a>
                </li>
                <li
                  id="menu-item-816"
                  class="menu-item menu-item-type-post_type menu-item-object-page menu-item-816"
                >
                  <a href=""><span>关于</span></a>
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
              <li
                class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-815"
              >
                <a href="" aria-current="page"><span>主页</span></a>
              </li>
              <li
                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-816"
              >
                <a href=""><span>关于</span></a>
              </li>
              <li
                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-829"
              >
                <a href=""><span>联系</span></a>
              </li>
            </ul>
          </nav>
          <!-- 顶部右侧小组件 -->
          <div
            class="bloglo-header-widgets bloglo-header-element bloglo-widget-location-right"
          >
            <!-- 社交联系方式图标 -->
            <div
              class="bloglo-header-widget__socials bloglo-header-widget bloglo-hide-mobile"
            >
              <div class="bloglo-widget-wrapper">
                <nav class="bloglo-social-nav minimal-fill bloglo-large">
                  <ul id="menu-social-menu-default" class="bloglo-socials-menu">
                    <!-- 脸书 -->
                    <li class="menu-item">
                      <a href="">
                        <span class="facebook">
                          <svg
                            class="bloglo-icon"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                          >
                            <path
                              d="M18.518 32.438V17.799h4.88l.751-5.693h-5.631V8.477c0-1.627.438-2.753 2.815-2.753h3.003V.657c-.5-.125-2.315-.25-4.379-.25-4.379 0-7.32 2.628-7.32 7.507v4.192H7.695v5.693h4.942v14.639h5.881z"
                            />
                          </svg>
                          <svg
                            class="bloglo-icon bottom-icon"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                          >
                            <path
                              d="M18.518 32.438V17.799h4.88l.751-5.693h-5.631V8.477c0-1.627.438-2.753 2.815-2.753h3.003V.657c-.5-.125-2.315-.25-4.379-.25-4.379 0-7.32 2.628-7.32 7.507v4.192H7.695v5.693h4.942v14.639h5.881z"
                            />
                          </svg>
                        </span>
                      </a>
                    </li>
                    <!-- 推特 -->
                    <li class="menu-item">
                      <a href="">
                        <span class="twitter">
                          <svg
                            class="bloglo-icon"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M14.258 10.152 23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309h7.133zm-2.895 3.293-.949-1.328L2.875 1.56h3.246l6.086 8.523.945 1.328 7.91 11.078h-3.246zm0 0"
                            />
                          </svg>
                          <svg
                            class="bloglo-icon bottom-icon"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M14.258 10.152 23.176 0h-2.113l-7.747 8.813L7.133 0H0l9.352 13.328L0 23.973h2.113l8.176-9.309 6.531 9.309h7.133zm-2.895 3.293-.949-1.328L2.875 1.56h3.246l6.086 8.523.945 1.328 7.91 11.078h-3.246zm0 0"
                            />
                          </svg>
                        </span>
                      </a>
                    </li>
                    <!-- 纸飞机 -->
                    <li class="menu-item">
                      <a href="">
                        <span class="telegram">
                          <svg
                            class="bloglo-icon"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="27"
                            viewBox="0 0 32 27"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M24.512 26.372c.43.304.983.38 1.476.193.494-.188.857-.609.966-1.12C28.113 20 30.924 6.217 31.978 1.264a1.041 1.041 0 0 0-.347-1.01c-.293-.25-.7-.322-1.063-.187C24.786 2.378 8.694 8.816.516 12.155a1.06 1.06 0 0 0-.36 1.775c.262.248.637.355.995.283l6.378-1.522c.383-.093.782.028 1.05.318l4.16 4.495c.322.345.317.882-.01 1.221l-5.655 5.894c-.357.368-.416.928-.147 1.365.27.437.77.645 1.247.518l7.034-1.888c.39-.104.805.015 1.094.313l5.222 5.445z"
                            />
                          </svg>
                          <svg
                            class="bloglo-icon bottom-icon"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="27"
                            viewBox="0 0 32 27"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M24.512 26.372c.43.304.983.38 1.476.193.494-.188.857-.609.966-1.12C28.113 20 30.924 6.217 31.978 1.264a1.041 1.041 0 0 0-.347-1.01c-.293-.25-.7-.322-1.063-.187C24.786 2.378 8.694 8.816.516 12.155a1.06 1.06 0 0 0-.36 1.775c.262.248.637.355.995.283l6.378-1.522c.383-.093.782.028 1.05.318l4.16 4.495c.322.345.317.882-.01 1.221l-5.655 5.894c-.357.368-.416.928-.147 1.365.27.437.77.645 1.247.518l7.034-1.888c.39-.104.805.015 1.094.313l5.222 5.445z"
                            />
                          </svg>
                        </span>
                      </a>
                    </li>
                    <!-- Ins -->
                    <li class="menu-item">
                      <a href="">
                        <span class="instagram">
                          <svg
                            class="bloglo-icon"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                          >
                            <path
                              d="M16.016 3.284c4.317 0 4.755.063 6.444.125 1.627.063 2.44.313 3.003.5.751.313 1.314.688 1.814 1.189.563.563.938 1.126 1.189 1.814.25.626.5 1.439.563 3.003.063 1.751.125 2.19.125 6.444s-.063 4.755-.125 6.444c-.063 1.627-.313 2.44-.5 3.003-.313.751-.688 1.314-1.189 1.814-.563.563-1.126.938-1.814 1.189-.626.25-1.439.5-3.003.563-1.751.063-2.19.125-6.444.125s-4.755-.063-6.444-.125c-1.627-.063-2.44-.313-3.003-.5-.751-.313-1.314-.688-1.814-1.189-.563-.563-.938-1.126-1.189-1.814-.25-.626-.5-1.439-.563-3.003-.063-1.751-.125-2.19-.125-6.444s.063-4.755.125-6.444c.063-1.627.313-2.44.5-3.003.313-.751.688-1.314 1.189-1.814.563-.563 1.126-.938 1.814-1.189.626-.25 1.439-.5 3.003-.563 1.689-.063 2.127-.125 6.444-.125zM16.016.578c-4.38 0-4.88.063-6.632.125-1.689.063-2.878.313-3.942.688-1.064.375-1.939.938-2.815 1.814s-1.439 1.814-1.814 2.815c-.375 1.001-.563 2.19-.688 3.942C.063 11.136 0 11.636 0 16.016s.063 4.88.125 6.632c.063 1.689.313 2.878.688 3.942.375 1.064.938 1.939 1.814 2.815s1.814 1.439 2.815 1.814c1.001.375 2.19.563 3.942.688 1.751.063 2.252.125 6.632.125s4.88-.063 6.632-.125c1.689-.063 2.878-.313 3.942-.688 1.064-.375 1.939-.938 2.815-1.814s1.439-1.814 1.814-2.815c.375-1.001.563-2.19.688-3.942.063-1.751.125-2.252.125-6.632s-.063-4.88-.125-6.632c-.063-1.689-.313-2.878-.688-3.942-.375-1.064-.938-1.939-1.814-2.815s-1.814-1.439-2.815-1.814c-1.001-.375-2.19-.563-3.942-.688C20.896.641 20.396.578 16.016.578z"
                            />
                            <path
                              d="M16.016 7.784c-4.568 0-8.232 3.665-8.232 8.232s3.665 8.232 8.232 8.232 8.232-3.665 8.232-8.232-3.665-8.232-8.232-8.232zm0 13.796c-3.065 0-5.564-2.499-5.564-5.564s2.499-5.564 5.564-5.564 5.564 2.499 5.564 5.564-2.499 5.564-5.564 5.564zM26.647 7.471a1.939 1.939 0 11-3.878 0 1.939 1.939 0 013.878 0z"
                            />
                          </svg>
                          <svg
                            class="bloglo-icon bottom-icon"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                          >
                            <path
                              d="M16.016 3.284c4.317 0 4.755.063 6.444.125 1.627.063 2.44.313 3.003.5.751.313 1.314.688 1.814 1.189.563.563.938 1.126 1.189 1.814.25.626.5 1.439.563 3.003.063 1.751.125 2.19.125 6.444s-.063 4.755-.125 6.444c-.063 1.627-.313 2.44-.5 3.003-.313.751-.688 1.314-1.189 1.814-.563.563-1.126.938-1.814 1.189-.626.25-1.439.5-3.003.563-1.751.063-2.19.125-6.444.125s-4.755-.063-6.444-.125c-1.627-.063-2.44-.313-3.003-.5-.751-.313-1.314-.688-1.814-1.189-.563-.563-.938-1.126-1.189-1.814-.25-.626-.5-1.439-.563-3.003-.063-1.751-.125-2.19-.125-6.444s.063-4.755.125-6.444c.063-1.627.313-2.44.5-3.003.313-.751.688-1.314 1.189-1.814.563-.563 1.126-.938 1.814-1.189.626-.25 1.439-.5 3.003-.563 1.689-.063 2.127-.125 6.444-.125zM16.016.578c-4.38 0-4.88.063-6.632.125-1.689.063-2.878.313-3.942.688-1.064.375-1.939.938-2.815 1.814s-1.439 1.814-1.814 2.815c-.375 1.001-.563 2.19-.688 3.942C.063 11.136 0 11.636 0 16.016s.063 4.88.125 6.632c.063 1.689.313 2.878.688 3.942.375 1.064.938 1.939 1.814 2.815s1.814 1.439 2.815 1.814c1.001.375 2.19.563 3.942.688 1.751.063 2.252.125 6.632.125s4.88-.063 6.632-.125c1.689-.063 2.878-.313 3.942-.688 1.064-.375 1.939-.938 2.815-1.814s1.439-1.814 1.814-2.815c.375-1.001.563-2.19.688-3.942.063-1.751.125-2.252.125-6.632s-.063-4.88-.125-6.632c-.063-1.689-.313-2.878-.688-3.942-.375-1.064-.938-1.939-1.814-2.815s-1.814-1.439-2.815-1.814c-1.001-.375-2.19-.563-3.942-.688C20.896.641 20.396.578 16.016.578z"
                            />
                            <path
                              d="M16.016 7.784c-4.568 0-8.232 3.665-8.232 8.232s3.665 8.232 8.232 8.232 8.232-3.665 8.232-8.232-3.665-8.232-8.232-8.232zm0 13.796c-3.065 0-5.564-2.499-5.564-5.564s2.499-5.564 5.564-5.564 5.564 2.499 5.564 5.564-2.499 5.564-5.564 5.564zM26.647 7.471a1.939 1.939 0 11-3.878 0 1.939 1.939 0 013.878 0z"
                            />
                          </svg>
                        </span>
                      </a>
                    </li>
                    <!-- 油管 -->
                    <li class="menu-item">
                      <a href="">
                        <span class="youtube">
                          <svg
                            class="bloglo-icon"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                          >
                            <path
                              d="M31.718 10.041s-.313-2.252-1.251-3.191c-1.251-1.314-2.628-1.314-3.253-1.376-4.442-.313-11.198-.313-11.198-.313s-6.757 0-11.198.313c-.626.063-2.002.063-3.253 1.376C.688 7.789.375 10.041.375 10.041S0 12.606 0 15.233v2.44c0 2.628.313 5.192.313 5.192s.313 2.252 1.251 3.191c1.251 1.314 2.878 1.251 3.629 1.376 2.628.313 10.84.376 10.84.376s6.82 0 11.198-.376c.626-.063 2.002-.063 3.253-1.376.938-.938 1.251-3.191 1.251-3.191s.313-2.565.313-5.192v-2.44c-.063-2.628-.375-5.192-.375-5.192zm-18.893 10.59V8.854l8.67 5.88-8.67 5.88z"
                            />
                          </svg>
                          <svg
                            class="bloglo-icon bottom-icon"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                          >
                            <path
                              d="M31.718 10.041s-.313-2.252-1.251-3.191c-1.251-1.314-2.628-1.314-3.253-1.376-4.442-.313-11.198-.313-11.198-.313s-6.757 0-11.198.313c-.626.063-2.002.063-3.253 1.376C.688 7.789.375 10.041.375 10.041S0 12.606 0 15.233v2.44c0 2.628.313 5.192.313 5.192s.313 2.252 1.251 3.191c1.251 1.314 2.878 1.251 3.629 1.376 2.628.313 10.84.376 10.84.376s6.82 0 11.198-.376c.626-.063 2.002-.063 3.253-1.376.938-.938 1.251-3.191 1.251-3.191s.313-2.565.313-5.192v-2.44c-.063-2.628-.375-5.192-.375-5.192zm-18.893 10.59V8.854l8.67 5.88-8.67 5.88z"
                            />
                          </svg>
                        </span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
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
                        d="M28.962 26.499l-4.938-4.938c1.602-2.002 2.669-4.671 2.669-7.474 0-6.673-5.339-12.012-12.012-12.012S2.669 7.414 2.669 14.087a11.962 11.962 0 0012.012 12.012c2.803 0 5.472-1.067 7.474-2.669l4.938 4.938a1.6 1.6 0 002.335 0l-.466.531c.602-.602.602-1.601 0-2.4zm-14.281-3.736c-4.808 0-8.676-3.869-8.676-8.676s3.869-8.676 8.676-8.676 8.676 3.869 8.676 8.676-3.869 8.676-8.676 8.676z"
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
            <!-- 登录按钮 -->
            <div
              class="bloglo-header-widget__button bloglo-header-widget bloglo-hide-mobile-tablet"
            >
              <div class="bloglo-widget-wrapper">
                <a
                  class="btn-small bloglo-btn login-btn"
                  target="_self"
                  href="/login"
                  ><span>登录</span></a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isDarkMode = ref(false);

// 主题切换函数 - 真正的圆形扩散动画
const toggleTheme = async (event) => {
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
        duration: 1000,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)'
      }
    );
  });
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

// 初始化主题
onMounted(() => {
  const darkmode = localStorage.getItem("darkmode");
  isDarkMode.value = darkmode === "dark";

  if (isDarkMode.value) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
});
</script>

<style scoped>

.site-header {
  width: 100%;
  height: 8rem;
  clear: both;
  position: relative;
}

/* 隐藏 checkbox，只通过 label 的 @click 触发 */
.bloglo-darkmode input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}
</style>