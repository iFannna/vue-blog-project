<script setup>
import { ref, onMounted } from "vue";
import { getMostStarArticlesApi, getMostShareArticlesApi } from "@/api/article";

// 定义响应式数据存储接口返回的文章列表
const mostStarArticles = ref([]); // 最星标文章
const mostShareArticles = ref([]); // 最分享文章

// 日期格式化函数
const formatPublishTime = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  // 定义英文月份名称
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

// 页面挂载后调用接口获取数据
onMounted(async () => {
  try {
    // 获取最星标文章数据
    const starRes = await getMostStarArticlesApi();
    if (starRes.code === 1) {
      mostStarArticles.value = starRes.data || [];
    }

    // 获取最分享文章数据
    const shareRes = await getMostShareArticlesApi();
    if (shareRes.code === 1) {
      mostShareArticles.value = shareRes.data || [];
    }
  } catch (error) {
    console.error("获取文章列表失败：", error);
  }
});
</script>

<template>
  <!--页脚-->
  <footer id="colophon" class="site-footer" role="contentinfo">
    <!--页脚内容-->
    <div id="bloglo-footer">
      <div class="bloglo-container">
        <div class="bloglo-flex-row" id="bloglo-footer-widgets">
          <!--精选文章栏目-->
          <div
            class="bloglo-footer-column col-xs-12 col-sm-6 stretch-xs col-md-4"
          >
            <div
              class="bloglo-footer-widget bloglo-widget bloglo-entry widget widget_block"
            >
              <div class="h4 widget-title">精品文选</div>
              <div class="wp-widget-group__inner-blocks">
                <ul
                  class="wp-block-latest-posts__list has-dates has-author wp-block-latest-posts"
                  v-if="mostStarArticles.length"
                >
                  <li v-for="article in mostStarArticles" :key="article.id">
                    <div
                      class="wp-block-latest-posts__featured-image alignleft"
                    >
                      <a :href="article.url">
                        <img
                          loading="lazy"
                          decoding="async"
                          width="150"
                          height="150"
                          :src="article.coverImage"
                          class="attachment-thumbnail size-thumbnail wp-post-image square-thumb"
                          style="max-width: 75px; max-height: 75px"
                        />
                      </a>
                    </div>
                    <a
                      class="wp-block-latest-posts__post-title"
                      :href="article.url"
                    >
                      {{ article.title }}
                    </a>
                    <div class="wp-block-latest-posts__post-author">
                      by {{ article.authorName }}
                    </div>
                    <div class="wp-block-latest-posts__post-date">
                      {{ formatPublishTime(article.publishAt) }}
                    </div>
                  </li>
                </ul>
                <!-- 无数据时的占位提示 -->
                <div
                  class="no-data"
                  v-else
                  style="color: #999; padding: 10px 0"
                >
                  暂无文章
                </div>
              </div>
            </div>
          </div>

          <!--编辑精选栏目-->
          <div
            class="bloglo-footer-column col-xs-12 col-sm-6 stretch-xs col-md-4"
          >
            <div
              class="bloglo-footer-widget bloglo-widget bloglo-entry widget widget_block"
            >
              <div class="h4 widget-title">编辑精选</div>
              <div class="wp-widget-group__inner-blocks">
                <div class="wp-widget-group__inner-blocks">
                  <ul
                    class="wp-block-latest-posts__list has-dates has-author wp-block-latest-posts"
                    v-if="mostShareArticles.length"
                  >
                    <li v-for="article in mostShareArticles" :key="article.id">
                      <div
                        class="wp-block-latest-posts__featured-image alignleft"
                      >
                        <a :href="article.url">
                          <img
                            loading="lazy"
                            decoding="async"
                            width="150"
                            height="150"
                            :src="article.coverImage"
                            class="attachment-thumbnail size-thumbnail wp-post-image square-thumb"
                            style="max-width: 75px; max-height: 75px"
                          />
                        </a>
                      </div>
                      <a
                        class="wp-block-latest-posts__post-title"
                        :href="article.url"
                      >
                        {{ article.title }}
                      </a>
                      <div class="wp-block-latest-posts__post-author">
                        by {{ article.authorName }}
                      </div>
                      <div class="wp-block-latest-posts__post-date">
                        {{ formatPublishTime(article.publishAt) }}
                      </div>
                    </li>
                  </ul>
                  <!-- 无数据时的占位提示 -->
                  <div
                    class="no-data"
                    v-else
                    style="color: #999; padding: 10px 0"
                  >
                    暂无文章
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--信息栏目-->
          <div
            class="bloglo-footer-column col-xs-12 col-sm-6 stretch-xs col-md-4"
          >
            <div
              class="bloglo-footer-widget bloglo-widget bloglo-entry widget widget_block"
            >
              <div class="wp-block-columns is-layout-flex">
                <div class="wp-block-column is-layout-flow">
                  <h6 class="wp-block-heading">其他</h6>

                  <ul class="wp-block-categories-list wp-block-categories">
                    <li class="cat-item cat-item-2">
                      <a href="">留言</a>
                      <span> 5 </span>
                    </li>
                    <li class="cat-item cat-item-3">
                      <a href="">友链</a>
                      <span> 4 </span>
                    </li>
                  </ul>
                </div>

                <div class="wp-block-column is-layout-flow">
                  <h6 class="wp-block-heading">帮助 &amp; 信息</h6>

                  <div class="widget widget_nav_menu">
                    <div class="menu-footer-menu-container">
                      <ul id="menu-footer-menu" class="menu">
                        <li
                          class="menu-item menu-item-type-post_type menu-item-object-page menu-item-831"
                        >
                          <a href="/about">关于</a>
                        </li>
                        <li
                          id="menu-item-830"
                          class="menu-item menu-item-type-post_type menu-item-object-page menu-item-830"
                        >
                          <a href="/contact">联系</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bloglo-footer-widget bloglo-widget bloglo-entry widget widget_block"
            >
              <div
                class="wp-block-columns are-vertically-aligned-top is-layout-flex"
              >
                <div
                  class="wp-block-column is-vertically-aligned-top is-layout-flow"
                  style="flex-basis: 42%"
                >
                  <p
                    class="has-black-color has-text-color"
                    style="font-size: 17px"
                  >
                    <strong>邮箱:</strong><br /><a
                      href="mailto:mail@example.com"
                      >mail@example.com</a
                    >
                  </p>
                </div>

                <div
                  class="wp-block-column is-vertically-aligned-top is-layout-flow"
                  style="flex-basis: 42%"
                >
                  <p
                    class="has-black-color has-text-color"
                    style="font-size: 17px"
                  >
                    <strong>电话:</strong><br /><a href="tel:123-456-7890"
                      >123-456-7890</a
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--版权信息-->
    <div id="bloglo-copyright" class="fw-separator">
      <div class="bloglo-container">
        <div class="bloglo-flex-row">
          <div class="col-xs-12 center-xs col-md flex-basis-auto start-md">
            <div
              class="bloglo-copyright-widget__text bloglo-copyright-widget bloglo-all"
            >
              <span>Copyright 2025 &mdash; 赵瑾瑜的个人博客.</span>
            </div>
          </div>
          <div class="col-xs-12 center-xs col-md flex-basis-auto end-md">
            <div
              class="bloglo-copyright-widget__text bloglo-copyright-widget bloglo-all"
            >
              <a
                href="http://beian.miit.gov.cn/"
                class="imprint"
                target="_blank"
                rel="noopener noreferrer"
                >赣ICP备2025076466号-1</a
              >
              ——
              <a href="https://beian.mps.gov.cn/#/query/webSearch?code=50010802006648" rel="noreferrer" target="_blank" data-v-4896eafd="">渝公网安备50010802006648号</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.bilibili-text {
  margin-top: 0.3rem;
  margin-left: 0.5rem;
  color: #e87299;
}
/* ==================== 深色主题适配 ==================== */

