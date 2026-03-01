<script setup>
import { ref } from "vue";

const stats = ref({
  totalViews: 12580,
  todayViews: 256,
  totalArticles: 28,
  totalComments: 156,
  totalLikes: 892,
  totalUsers: 45,
});

const hotArticles = ref([
  { id: 1, title: "Vue3 组合式 API 详解", views: 2340, likes: 89 },
  { id: 2, title: "SpringBoot 入门教程", views: 1890, likes: 67 },
  { id: 3, title: "Redis 缓存策略", views: 1560, likes: 54 },
  { id: 4, title: "Nginx 配置指南", views: 1230, likes: 42 },
  { id: 5, title: "Docker 容器化部署", views: 980, likes: 38 },
]);

const recentUsers = ref([
  { id: 1, name: "张三", time: "1 小时前" },
  { id: 2, name: "李四", time: "3 小时前" },
  { id: 3, name: "王五", time: "1 天前" },
]);
</script>

<template>
  <div class="settings-panel">
    <div class="panel-header">
      <h2 class="panel-title">数据统计</h2>
      <p class="panel-desc">查看网站访问量、热门文章等统计数据</p>
    </div>

    <div class="panel-body">
      <!-- 数据概览 -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon views"><i class="fa-solid fa-eye"></i></div>
          <div class="stat-info">
            <span class="stat-value">{{ stats.totalViews.toLocaleString() }}</span>
            <span class="stat-label">总访问量</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon today"><i class="fa-solid fa-chart-line"></i></div>
          <div class="stat-info">
            <span class="stat-value">{{ stats.todayViews }}</span>
            <span class="stat-label">今日访问</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon articles"><i class="fa-solid fa-file-lines"></i></div>
          <div class="stat-info">
            <span class="stat-value">{{ stats.totalArticles }}</span>
            <span class="stat-label">文章数</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon comments"><i class="fa-solid fa-comments"></i></div>
          <div class="stat-info">
            <span class="stat-value">{{ stats.totalComments }}</span>
            <span class="stat-label">评论数</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon likes"><i class="fa-solid fa-heart"></i></div>
          <div class="stat-info">
            <span class="stat-value">{{ stats.totalLikes }}</span>
            <span class="stat-label">点赞数</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon users"><i class="fa-solid fa-users"></i></div>
          <div class="stat-info">
            <span class="stat-value">{{ stats.totalUsers }}</span>
            <span class="stat-label">用户数</span>
          </div>
        </div>
      </div>

      <!-- 热门文章 -->
      <div class="section">
        <h3 class="section-title">热门文章</h3>
        <div class="hot-list">
          <div v-for="(article, index) in hotArticles" :key="article.id" class="hot-item">
            <span class="hot-rank" :class="{ top: index < 3 }">{{ index + 1 }}</span>
            <div class="hot-info">
              <span class="hot-title">{{ article.title }}</span>
              <div class="hot-stats">
                <span><i class="fa-solid fa-eye"></i> {{ article.views }}</span>
                <span><i class="fa-solid fa-heart"></i> {{ article.likes }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 最近注册 -->
      <div class="section">
        <h3 class="section-title">最近注册用户</h3>
        <div class="recent-users">
          <div v-for="user in recentUsers" :key="user.id" class="user-item">
            <img src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" class="user-avatar" />
            <span class="user-name">{{ user.name }}</span>
            <span class="user-time">{{ user.time }}</span>
          </div>
        </div>
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

/* 数据概览 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: var(--bloglo-secondary-bg, #f8fafc);
  border-radius: 10px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.stat-icon.views { background: #dbeafe; color: #2563eb; }
.stat-icon.today { background: #dcfce7; color: #16a34a; }
.stat-icon.articles { background: #fef3c7; color: #d97706; }
.stat-icon.comments { background: #e0e7ff; color: #4f46e5; }
.stat-icon.likes { background: #fee2e2; color: #dc2626; }
.stat-icon.users { background: #f3e8ff; color: #9333ea; }

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--bloglo-headings-color, #1e293b);
}

.stat-label {
  font-size: 0.8125rem;
  color: var(--bloglo-text-color, #64748b);
}

/* 热门文章 */
.section { margin-bottom: 32px; }
.section:last-child { margin-bottom: 0; }

.section-title {
  margin: 0 0 16px 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--bloglo-headings-color, #1e293b);
}

.hot-list { display: flex; flex-direction: column; gap: 10px; }

.hot-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  background: var(--bloglo-secondary-bg, #f8fafc);
  border-radius: 8px;
}

.hot-rank {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: #e2e8f0;
  color: #64748b;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hot-rank.top {
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  color: #fff;
}

.hot-info { flex: 1; display: flex; justify-content: space-between; align-items: center; }

.hot-title {
  font-weight: 500;
  color: var(--bloglo-headings-color, #1e293b);
}

.hot-stats {
  display: flex;
  gap: 16px;
  font-size: 0.8125rem;
  color: var(--bloglo-text-color, #64748b);
}

.hot-stats i { margin-right: 4px; }

/* 最近用户 */
.recent-users { display: flex; flex-direction: column; gap: 10px; }

.user-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--bloglo-secondary-bg, #f8fafc);
  border-radius: 8px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  flex: 1;
  font-weight: 500;
  color: var(--bloglo-headings-color, #1e293b);
}

.user-time {
  font-size: 0.8125rem;
  color: var(--bloglo-text-color, #94a3b8);
}

@media (max-width: 768px) {
  .panel-header, .panel-body { padding: 20px; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .stats-grid { grid-template-columns: 1fr; }
}

[data-theme="dark"] .panel-header { border-color: #334155; }
[data-theme="dark"] .panel-title, [data-theme="dark"] .section-title { color: #f1f5f9; }
[data-theme="dark"] .stat-card, [data-theme="dark"] .hot-item, [data-theme="dark"] .user-item { background: #1e293b; }
[data-theme="dark"] .stat-value { color: #f1f5f9; }
[data-theme="dark"] .hot-title, [data-theme="dark"] .user-name { color: #f1f5f9; }
[data-theme="dark"] .hot-rank { background: #334155; }
</style>