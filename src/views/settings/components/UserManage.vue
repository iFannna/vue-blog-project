<script setup>
import { ref } from "vue";

const users = ref([
  { id: 1, name: "张三", email: "zhangsan@example.com", role: "用户", status: "active", registerTime: "2025-01-15" },
  { id: 2, name: "李四", email: "lisi@example.com", role: "用户", status: "active", registerTime: "2025-01-20" },
  { id: 3, name: "王五", email: "wangwu@example.com", role: "用户", status: "banned", registerTime: "2025-02-01" },
]);

const searchKeyword = ref("");
</script>

<template>
  <div class="settings-panel">
    <div class="panel-header">
      <h2 class="panel-title">用户管理</h2>
      <p class="panel-desc">管理网站用户，查看用户信息</p>
    </div>

    <div class="panel-body">
      <!-- 搜索栏 -->
      <div class="search-bar">
        <div class="search-input-wrapper">
          <i class="fa-solid fa-search"></i>
          <input 
            type="text" 
            v-model="searchKeyword" 
            class="search-input" 
            placeholder="搜索用户名或邮箱..."
          />
        </div>
      </div>

      <!-- 用户列表 -->
      <div class="user-table">
        <div class="table-header">
          <span class="col-user">用户</span>
          <span class="col-role">角色</span>
          <span class="col-status">状态</span>
          <span class="col-time">注册时间</span>
          <span class="col-action">操作</span>
        </div>
        <div v-for="user in users" :key="user.id" class="table-row">
          <div class="col-user">
            <img src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" class="user-avatar" />
            <div class="user-info">
              <span class="user-name">{{ user.name }}</span>
              <span class="user-email">{{ user.email }}</span>
            </div>
          </div>
          <span class="col-role">
            <span class="role-tag">{{ user.role }}</span>
          </span>
          <span class="col-status">
            <span :class="['status-tag', user.status]">
              {{ user.status === 'active' ? '正常' : '已封禁' }}
            </span>
          </span>
          <span class="col-time">{{ user.registerTime }}</span>
          <div class="col-action">
            <button v-if="user.status === 'active'" class="btn-action ban" title="封禁">
              <i class="fa-solid fa-ban"></i>
            </button>
            <button v-else class="btn-action unban" title="解封">
              <i class="fa-solid fa-unlock"></i>
            </button>
          </div>
        </div>
        <div v-if="users.length === 0" class="empty">暂无用户</div>
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

/* 搜索栏 */
.search-bar { margin-bottom: 24px; }

.search-input-wrapper {
  position: relative;
  max-width: 400px;
}

.search-input-wrapper i {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--bloglo-text-color, #94a3b8);
}

.search-input {
  width: 100%;
  padding: 10px 14px 10px 40px;
  border: 1px solid var(--bloglo-border-color, #e2e8f0);
  border-radius: 8px;
  font-size: 0.9375rem;
  color: var(--bloglo-headings-color, #1e293b);
  background: var(--bloglo-input-bg, #fff);
}

.search-input:focus {
  outline: none;
  border-color: var(--bloglo-primary, #2563eb);
}

/* 用户表格 */
.user-table {
  border: 1px solid var(--bloglo-border-color, #e2e8f0);
  border-radius: 8px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 80px;
  gap: 16px;
  padding: 12px 20px;
  background: var(--bloglo-secondary-bg, #f8fafc);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--bloglo-text-color, #64748b);
  text-transform: uppercase;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 80px;
  gap: 16px;
  padding: 14px 20px;
  align-items: center;
  border-top: 1px solid var(--bloglo-border-color, #e2e8f0);
}

.col-user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-name {
  font-weight: 500;
  color: var(--bloglo-headings-color, #1e293b);
}

.user-email {
  font-size: 0.8125rem;
  color: var(--bloglo-text-color, #64748b);
}

.role-tag {
  padding: 4px 10px;
  background: #e0f2fe;
  color: #0284c7;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-tag {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-tag.active {
  background: #dcfce7;
  color: #16a34a;
}

.status-tag.banned {
  background: #fee2e2;
  color: #dc2626;
}

.col-time {
  font-size: 0.875rem;
  color: var(--bloglo-text-color, #64748b);
}

.col-action { display: flex; justify-content: center; }

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

.btn-action.ban {
  background: #fee2e2;
  color: #dc2626;
}

.btn-action.ban:hover { background: #fecaca; }

.btn-action.unban {
  background: #dcfce7;
  color: #16a34a;
}

.btn-action.unban:hover { background: #bbf7d0; }

.empty {
  text-align: center;
  padding: 40px;
  color: var(--bloglo-text-color, #94a3b8);
}

[data-theme="dark"] .panel-header { border-color: #334155; }
[data-theme="dark"] .panel-title { color: #f1f5f9; }
[data-theme="dark"] .search-input { background: #1e293b; border-color: #334155; color: #f1f5f9; }
[data-theme="dark"] .user-table { border-color: #334155; }
[data-theme="dark"] .table-header { background: #1e293b; }
[data-theme="dark"] .table-row { border-color: #334155; }
[data-theme="dark"] .user-name { color: #f1f5f9; }
</style>