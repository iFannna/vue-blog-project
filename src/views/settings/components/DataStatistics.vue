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
    <!-- 统一命名为entry-header，保持结构一致性 -->
    <header class="entry-header">
      <h2 class="entry-title">数据统计</h2>
      
    </header>

    <!-- 统一命名为entry-content -->
    <div class="entry-content">
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
/* 基础样式和已有页面保持统一 */
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

/* 数据概览：尺寸单位改为rem，背景/圆角统一 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.6rem;
  margin-bottom: 3rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 2rem;
  background: rgba(190, 190, 190, 0.1);
  border-radius: var(--bloglo-normal-radius, 0.3rem);
  transition: 0.3s;
}

.stat-card:hover {
  background: rgba(190, 190, 190, 0.15);
}

.stat-icon {
  width: 4.8rem;
  height: 4.8rem;
  border-radius: var(--bloglo-normal-radius, 0.3rem);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

/* 保留功能色，仅调整尺寸 */
.stat-icon.views { background: #dbeafe; color: #2563eb; }
.stat-icon.today { background: #dcfce7; color: #16a34a; }
.stat-icon.articles { background: #fef3c7; color: #d97706; }
.stat-icon.comments { background: #e0e7ff; color: #4f46e5; }
.stat-icon.likes { background: #fee2e2; color: #dc2626; }
.stat-icon.users { background: #f3e8ff; color: #9333ea; }

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--bloglo-secondary, #232323);
}

.stat-label {
  font-size: 1.5rem;
  color: #94a3b8;
}

/* 区块样式统一：间距、标题样式 */
.section { 
  margin-bottom: 3rem; 
}
.section:last-child { 
  margin-bottom: 0; 
}

.section-title {
  margin: 0 0 2rem 0;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--bloglo-secondary, #232323);
}

/* 热门文章列表样式统一 */
.hot-list { 
  display: flex; 
  flex-direction: column; 
  gap: 1.5rem;
}

.hot-item {
  display: flex;
  align-items: center;
  gap: 1.4rem;
  padding: 1.8rem 2rem;
  background: rgba(190, 190, 190, 0.1);
  border-radius: var(--bloglo-normal-radius, 0.3rem);
  transition: 0.3s;
}

.hot-item:hover {
  background: rgba(190, 190, 190, 0.15);
}

.hot-rank {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: var(--bloglo-normal-radius, 0.3rem);
  background: rgba(190, 190, 190, 0.2);
  color: #94a3b8;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hot-rank.top {
  background: var(--bloglo-primary);
  color: #fff;
}

.hot-info { 
  flex: 1; 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
}

.hot-title {
  font-size: 1.7rem;
  font-weight: 500;
  color: var(--bloglo-secondary, #232323);
}

.hot-stats {
  display: flex;
  gap: 1.6rem;
  font-size: 1.5rem;
  color: #94a3b8;
}

.hot-stats i { 
  margin-right: 0.4rem; 
}

/* 最近用户列表样式统一 */
.recent-users { 
  display: flex; 
  flex-direction: column; 
  gap: 1.5rem;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.8rem 2rem;
  background: rgba(190, 190, 190, 0.1);
  border-radius: var(--bloglo-normal-radius, 0.3rem);
  transition: 0.3s;
}

.user-item:hover {
  background: rgba(190, 190, 190, 0.15);
}

.user-avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  flex: 1;
  font-size: 1.7rem;
  font-weight: 500;
  color: var(--bloglo-secondary, #232323);
}

.user-time {
  font-size: 1.5rem;
  color: #94a3b8;
}

/* 响应式设计和已有页面保持一致，断点逻辑优化 */
@media (max-width: 768px) {
  .entry-header, .entry-content { 
    padding: 2rem; 
  }
  .stats-grid { 
    grid-template-columns: repeat(2, 1fr); 
  }
  .hot-item, .user-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
  .hot-info {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .stats-grid { 
    grid-template-columns: 1fr; 
  }
}
</style>