/* 页脚背景 - 使用更高优先级 */
[data-theme="dark"] #colophon.site-footer {
  background-color: rgba(0, 0, 0, 0.3) !important;
  transition: background-color 0.3s ease;
}

/* 页脚内容区域背景 */
[data-theme="dark"] #bloglo-footer {
  background-color: transparent !important;
}

/* 页脚容器背景 */
[data-theme="dark"] #bloglo-footer .bloglo-container {
  background-color: transparent !important;
}

/* Widget 标题 */
[data-theme="dark"] #colophon .widget-title,
[data-theme="dark"] #colophon .h4.widget-title,
[data-theme="dark"] #colophon .wp-block-heading,
[data-theme="dark"] #colophon h6 {
  color: rgba(255, 255, 255, 0.95) !important;
}

/* 文章标题链接 */
[data-theme="dark"] #colophon .wp-block-latest-posts__post-title {
  color: rgba(255, 255, 255, 0.9) !important;
  transition: color 0.3s ease;
}

[data-theme="dark"] #colophon .wp-block-latest-posts__post-title:hover {
  color: #667eea !important;
}

/* 作者和日期信息 */
[data-theme="dark"] #colophon .wp-block-latest-posts__post-author,
[data-theme="dark"] #colophon .wp-block-latest-posts__post-date {
  color: rgba(255, 255, 255, 0.6) !important;
}

/* 分类列表 */
[data-theme="dark"] #colophon .wp-block-categories-list a,
[data-theme="dark"] #colophon .cat-item a {
  color: rgba(255, 255, 255, 0.8) !important;
  transition: color 0.3s ease;
}

[data-theme="dark"] #colophon .wp-block-categories-list a:hover,
[data-theme="dark"] #colophon .cat-item a:hover {
  color: #667eea !important;
}

[data-theme="dark"] #colophon .wp-block-categories-list span,
[data-theme="dark"] #colophon .cat-item span {
  color: rgba(255, 255, 255, 0.5) !important;
}

