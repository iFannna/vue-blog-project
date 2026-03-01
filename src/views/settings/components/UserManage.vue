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
    <!-- 统一命名为entry-header，保持结构一致性 -->
    <header class="entry-header">
      <h2 class="entry-title">用户管理</h2>
      
    </header>

    <!-- 统一命名为entry-content -->
    <div class="entry-content">
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
              {{ user.status === 'active' ? '正常' : '封禁' }}
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

/* 搜索栏样式适配整体风格 */
.search-bar { 
  margin-bottom: 2rem; 
}

.search-input-wrapper {
  position: relative;
  max-width: 40rem;
}

.search-input-wrapper i {
  position: absolute;
  left: 1.4rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 1rem 1.4rem 1rem 4rem;
  border: 0.2rem solid rgba(190, 190, 190, 0.3);
  border-radius: var(--bloglo-normal-radius, 0.3rem);
  font-size: 1.5rem;
  color: var(--bloglo-secondary, #232323);
  
  transition: 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: var(--bloglo-primary, #FC6668);

}

/* 用户表格样式统一：间距、背景、圆角、内边距 */
.user-table {
  border: 0.1rem solid rgba(190, 190, 190, 0.3);
  border-radius: var(--bloglo-normal-radius, 0.3rem);
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 8rem;
  gap: 1.6rem;
  padding: 1.2rem 2rem;
  background: rgba(190, 190, 190, 0.1);
  font-size: 1.5rem;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 8rem;
  gap: 1.6rem;
  padding: 1.8rem 2rem;
  align-items: center;
  border-top: 0.1rem solid rgba(190, 190, 190, 0.3);
  transition: 0.3s;
}

.table-row:hover {
  background: rgba(190, 190, 190, 0.05);
}

.col-user {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.user-avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.user-name {
  font-weight: 500;
  font-size: 1.7rem;
  color: var(--bloglo-secondary, #232323);
}

.user-email {
  font-size: 1.5rem;
  color: #94a3b8;
}

/* 标签样式适配rem单位，保留功能色 */
.role-tag {
  padding: 0.4rem 1rem;
  background: #e0f2fe;
  color: #0284c7;
  border-radius: var(--bloglo-normal-radius, 0.3rem);
  font-size: 1.2rem;
  font-weight: 500;
}

.status-tag {
  padding: 0.4rem 1rem;
  border-radius: var(--bloglo-normal-radius, 0.3rem);
  font-size: 1.2rem;
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
  font-size: 1.5rem;
  color: #94a3b8;
}

.col-action { 
  display: flex; 
  justify-content: center; 
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

.btn-action.ban {
  background: #fee2e2;
  color: #dc2626;
}

.btn-action.ban:hover { 
  background: #fecaca; 
}

.btn-action.unban {
  background: #dcfce7;
  color: #16a34a;
}

.btn-action.unban:hover { 
  background: #bbf7d0; 
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
  /* 移动端表格改为纵向布局，适配小屏幕 */
  .table-header {
    display: none;
  }
  .table-row {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: flex-start;
  }
  .col-user {
    width: 100%;
  }
  .col-role, .col-status, .col-time {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.5rem;
  }
  .col-role::before {
    content: "角色：";
    font-weight: 600;
    color: #94a3b8;
  }
  .col-status::before {
    content: "状态：";
    font-weight: 600;
    color: #94a3b8;
  }
  .col-time::before {
    content: "注册时间：";
    font-weight: 600;
    color: #94a3b8;
  }
  .col-action {
    width: 100%;
    justify-content: flex-end;
  }
  .search-input-wrapper {
    max-width: 100%;
  }
}
</style>