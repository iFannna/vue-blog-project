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
    <div class="panel-header">
      <h2 class="panel-title">我的互动</h2>
      <p class="panel-desc">查看你的评论、点赞和收藏记录</p>
    </div>

    <div class="panel-body">
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
          <button class="btn-icon"><i class="fa-solid fa-heart" style="color: #ef4444;"></i></button>
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
          <button class="btn-icon"><i class="fa-solid fa-bookmark" style="color: #f59e0b;"></i></button>
        </div>
        <div v-if="favorites.length === 0" class="empty">暂无收藏记录</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-panel { padding: 0; }

.panel-header {
  padding: 24px 32px;
  border-bottom: 1px solid var(--bloglo-border-color, #e2e8f0);
}

.panel-title {
  margin: 0 0 8px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--bloglo-headings-color, #1e293b);
}

.panel-desc {
  margin: 0;
  color: var(--bloglo-text-color, #64748b);
  font-size: 0.9375rem;
}

.panel-body { padding: 32px; }

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--bloglo-border-color, #e2e8f0);
  padding-bottom: 16px;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--bloglo-text-color, #64748b);
  font-size: 0.9375rem;
  cursor: pointer;
}

.tab-btn:hover { background: var(--bloglo-secondary-bg, #f1f5f9); }

.tab-btn.active {
  background: var(--bloglo-primary, #2563eb);
  color: #fff;
}

.tab-count {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.75rem;
  background: rgba(255, 255, 255, 0.2);
}

.tab-btn:not(.active) .tab-count { background: var(--bloglo-secondary-bg, #e2e8f0); }

.list { display: flex; flex-direction: column; gap: 12px; }

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  background: var(--bloglo-secondary-bg, #f8fafc);
  border-radius: 8px;
}

.item-content { flex: 1; min-width: 0; }

.comment-text {
  margin: 0 0 6px 0;
  font-style: italic;
  color: var(--bloglo-headings-color, #1e293b);
}

.item-title {
  margin: 0 0 6px 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--bloglo-headings-color, #1e293b);
}

.item-meta {
  display: flex;
  gap: 16px;
  font-size: 0.8125rem;
  color: var(--bloglo-text-color, #64748b);
}

.item-stat {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--bloglo-text-color, #64748b);
  font-size: 0.875rem;
}

.btn-icon {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
}

.btn-icon:hover { background: var(--bloglo-border-color, #e2e8f0); }

.empty {
  text-align: center;
  padding: 40px;
  color: var(--bloglo-text-color, #94a3b8);
}

[data-theme="dark"] .panel-header, [data-theme="dark"] .tabs { border-color: #334155; }
[data-theme="dark"] .panel-title { color: #f1f5f9; }
[data-theme="dark"] .list-item { background: #1e293b; }
[data-theme="dark"] .comment-text, [data-theme="dark"] .item-title { color: #f1f5f9; }
[data-theme="dark"] .btn-icon:hover { background: #475569; }
</style>