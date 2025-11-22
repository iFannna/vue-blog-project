<script setup>
import { ref, onMounted, computed } from "vue";
import { queryArticlePageApi } from "@/api/article";

// 响应式数据定义
const currentPage = ref(1); // 当前页码
const pageSize = ref(10); // 每页展示数量
const articles = ref([]); // 文章列表
const total = ref(0); // 总文章数

// 计算总页数
const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

// 格式化时间：将 2025-11-12 11:20:00 转为 July 24, 2023 格式
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

// 新增：滚动到页面顶部（平滑滚动）
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "auto" // 平滑滚动，若需要立即滚动可改为 'auto'
  });
};

// 获取文章列表数据
const getArticleList = async () => {
  try {
    const response = await queryArticlePageApi(currentPage.value, pageSize.value);
    if (response.code === 1) {
      articles.value = response.data.rows || [];
      total.value = response.data.total || 0;
    }
  } catch (error) {
    console.error("获取文章列表失败：", error);
  }
};

// 分页事件处理
const handlePrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    scrollToTop(); // 调用滚动到顶部函数
    getArticleList();
  }
};

const handleNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    scrollToTop(); // 调用滚动到顶部函数
    getArticleList();
  }
};

const handlePageChange = (page) => {
  currentPage.value = page;
  scrollToTop(); // 调用滚动到顶部函数
  getArticleList();
};

// 页面挂载时加载数据
onMounted(() => {
  getArticleList();
});
</script>

