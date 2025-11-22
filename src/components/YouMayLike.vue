<script setup>
import { ref, onMounted } from "vue";
import { getMostLikeArticlesApi } from "@/api/article";

// 存储最受欢迎文章列表
const mostLikeArticles = ref([]);
// 加载状态
const loading = ref(false);
// 空数据提示
const emptyTip = ref("暂无推荐文章");

// 日期格式化函数
const formatPublishTime = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  // 月份英文映射
  const monthMap = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthMap[date.getMonth()];
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

/**
 * 获取最受欢迎文章数据
 */
const getMostLikeArticles = async () => {
  try {
    loading.value = true;
    const res = await getMostLikeArticlesApi();
    // 接口返回成功且有数据
    if (res.code === 1 && res.data && res.data.length) {
      mostLikeArticles.value = res.data;
    } else {
      emptyTip.value = res.msg || "暂无推荐文章";
    }
  } catch (error) {
    console.error("获取推荐文章失败：", error);
    emptyTip.value = "获取文章失败，请稍后重试";
  } finally {
    loading.value = false;
  }
};

// 组件挂载后请求数据
onMounted(() => {
  getMostLikeArticles();
});
</script>

<template>
  <!-- 你可能会喜欢 -->
  <div id="pyml">
    <div class="bloglo-pyml-slider">
      <div class="bloglo-pyml-container bloglo-container">
        <div class="bloglo-flex-row">
          <div class="col-xs-12">
            <div class="pyml-slider-items">
              <div class="h4 widget-title">
                <span>你可能会喜欢</span>
              </div>
              <!--文章列表-->
              <div class="bloglo-flex-row gy-4">
                <!-- 加载状态 -->
                <div v-if="loading" class="col-12 text-center py-4">
                  <span>加载中...</span>
                </div>

                <!-- 空数据状态 -->
                <div v-else-if="mostLikeArticles.length === 0" class="col-12 text-center py-4">
                  <span>{{ emptyTip }}</span>
                </div>

                <!-- 文章列表循环渲染 -->
                <div 
                  v-else 
                  class="col-md-3 col-sm-6 col-xs-12" 
                  v-for="article in mostLikeArticles" 
                  :key="article.id"
                >
                  <div class="pyml-slide-item">
                    <div class="pyml-slider-backgrounds">
                      <a :href="article.url">
                        <div class="pyml-slide-bg">
                          <img
                            width="1024"
                            height="731"
                            :src="article.coverImage"
                            class="attachment-large size-large wp-post-image"
                            loading="lazy"
                            :alt="article.title"
                          />
                        </div>
                      </a>
                      <!-- 分类标签循环 -->
                      <div class="post-category" v-if="article.categories.length">
                        <span class="cat-links">
                          <span> </span>
                          <span>
                            <a 
                              v-for="category in article.categories" 
                              :key="category.id" 
                              :href="category.name"
                            >
                              {{ category.name }}
                            </a>
                          </span>
                        </span>
                      </div>
                    </div>

                    <div class="slide-inner">
                      <h6>
                        <a :href="article.url">{{ article.title }}</a>
                      </h6>

                      <div class="entry-meta">
                        <div class="entry-meta-elements">
                          <span class="post-author">
                            <span class="posted-by vcard author">
                              <span> </span>
                              <!-- 作者头像 -->
                              <span class="author-avatar" v-if="article.authorAvatar">
                                <img
                                  :alt="article.authorName"
                                  :src="article.authorAvatar"
                                  class="avatar avatar-30 photo"
                                  height="30"
                                  width="30"
                                  loading="lazy"
                                />
                              </span>
                              <!-- 作者信息 -->
                              <span>
                                By
                                <a
                                  class="url fn n"
                                  :title="article.authorName"
                                  :href="`/author/${article.authorId}`"
                                  rel="author"
                                >
                                  <span class="author-name"> {{ article.authorName }} </span>
                                </a>
                              </span>
                            </span>
                          </span>
                          <!-- 发布时间 -->
                          <span class="posted-on">{{ formatPublishTime(article.publishAt) }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>