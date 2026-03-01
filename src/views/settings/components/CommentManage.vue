<script setup>
import { ref, computed } from "vue";

const comments = ref([
  { id: 1, author: "张三", content: "这篇文章写得很好！", article: "Vue3 详解", time: "2小时前", status: "approved" },
  { id: 2, author: "李四", content: "学到了很多", article: "SpringBoot 入门", time: "1天前", status: "approved" },
  { id: 3, author: "王五", content: "期待更多内容", article: "Redis 缓存", time: "3天前", status: "approved" },
  { id: 4, author: "赵六", content: "这是垃圾评论", article: "Vue3 详解", time: "5天前", status: "reported" },
]);

const tabs = [
  { key: "approved", label: "已发布" },
  { key: "reported", label: "被举报" },
];

const activeTab = ref("approved");

const filteredComments = computed(() => {
  return comments.value.filter(c => c.status === activeTab.value);
});
</script>

<template>
  <div class="settings-panel">
    <!-- 统一命名为entry-header，保持结构一致性 -->
    <header class="entry-header">
      <h2 class="entry-title">评论管理</h2>
      
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
        </button>
      </div>

      <div class="comment-list">
        <div v-for="comment in filteredComments" :key="comment.id" class="comment-item">
          <div class="comment-avatar">
            <img src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" alt="用户头像" />
          </div>
          <div class="comment-content">
            <div class="comment-header">
              <span class="comment-author">{{ comment.author }}</span>
              <span class="comment-time">{{ comment.time }}</span>
            </div>
            <p class="comment-text">{{ comment.content }}</p>
            <div class="comment-article">
              <i class="fa-solid fa-file-lines"></i>
              {{ comment.article }}
            </div>
          </div>
          <div class="comment-actions">
            
            <button class="btn-action delete" title="删除">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
        <div v-if="filteredComments.length === 0" class="empty">暂无评论</div>
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

/* 评论列表样式统一：间距、背景、圆角、内边距 */
.comment-list { 
  display: flex; 
  flex-direction: column; 
  gap: 1.5rem;
}

.comment-item {
  display: flex;
  gap: 1.4rem;
  padding: 1.8rem 2rem;
  background: rgba(190, 190, 190, 0.1);
  border-radius: var(--bloglo-normal-radius, 0.3rem);
  align-items: flex-start;
}

.comment-avatar img {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
}

.comment-content { 
  flex: 1; 
  min-width: 0; 
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 0.6rem;
}

.comment-author {
  font-weight: 500;
  font-size: 1.7rem;
  color: var(--bloglo-secondary, #232323);
}

.comment-time {
  font-size: 1.5rem;
  color: #94a3b8;
}

.comment-text {
  margin: 0 0 0.8rem 0;
  color: var(--bloglo-secondary, #232323);
  font-size: 1.7rem;
}

.comment-article {
  font-size: 1.5rem;
  color: #94a3b8;
}

.comment-article i { 
  margin-right: 0.4rem; 
}

.comment-actions { 
  display: flex; 
  gap: 0.8rem; 
  align-items: flex-start; 
}

/* 操作按钮样式适配整体尺寸体系，保留原有功能色 */
.btn-action {
  width: 4rem;
  height: 4rem;
  border: none;
  border-radius: var(--bloglo-normal-radius, 0.3rem);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}



.btn-action.delete {
  background: #fee2e2;
  color: #dc2626;
}

.btn-action.delete:hover {
  background: #fecaca;
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
  .comment-item { 
    flex-direction: column; 
    gap: 1.5rem; 
  }
  .comment-actions {
    align-self: flex-end;
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