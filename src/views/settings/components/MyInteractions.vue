<script setup>
import { ref } from "vue";

const activeTab = ref("comments");

const comments = ref([
  { id: 1, content: "这篇文章写得太好了！", article: "Vue3 组合式 API 详解", time: "2 小时前", likes: 5 },
  { id: 2, content: "学到了很多，感谢分享", article: "SpringBoot 入门教程", time: "1 天前", likes: 3 },
]);

const likes = ref([
  { id: 1, title: "Vue3 组合式 API 详解", author: "赵瑾瑜", time: "1 小时前" },
  { id: 2, title: "TypeScript 类型体操", author: "赵瑾瑜", time: "5 小时前" },
]);

const favorites = ref([
  { id: 1, title: "前端面试题大全", author: "赵瑾瑜", time: "2 天前" },
  { id: 2, title: "Java 并发编程", author: "赵瑾瑜", time: "1 周前" },
]);

const tabs = [
  { key: "comments", label: "我的评论", count: comments.value.length },
  { key: "likes", label: "我的点赞", count: likes.value.length },
  { key: "favorites", label: "我的收藏", count: favorites.value.length },
];
</script>

<template>
  <div class="settings-panel">
    <!-- 统一命名为entry-header，和通知设置保持一致 -->
    <header class="entry-header">
      <h2 class="entry-title">我的互动</h2>
      
    </header>

    <!-- 统一命名为entry-content -->
    <div class="entry-content">
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          :class="['tab-btn', { active: activeTab === tab.key }]"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
          <span class="tab-count">{{ tab.count }}</span>
        </button>
      </div>

      <!-- 评论列表 -->
      <div v-if="activeTab === 'comments'" class="list">
        <div v-for="item in comments" :key="item.id" class="list-item">
          <div class="item-content">
            <p class="comment-text">"{{ item.content }}"</p>
            <div class="item-meta">
              <span>{{ item.article }}</span>
              <span>{{ item.time }}</span>
            </div>
          </div>
          <span class="item-stat"><i class="fa-solid fa-thumbs-up"></i> {{ item.likes }}</span>
        </div>
        <div v-if="comments.length === 0" class="empty">暂无评论记录</div>
      </div>

      <!-- 点赞列表 -->
      <div v-if="activeTab === 'likes'" class="list">
        <div v-for="item in likes" :key="item.id" class="list-item">
          <div class="item-content">
            <h4 class="item-title">{{ item.title }}</h4>
            <div class="item-meta">
              <span>{{ item.author }}</span>
              <span>{{ item.time }}</span>
            </div>
          </div>
          <button class="btn-icon"><i class="fa-solid fa-heart" style="color: var(--bloglo-primary, #FC6668);"></i></button>
        </div>
        <div v-if="likes.length === 0" class="empty">暂无点赞记录</div>
      </div>

      <!-- 收藏列表 -->
      <div v-if="activeTab === 'favorites'" class="list">
        <div v-for="item in favorites" :key="item.id" class="list-item">
          <div class="item-content">
            <h4 class="item-title">{{ item.title }}</h4>
            <div class="item-meta">
              <span>{{ item.author }}</span>
              <span>{{ item.time }}</span>
            </div>
          </div>
          <button class="btn-icon"><i class="fa-solid fa-bookmark" style="color: var(--bloglo-primary, #FC6668);"></i></button>
        </div>
        <div v-if="favorites.length === 0" class="empty">暂无收藏记录</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 基础样式和通知设置保持统一 */
.settings-panel { padding: 0; }

/* 头部样式统一：padding、边框、字体大小/颜色 */
.entry-header {
  padding: 2.5rem 3rem;
  border-bottom: 0.1rem solid rgba(190, 190, 190, 0.3);
}

.entry-title {
  margin: 0 0 0.8rem 0;
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--bloglo-secondary, #232323);
}

.entry-desc {
  margin: 0;
  font-size: 1.5rem;
  color: #94a3b8;
}

/* 内容区域样式统一 */
.entry-content { 
  padding: 3rem; 
}

/* 标签栏样式调整，适配整体风格 */
.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  padding-bottom: 1.6rem;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: var(--bloglo-normal-radius, 0.3rem);
  background: transparent;
  color: #94a3b8;
  font-size: 1.5rem;
  cursor: pointer;
  transition: 0.3s;
}

.tab-btn:hover { 
  background: rgba(190, 190, 190, 0.1); 
}

/* 激活态样式和通知设置的主色统一 */
.tab-btn.active {
  background: var(--bloglo-primary, #FC6668);
  color: #fff;
}

.tab-count {
  padding: 0.2rem 0.6rem;
  border-radius: 1.5rem;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.2);
}

.tab-btn:not(.active) .tab-count { 
  background: rgba(190, 190, 190, 0.1); 
  color: #94a3b8;
}

/* 列表样式统一：间距、背景、圆角、内边距 */
.list { 
  display: flex; 
  flex-direction: column; 
  gap: 1.5rem;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.8rem 2rem;
  background: rgba(190, 190, 190, 0.1);
  border-radius: var(--bloglo-normal-radius, 0.3rem);
}

.item-content { 
  flex: 1; 
  min-width: 0; 
}

.comment-text {
  margin: 0 0 0.5rem 0;
  font-style: italic;
  font-size: 1.7rem;
  color: var(--bloglo-secondary, #232323);
}

.item-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.7rem;
  font-weight: 500;
  color: var(--bloglo-secondary, #232323);
}

.item-meta {
  display: flex;
  gap: 1.6rem;
  font-size: 1.5rem;
  color: #94a3b8;
}

.item-stat {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #94a3b8;
  font-size: 1.5rem;
}

/* 图标按钮样式适配整体风格 */
.btn-icon {
  width: 4rem;
  height: 4rem;
  border: none;
  border-radius: var(--bloglo-normal-radius, 0.3rem);
  background: transparent;
  cursor: pointer;
  transition: 0.3s;
}

.btn-icon:hover { 
  background: rgba(190, 190, 190, 0.2); 
}

/* 空状态样式统一 */
.empty {
  text-align: center;
  padding: 4rem;
  color: #94a3b8;
  font-size: 1.5rem;
}

/* 响应式设计和通知设置保持一致 */
@media (max-width: 768px) {
  .entry-header, .entry-content { 
    padding: 2rem; 
  }
  .list-item { 
    flex-direction: column; 
    align-items: flex-start; 
    gap: 1.5rem; 
  }
  .tabs {
    flex-wrap: wrap;
  }
  .tab-btn {
    flex: 1;
    justify-content: center;
  }
}
</style>