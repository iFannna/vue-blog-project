<script setup>
import { ref, onMounted } from "vue";
import { getTagsApi } from "@/api/tag";
import { getCategoriesApi } from "@/api/category";
import { getHotArticlesApi } from "@/api/article";

// 定义响应式数据存储接口返回数据
const hotArticles = ref([]); // 热门文章列表
const tags = ref([]); // 标签列表
const categories = ref([]); // 分类列表

const formatPublishTime = (timeStr) => {
  if (!timeStr) return "";
  const date = new Date(timeStr);
  const monthMap = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthMap[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

// 页面挂载后请求数据
onMounted(async () => {
  try {
    // 并行请求三个接口数据
    const [hotArticleRes, tagsRes, categoriesRes] = await Promise.all([
      getHotArticlesApi(),
      getTagsApi(),
      getCategoriesApi()
    ]);

    // 赋值响应式数据（判断接口返回code为0时取data）
    if (hotArticleRes.code === 1) {
      hotArticles.value = hotArticleRes.data;
    }
    if (tagsRes.code === 1) {
      tags.value = tagsRes.data;
    }
    if (categoriesRes.code === 1) {
      categories.value = categoriesRes.data;
    }
  } catch (error) {
    console.error("数据请求失败：", error);
  }
});
</script>

<template>
  <!--侧边栏--->
  <aside
    id="secondary"
    class="widget-area bloglo-sidebar-container"
    role="complementary"
  >
    <div class="bloglo-sidebar-inner">
      <!--个人信息-->
      <div
        class="bloglo-sidebar-widget bloglo-widget bloglo-entry widget widget_block"
      >
        <div class="is-content-justification-left is-nowrap is-layout-flex">
          <div class="wp-block-image is-style-rounded">
            <figure class="alignleft size-large is-resized">
              <img
                loading="lazy"
                decoding="async"
                width="1024"
                height="731"
                src="https://java-ai-sau.oss-cn-beijing.aliyuncs.com/2025/04/312b700a-e1c7-42bf-aa23-5db8dc7121a6.jpg"
                alt=""
                style="object-fit: cover; width: 70px; height: 70px"
                sizes="auto, (max-width: 1024px) 100vw, 1024px"
              />
            </figure>
          </div>
          <p style="font-size: 1.6rem">
            <strong>赵瑾瑜</strong><br />开发者 &amp; 编辑
          </p>
        </div>
        <p style="font-size: 1.6rem">
          你好！我是赵瑾瑜，一位在读的大学生。该博客使用Vue+SpringBoot独立开发
        </p>
        <ul class="is-content-justification-left is-layout-flex">
          <a href="" class="icon-container">
            <span>
              <img
                src="https://java-ai-sau.oss-cn-beijing.aliyuncs.com/nodejs.png"
                width="24"
                height="24"
              />
            </span>
          </a>
          <a href="" class="icon-container">
            <span>
              <img
                src="https://java-ai-sau.oss-cn-beijing.aliyuncs.com/vue.png"
                width="24"
                height="24"
              />
            </span>
          </a>
          <a href="" class="icon-container">
            <span>
              <img
                src="https://java-ai-sau.oss-cn-beijing.aliyuncs.com/spring.png"
                width="24"
                height="24"
              />
            </span>
          </a>
          <a href="" class="icon-container">
            <span>
              <img
                src="https://java-ai-sau.oss-cn-beijing.aliyuncs.com/mysql.png"
                width="24"
                height="24"
              />
            </span>
          </a>
          <a href="" class="icon-container">
            <span>
              <img
                src="https://java-ai-sau.oss-cn-beijing.aliyuncs.com/redis.png"
                width="24"
                height="24"
              />
            </span>
          </a>

          <a href="" class="icon-container">
            <span>
              <img
                src="https://java-ai-sau.oss-cn-beijing.aliyuncs.com/git.png"
                width="24"
                height="24"
              />
            </span>
          </a>
          <a href="" class="icon-container">
            <span>
              <img
                src="https://java-ai-sau.oss-cn-beijing.aliyuncs.com/nginx.png"
                width="24"
                height="24"
              />
            </span>
          </a>
        </ul>
      </div>

      <!--热点-->
      <div
        class="bloglo-sidebar-widget bloglo-widget bloglo-entry widget widget_block"
      >
        <div class="h4 widget-title">热点</div>
        <!-- 第一篇文章大图展示 - 动态渲染 -->
        <ul v-if="hotArticles.length > 0">
          <li>
            <div class="wp-block-latest-posts__featured-image">
              <a :href="hotArticles[0].url">
                <img
                  loading="lazy"
                  decoding="async"
                  width="1024"
                  height="731"
                  :src="hotArticles[0].coverImage"
                  class="attachment-large size-large"
                  sizes="auto, (max-width: 1024px) 100vw, 1024px"
                  :alt="hotArticles[0].title"
                />
              </a>
            </div>
            <a class="wp-block-latest-posts__post-title" :href="hotArticles[0].url">
              {{ hotArticles[0].title }}
            </a>
            <div class="wp-block-latest-posts__post-author">by {{ hotArticles[0].authorName }}</div>
            <div class="wp-block-latest-posts__post-date">{{ hotArticles[0].publishAt }}</div>
          </li>
        </ul>
        <p v-else>暂无热门文章</p>

        <!-- 小图展示，只展示3篇 - 动态渲染 -->
        <ul 
          class="wp-block-latest-posts__list has-dates wp-block-latest-posts"
          v-for="(article, index) in hotArticles.slice(1, 4)" 
          :key="article.id + index"
        >
          <li>
            <div class="wp-block-latest-posts__featured-image alignleft">
              <a :href="article.url">
                <img
                  loading="lazy"
                  decoding="async"
                  width="150"
                  height="150"
                  :src="article.coverImage"
                  class="attachment-thumbnail size-thumbnail wp-post-image"
                  :alt="article.title"
                  style="max-width: 75px; max-height: 75px"
                />
              </a>
            </div>
            <a class="wp-block-latest-posts__post-title" :href="article.url">
              {{ article.title }}
            </a>
            <div class="wp-block-latest-posts__post-author">by {{ article.authorName }}</div>
            <div class="wp-block-latest-posts__post-date">{{ formatPublishTime(article.publishAt) }}</div>
          </li>
        </ul>
      </div>

      <!--搜索-->
      <div
        class="bloglo-sidebar-widget bloglo-widget bloglo-entry widget widget_block widget_search"
      >
        <form
          method="get"
          action="/"
          class="wp-block-search__button-outside wp-block-search__icon-button wp-block-search"
        >
          <label class="wp-block-search__label" for="wp-block-search__input-2">
            搜索
          </label>
          <div class="wp-block-search__inside-wrapper">
            <input
              class="wp-block-search__input"
              id="wp-block-search__input-2"
              placeholder=""
              value=""
              type="search"
              name="s"
              required
            />
            <button
              class="wp-block-search__button has-icon wp-element-button"
              type="submit"
            >
              <svg
                class="search-icon"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  d="M13 5c-3.3 0-6 2.7-6 6 0 1.4.5 2.7 1.3 3.7l-3.8 3.8 1.1 1.1 3.8-3.8c1 .8 2.3 1.3 3.7 1.3 3.3 0 6-2.7 6-6S16.3 5 13 5zm0 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"
                ></path>
              </svg>
            </button>
          </div>
        </form>
      </div>

      <!--分类 - 动态渲染-->
      <div
        class="bloglo-sidebar-widget bloglo-widget bloglo-entry widget widget_block"
      >
        <h2 class="wp-block-heading">分类</h2>
        <ul class="wp-block-categories-list wp-block-categories" v-if="categories.length > 0">
          <li v-for="category in categories" :key="category.id">
            <a :href="`/category/${category.name}`">{{ category.name }}</a>
          </li>
        </ul>
        <p v-else>暂无分类</p>
      </div>

      <!--标签 - 动态渲染-->
      <div
        class="bloglo-sidebar-widget bloglo-widget bloglo-entry widget widget_block"
      >
        <div class="h4 widget-title">标签</div>
        <div class="wp-widget-group__inner-blocks">
          <p class="wp-block-tag-cloud" v-if="tags.length > 0">
            <a 
              v-for="tag in tags" 
              :key="tag.id"
              :href="`/tag/${tag.name}`" 
              style="font-size: 8pt"
            >
              {{ tag.name }}
            </a>
          </p>
          <p v-else>暂无标签</p>
        </div>
      </div>

      <!--功能-->
      <div
        class="bloglo-sidebar-widget bloglo-widget bloglo-entry widget widget_meta"
      >
        <div class="h4 widget-title">功能</div>
        <ul>
          <li><a href="/setting">设置</a></li>
          <li><a href="/login">登录</a></li>
          <li><a href="/logout">退出</a></li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.icons-container {
  margin-top: 1rem;
}
.icon-container {
  transition: transform 0.3s ease;
  display: inline-block; /* 修复图标间距问题 */
  margin: 0 4px; /* 增加图标间距 */
}
.icon-container:hover {
  transform: scale(1.1);
}
</style>