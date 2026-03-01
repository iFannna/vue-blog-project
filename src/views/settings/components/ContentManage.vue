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
    <!-- 统一命名为entry-header，保持结构一致性 -->
    <header class="entry-header">
      <div class="header-top">
        <div>
          <h2 class="entry-title">内容管理</h2>
          
        </div>
        <!-- 按钮样式和通知设置的bloglo-btn统一 -->
        <button class="bloglo-btn btn-small">
          新建文章
        </button>
      </div>
    </header>

    <!-- 统一命名为entry-content -->
    <div class="entry-content">
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
/* 基础样式和已有页面保持统一 */
.settings-panel { padding: 0; }

/* 头部样式统一：padding、边框、字体、布局 */
.entry-header {
  padding: 2.5rem 3rem;
  border-bottom: 0.1rem solid rgba(190, 190, 190, 0.3);
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}

.entry-title {
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--bloglo-secondary, #232323);
}



/* 按钮样式和通知设置的bloglo-btn完全统一 */
.btn-small {
  padding: 0.8rem 2rem;
  min-height: 4rem;
}

.bloglo-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border: none;
  border-radius: var(--bloglo-normal-radius, 0.3rem);
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  background: var(--bloglo-primary, #FC6668);
  color: #fff;
  transition: 0.3s;
}

.bloglo-btn:hover {
  background: #e55557;
}

/* 内容区域样式统一 */
.entry-content { 
  padding: 3rem; 
}

/* 标签栏样式适配整体风格 */
.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  padding-bottom: 1.6rem;
}

.tab-btn {
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

/* 激活态样式和主色统一 */
.tab-btn.active {
  background: var(--bloglo-primary, #FC6668);
  color: #fff;
}

/* 文章列表样式统一：间距、背景、圆角、内边距 */
.article-list { 
  display: flex; 
  flex-direction: column; 
  gap: 1.5rem;
}

.article-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.8rem 2rem;
  background: rgba(190, 190, 190, 0.1);
  border-radius: var(--bloglo-normal-radius, 0.3rem);
}

.article-info { 
  flex: 1; 
  min-width: 0; 
}

.article-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.7rem;
  font-weight: 500;
  color: var(--bloglo-secondary, #232323);
}

.article-meta {
  display: flex;
  gap: 1.6rem;
  font-size: 1.5rem;
  color: #94a3b8;
}

.article-meta i { 
  margin-right: 0.4rem; 
}

.article-actions { 
  display: flex; 
  gap: 0.8rem; 
}

/* 图标按钮样式适配整体风格 */
.btn-icon {
  width: 4rem;
  height: 4rem;
  border: none;
  border-radius: var(--bloglo-normal-radius, 0.3rem);
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  transition: 0.3s;
}

.btn-icon:hover {
  background: rgba(190, 190, 190, 0.2);
  color: var(--bloglo-primary, #FC6668);
}

/* 空状态样式统一 */
.empty {
  text-align: center;
  padding: 4rem;
  color: #94a3b8;
  font-size: 1.5rem;
}

/* 响应式设计和已有页面保持一致 */
@media (max-width: 768px) {
  .entry-header, .entry-content { 
    padding: 2rem; 
  }
  .article-item { 
    flex-direction: column; 
    align-items: flex-start; 
    gap: 1.5rem; 
  }
  .header-top {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
  }
  .bloglo-btn {
    width: 100%;
    justify-content: center;
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