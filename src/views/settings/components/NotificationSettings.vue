<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";

const notifications = ref({
  commentReply: true,
  newLike: true,
  newFollower: false,
  newComment: true,
  systemMessage: true,
  weeklyDigest: false,
});

const handleSave = () => {
  ElMessage.success("通知设置已保存");
};
</script>

<template>
  <div class="settings-panel">
    <div class="panel-header">
      <h2 class="panel-title">通知设置</h2>
      <p class="panel-desc">管理你接收通知的方式和类型</p>
    </div>

    <div class="panel-body">
      <div class="section">
        <h3 class="section-title">互动通知</h3>
        <div class="toggle-list">
          <div class="toggle-item">
            <div class="toggle-info">
              <span class="toggle-name">评论回复</span>
              <span class="toggle-desc">当有人回复你的评论时通知</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notifications.commentReply" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="toggle-item">
            <div class="toggle-info">
              <span class="toggle-name">点赞通知</span>
              <span class="toggle-desc">当有人点赞你的内容时通知</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notifications.newLike" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="toggle-item">
            <div class="toggle-info">
              <span class="toggle-name">新评论</span>
              <span class="toggle-desc">当你的文章收到新评论时通知</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notifications.newComment" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="toggle-item">
            <div class="toggle-info">
              <span class="toggle-name">新关注</span>
              <span class="toggle-desc">当有新用户关注你时通知</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notifications.newFollower" />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">系统通知</h3>
        <div class="toggle-list">
          <div class="toggle-item">
            <div class="toggle-info">
              <span class="toggle-name">系统消息</span>
              <span class="toggle-desc">重要的系统更新和公告</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notifications.systemMessage" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="toggle-item">
            <div class="toggle-info">
              <span class="toggle-name">每周精选</span>
              <span class="toggle-desc">每周热门内容摘要</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="notifications.weeklyDigest" />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-footer">
      <button class="btn btn-primary" @click="handleSave">保存设置</button>
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

.section { margin-bottom: 32px; }
.section:last-child { margin-bottom: 0; }

.section-title {
  margin: 0 0 16px 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--bloglo-headings-color, #1e293b);
}

.toggle-list { display: flex; flex-direction: column; gap: 12px; }

.toggle-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  background: var(--bloglo-secondary-bg, #f8fafc);
  border-radius: 8px;
}

.toggle-info { display: flex; flex-direction: column; gap: 2px; }

.toggle-name {
  font-weight: 500;
  color: var(--bloglo-headings-color, #1e293b);
}

.toggle-desc {
  font-size: 0.8125rem;
  color: var(--bloglo-text-color, #64748b);
}

.toggle-switch {
  position: relative;
  width: 44px;
  height: 24px;
}

.toggle-switch input { opacity: 0; width: 0; height: 0; }

.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background: #cbd5e1;
  border-radius: 24px;
  transition: 0.3s;
}

.slider::before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background: white;
  border-radius: 50%;
  transition: 0.3s;
}

.toggle-switch input:checked + .slider { background: var(--bloglo-primary, #2563eb); }
.toggle-switch input:checked + .slider::before { transform: translateX(20px); }

.panel-footer {
  padding: 20px 32px;
  border-top: 1px solid var(--bloglo-border-color, #e2e8f0);
  display: flex;
  justify-content: flex-end;
}

.btn {
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
}

.btn-primary { background: var(--bloglo-primary, #2563eb); color: #fff; }
.btn-primary:hover { background: #1d4ed8; }

[data-theme="dark"] .panel-header, [data-theme="dark"] .panel-footer { border-color: #334155; }
[data-theme="dark"] .panel-title, [data-theme="dark"] .section-title { color: #f1f5f9; }
[data-theme="dark"] .toggle-item { background: #1e293b; }
[data-theme="dark"] .toggle-name { color: #e2e8f0; }
[data-theme="dark"] .slider { background: #475569; }
</style>