/* 菜单链接 */
[data-theme="dark"] #colophon .menu a,
[data-theme="dark"] #colophon .menu-item a {
  color: rgba(255, 255, 255, 0.8) !important;
  transition: color 0.3s ease;
}

[data-theme="dark"] #colophon .menu a:hover,
[data-theme="dark"] #colophon .menu-item a:hover {
  color: #667eea !important;
}

/* 联系信息文本 - 使用最高优先级覆盖内联样式 */
[data-theme="dark"] #colophon .has-black-color.has-text-color,
[data-theme="dark"] #colophon p.has-black-color.has-text-color {
  color: rgba(255, 255, 255, 0.9) !important;
}

[data-theme="dark"] #colophon .has-black-color.has-text-color strong,
[data-theme="dark"] #colophon p.has-black-color.has-text-color strong {
  color: rgba(255, 255, 255, 0.95) !important;
}

/* 邮箱和电话链接 */
[data-theme="dark"] #colophon .has-black-color.has-text-color a,
[data-theme="dark"] #colophon p.has-black-color.has-text-color a {
  color: rgba(255, 255, 255, 0.7) !important;
  transition: color 0.3s ease;
}

[data-theme="dark"] #colophon .has-black-color.has-text-color a:hover,
[data-theme="dark"] #colophon p.has-black-color.has-text-color a:hover {
  color: #667eea !important;
}

/* 社交媒体链接 */
[data-theme="dark"] #colophon .wp-block-social-links .wp-block-social-link a,
[data-theme="dark"] #colophon .wp-block-social-link-anchor {
  color: rgba(255, 255, 255, 0.9) !important;
  transition: all 0.3s ease;
}

[data-theme="dark"]
  #colophon
  .wp-block-social-links
  .wp-block-social-link
  a:hover,
[data-theme="dark"] #colophon .wp-block-social-link-anchor:hover {
  color: #ffffff !important;
}

/* 社交媒体图标 SVG */
[data-theme="dark"] #colophon .wp-block-social-links svg {
  fill: rgba(255, 255, 255, 0.9) !important;
  transition: fill 0.3s ease;
}

[data-theme="dark"] #colophon .wp-block-social-links a:hover svg {
  fill: #ffffff !important;
}

/* 社交媒体标签文字 */
[data-theme="dark"] #colophon .wp-block-social-link-label {
  color: rgba(255, 255, 255, 0.9) !important;
}

/* 版权区域 */
[data-theme="dark"] #bloglo-copyright {
  background-color: rgba(0, 0, 0, 0.4) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
  transition: background-color 0.3s ease;
}

/* 版权文字 */
[data-theme="dark"] #bloglo-copyright .bloglo-copyright-widget__text,
[data-theme="dark"] #bloglo-copyright .bloglo-copyright-widget__text span {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* 版权链接 */
[data-theme="dark"] #bloglo-copyright .bloglo-copyright-widget__text a {
  color: rgba(255, 255, 255, 0.8) !important;
  transition: color 0.3s ease;
}

[data-theme="dark"] #bloglo-copyright .bloglo-copyright-widget__text a:hover {
  color: #667eea !important;
}

/* Widget 容器 */
[data-theme="dark"] #colophon .bloglo-footer-widget {
  background-color: transparent !important;
}

/* 图片在深色模式下的优化 */
[data-theme="dark"] #colophon .wp-block-latest-posts__featured-image img {
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

[data-theme="dark"] #colophon .wp-block-latest-posts__featured-image img:hover {
  opacity: 1;
}

/* 分隔线 */
[data-theme="dark"] #colophon .fw-separator {
  border-color: rgba(255, 255, 255, 0.1) !important;
}

/* 列表项 */
[data-theme="dark"] #colophon .has-dates li,
[data-theme="dark"] #colophon .has-author li {
  border-color: rgba(255, 255, 255, 0.1) !important;
}

/* Widget 块 */
[data-theme="dark"] #colophon .widget_block {
  color: rgba(255, 255, 255, 0.8) !important;
}

/* 通用段落文字 */
[data-theme="dark"] #colophon.site-footer p {
  color: rgba(255, 255, 255, 0.8) !important;
}

/* 通用链接 */
[data-theme="dark"] #colophon.site-footer a:not(.wp-block-social-link-anchor) {
  color: rgba(255, 255, 255, 0.8) !important;
  transition: color 0.3s ease;
}

[data-theme="dark"]
  #colophon.site-footer
  a:not(.wp-block-social-link-anchor):hover {
  color: #667eea !important;
}

/* 列容器背景 */
[data-theme="dark"] #colophon .wp-block-column,
[data-theme="dark"] #colophon .wp-block-columns {
  background-color: transparent !important;
}

/* 列表样式 */
[data-theme="dark"] #colophon ul {
  color: rgba(255, 255, 255, 0.8) !important;
}

[data-theme="dark"] #colophon li {
  color: rgba(255, 255, 255, 0.8) !important;
}
</style>
