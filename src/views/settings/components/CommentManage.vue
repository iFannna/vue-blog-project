<script setup>
import { ref, computed } from "vue";

const comments = ref([
  { id: 1, author: "张三", content: "这篇文章写得很好！", article: "Vue3 详解", time: "2小时前", status: "pending" },
  { id: 2, author: "李四", content: "学到了很多", article: "SpringBoot 入门", time: "1天前", status: "pending" },
  { id: 3, author: "王五", content: "期待更多内容", article: "Redis 缓存", time: "3天前", status: "approved" },
  { id: 4, author: "赵六", content: "这是垃圾评论", article: "Vue3 详解", time: "5天前", status: "reported" },
]);

const tabs = [
  { key: "pending", label: "待审核" },
  { key: "approved", label: "已通过" },
  { key: "reported", label: "被举报" },
];

const activeTab = ref("pending");

const filteredComments = computed(() => {
  return comments.value.filter(c => c.status === activeTab.value);
});
</script>

<template>
  <div class="settings-panel">
    <div class="panel-header">
      <h2 class="panel-title">评论审核</h2>
      <p class="panel-desc">审核和管理用户评论</p>
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
        </button>
      </div>

      <div class="comment-list">
        <div v-for="comment in filteredComments" :key="comment.id" class="comment-item">
          <div class="comment-avatar">
            <img src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" alt="" />
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
            <button class="btn-action approve" title="通过">
              <i class="fa-solid fa-check"></i>
            </button>
            <button class="btn-action reject" title="拒绝">
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

.comment-list { display: flex; flex-direction: column; gap: 12px; }

.comment-item {
  display: flex;
  gap: 14px;
  padding: 16px 20px;
  background: var(--bloglo-secondary-bg, #f8fafc);
  border-radius: 8px;
}

.comment-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.comment-content { flex: 1; min-width: 0; }

.comment-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
}

.comment-author {
  font-weight: 500;
  color: var(--bloglo-headings-color, #1e293b);
}

.comment-time {
  font-size: 0.8125rem;
  color: var(--bloglo-text-color, #94a3b8);
}

.comment-text {
  margin: 0 0 8px 0;
  color: var(--bloglo-text-color, #475569);
  font-size: 0.9375rem;
}

.comment-article {
  font-size: 0.8125rem;
  color: var(--bloglo-text-color, #64748b);
}

.comment-article i { margin-right: 4px; }

.comment-actions { display: flex; gap: 8px; align-items: flex-start; }

.btn-action {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-action.approve {
  background: #dcfce7;
  color: #16a34a;
}

.btn-action.approve:hover {
  background: #bbf7d0;
}

.btn-action.reject {
  background: #fee2e2;
  color: #dc2626;
}

.btn-action.reject:hover {
  background: #fecaca;
}

.empty {
  text-align: center;
  padding: 40px;
  color: var(--bloglo-text-color, #94a3b8);
}

</style>