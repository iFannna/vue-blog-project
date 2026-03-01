<script setup>
import { ref } from "vue";

const activeTab = ref("published");

const articles = ref([
  { id: 1, title: "Vue3 组合式 API 详解", status: "published", views: 1234, likes: 56, time: "2025-02-15" },
  { id: 2, title: "SpringBoot 入门教程", status: "published", views: 890, likes: 34, time: "2025-02-10" },
  { id: 3, title: "Redis 缓存策略（草稿）", status: "draft", views: 0, likes: 0, time: "2025-02-20" },
]);

const tabs = [
  { key: "published", label: "已发布" },
  { key: "draft", label: "草稿" },
  { key: "trash", label: "回收站" },
];

const filteredArticles = ref(articles.value.filter(a => a.status === "published"));

const switchTab = (key) => {
  activeTab.value = key;
  if (key === "published") {
    filteredArticles.value = articles.value.filter(a => a.status === "published");
  } else if (key === "draft") {
    filteredArticles.value = articles.value.filter(a => a.status === "draft");
  } else {
    filteredArticles.value = [];
  }
};
</script>

<template>
  <div class="settings-panel">
    <div class="panel-header">
      <div class="header-top">
        <div>
          <h2 class="panel-title">内容管理</h2>
          <p class="panel-desc">管理你的文章、分类和标签</p>
        </div>
        <button class="btn btn-primary">
          <i class="fa-solid fa-plus"></i> 新建文章
        </button>
      </div>
    </div>

    <div class="panel-body">
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          :class="['tab-btn', { active: activeTab === tab.key }]"
          @click="switchTab(tab.key)"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="article-list">
        <div v-for="article in filteredArticles" :key="article.id" class="article-item">
          <div class="article-info">
            <h4 class="article-title">{{ article.title }}</h4>
            <div class="article-meta">
              <span><i class="fa-solid fa-eye"></i> {{ article.views }}</span>
              <span><i class="fa-solid fa-heart"></i> {{ article.likes }}</span>
              <span><i class="fa-solid fa-calendar"></i> {{ article.time }}</span>
            </div>
          </div>
          <div class="article-actions">
            <button class="btn-icon" title="编辑"><i class="fa-solid fa-pen"></i></button>
            <button class="btn-icon" title="删除"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
        <div v-if="filteredArticles.length === 0" class="empty">暂无内容</div>
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

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
}

.btn-primary { background: var(--bloglo-primary, #2563eb); color: #fff; }
.btn-primary:hover { background: #1d4ed8; }

.panel-body { padding: 32px; }

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.tab-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--bloglo-text-color, #64748b);
  font-size: 0.9375rem;
  cursor: pointer;
}

.tab-btn:hover { background: var(--bloglo-secondary-bg, #f1f5f9); }
.tab-btn.active { background: var(--bloglo-primary, #2563eb); color: #fff; }

.article-list { display: flex; flex-direction: column; gap: 12px; }

.article-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: var(--bloglo-secondary-bg, #f8fafc);
  border-radius: 8px;
}

.article-info { flex: 1; min-width: 0; }

.article-title {
  margin: 0 0 8px 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--bloglo-headings-color, #1e293b);
}

.article-meta {
  display: flex;
  gap: 16px;
  font-size: 0.8125rem;
  color: var(--bloglo-text-color, #64748b);
}

.article-meta i { margin-right: 4px; }

.article-actions { display: flex; gap: 8px; }

.btn-icon {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--bloglo-text-color, #64748b);
  cursor: pointer;
}

.btn-icon:hover {
  background: var(--bloglo-border-color, #e2e8f0);
  color: var(--bloglo-primary, #2563eb);
}

.empty {
  text-align: center;
  padding: 40px;
  color: var(--bloglo-text-color, #94a3b8);
}

</style>