<template>
  <!--主要内容-->
  <div id="primary" class="content-area">
    <main id="content" class="site-content">
      <!--文章列表 按发布时间排序 最新发布显示在最上面-->
      <div class="bloglo-flex-row g-4">
        <!-- 动态渲染文章列表：区分普通文章(type=1)和引用文章(type=2) -->
        <template v-for="article in articles" :key="article.id">
          <!-- 普通文章(type=1) -->
          <div v-if="article.type === 1" class="col-md-12 col-sm-12 col-xs-12">
            <article class="bloglo-article">
              <div class="bloglo-blog-entry-wrapper bloglo-thumb-left">
                <div class="post-thumb entry-media">
                  <a :href="article.url">
                    <img
                      width="1024"
                      height="731"
                      decoding="async"
                      :src="article.coverImage"
                      alt="文章封面"
                    />
                  </a>
                </div>
                <div>
                  <div class="post-category">
                    <span class="cat-links">
                      <span>
                        <a
                          v-for="category in article.categories"
                          :key="category"
                          :href="`/category/${category.name}`"
                          rel="category"
                        >
                          {{ category.name }}
                        </a>
                      </span>
                    </span>
                  </div>
                  <header class="entry-header">
                    <h4 class="entry-title">
                      <a :href="article.url">{{ article.title }}</a>
                    </h4>
                  </header>
                  <div class="entry-meta">
                    <div class="entry-meta-elements">
                      <span>
                        <span class="posted-by vcard author">
                          <span class="author-avatar">
                            <img
                              :src="article.authorAvatar"
                              height="30"
                              width="30"
                              decoding="async"
                              alt="作者头像"
                            />
                          </span>
                          <span>
                            By
                            <a :href="`/author/${article.authorId}`">
                              <span> {{ article.authorName }} </span>
                            </a>
                          </span>
                        </span>
                      </span>
                      <span>
                        <svg
                          class="bloglo-icon"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 29.36 29.36"
                        >
                          <path
                            d="M14.68 0a14.68 14.68 0 1014.68 14.68A14.64 14.64 0 0014.68 0zm0 26.69a12 12 0 1112-12 12 12 0 01-12 12zm5.87-10.54L16 13.88V6.67a1.25 1.25 0 00-1.33-1.33 1.26 1.26 0 00-1.34 1.33v8a1.28 1.28 0 00.81 1.2l5.33 2.67c.14.13.27.13.54.13a1.28 1.28 0 001.2-.8 1.41 1.41 0 00-.67-1.73z"
                          />
                        </svg>
                        {{ formatPublishTime(article.publishAt) }}
                      </span>
                    </div>
                  </div>
                  <div class="entry-summary" v-if="article.summary">
                    {{ article.summary }}&hellip;
                  </div>
                  <footer class="entry-footer">
                    <a :href="article.url" class="bloglo-btn btn-text-1">
                      <span>阅读更多</span>
                    </a>
                  </footer>
                </div>
              </div>
            </article>
          </div>

          <!-- 引用类型文章(type=2) -->
          <div v-else-if="article.type === 2" class="col-md-12 col-sm-12 col-xs-12">
            <article class="bloglo-article post_format-post-format-quote">
              <div class="bloglo-blog-entry-content">
                <div class="entry-content">
                  <div
                    class="quote-post-bg"
                    :style="article.coverImage ? `background-image: url('${article.coverImage}')` : ''"
                  ></div>
                  <div class="quote-inner">
                    <svg
                      class="bloglo-icon icon-quote"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 123.961 123.961"
                    >
                      <path
                        d="M49.8 29.032c3.1-1.3 4.4-5 3-8l-4.9-10.3c-1.4-2.899-4.8-4.2-7.8-2.899-8.5 3.6-15.8 8.3-21.6 14C11.4 28.532 6.6 36.232 4 44.732c-2.6 8.601-4 20.3-4 35.2v30.7c0 3.3 2.7 6 6 6h39.3c3.3 0 6-2.7 6-6v-39.3c0-3.301-2.7-6-6-6H26.5c.2-10.101 2.6-18.2 7-24.301 3.6-4.898 9-8.898 16.3-11.999zM120.4 29.032c3.1-1.3 4.399-5 3-8l-4.9-10.199c-1.4-2.9-4.8-4.2-7.8-2.9-8.4 3.6-15.601 8.3-21.5 13.9-7.101 6.8-12 14.5-14.601 23-2.6 8.399-3.899 20.1-3.899 35.1v30.7c0 3.3 2.7 6 6 6H116c3.3 0 6-2.7 6-6v-39.3c0-3.301-2.7-6-6-6H97.1c.2-10.101 2.601-18.2 7-24.301 3.6-4.899 9-8.899 16.3-12z"
                      />
                    </svg>
                    <!-- 引用文章可选：若需要跳转，也可添加链接 -->
                    <h3>
                      <p>{{ article.quoteContent }}</p>
                    </h3>
                    <div class="author">{{ article.authorName }}</div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </template>
      </div>

      <!-- 分页条：超过10篇文章时显示 -->
      <div class="bloglo-pagination" v-if="total > pageSize">
        <nav class="navigation pagination">
          <div class="nav-links">
            <!-- 上一页按钮：有上一页时显示 -->
            <a class="next page-numbers" @click="handlePrevPage" v-if="currentPage > 1">
              <button
                class="bloglo-animate-arrow left-arrow"
                aria-hidden="true"
                tabindex="0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 18">
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
            </a>

            <!-- 页码显示：仅展示3个页码，超过显示省略号 -->
            <template v-if="totalPages <= 3">
              <span
                v-for="page in totalPages"
                :key="page"
                :class="['page-numbers', 'page-number', { current: page === currentPage }]"
                @click="handlePageChange(page)"
              >
                {{ page }}
              </span>
            </template>
            <template v-else>
              <!-- 页码逻辑：当前页为1/最后一页时的展示规则 -->
              <span
                class="page-numbers page-number"
                :class="{ current: currentPage === 1 }"
                @click="handlePageChange(1)"
              >
                1
              </span>
              <span v-if="currentPage > 2">···</span>
              <span
                v-if="currentPage > 1 && currentPage < totalPages"
                class="page-numbers page-number current"
                @click="handlePageChange(currentPage)"
              >
                {{ currentPage }}
              </span>
              <span v-if="currentPage < totalPages - 1">···</span>
              <span
                class="page-numbers page-number"
                :class="{ current: currentPage === totalPages }"
                @click="handlePageChange(totalPages)"
              >
                {{ totalPages }}
              </span>
            </template>

            <!-- 下一页按钮：有下一页时显示 -->
            <a class="next page-numbers" @click="handleNextPage" v-if="currentPage < totalPages">
              <button
                type="button"
                class="bloglo-animate-arrow right-arrow"
                aria-hidden="true"
                tabindex="0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 18">
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
            </a>
          </div>
        </nav>
      </div>
    </main>
  </div>
</template>

<style scoped>
.navigation .nav-links .page-number {
  margin-left: 1rem;
  cursor: pointer; /* 增加页码点击光标样式 */
}
.post-category a {
  margin: 0 1rem 0.8rem 0 !important;
}
/* 引用文章背景图默认样式（无图片时） */
.quote-post-bg {
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 200px; /* 保持原有高度 */
}
</style>