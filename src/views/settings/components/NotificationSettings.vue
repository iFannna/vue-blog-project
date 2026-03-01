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

// 新增切换开关的方法
const toggleSwitch = (key) => {
  notifications.value[key] = !notifications.value[key];
};

const handleSave = () => {
  ElMessage.success("通知设置已保存");
};
</script>

<template>
  <div class="settings-panel">
    <!-- 头部/内容区域结构不变，仅修改开关部分 -->
    <header class="entry-header">
      <h2 class="entry-title">通知设置</h2>
    </header>

    <div class="entry-content">
      <div class="section">
        <h3 class="section-title">互动通知</h3>
        <div class="toggle-list">
          <div class="toggle-item">
            <div class="toggle-info">
              <span class="toggle-name">评论回复</span>
              <span class="toggle-desc">当有人回复你的评论时通知</span>
            </div>
            <!-- 替换为div模拟开关，绑定点击事件 -->
            <div 
              class="toggle-switch" 
              @click="toggleSwitch('commentReply')"
              :class="{ checked: notifications.commentReply }"
            >
              <span class="slider"></span>
            </div>
          </div>
          <div class="toggle-item">
            <div class="toggle-info">
              <span class="toggle-name">点赞通知</span>
              <span class="toggle-desc">当有人点赞你的内容时通知</span>
            </div>
            <div 
              class="toggle-switch" 
              @click="toggleSwitch('newLike')"
              :class="{ checked: notifications.newLike }"
            >
              <span class="slider"></span>
            </div>
          </div>
          <div class="toggle-item">
            <div class="toggle-info">
              <span class="toggle-name">新评论</span>
              <span class="toggle-desc">当你的文章收到新评论时通知</span>
            </div>
            <div 
              class="toggle-switch" 
              @click="toggleSwitch('newComment')"
              :class="{ checked: notifications.newComment }"
            >
              <span class="slider"></span>
            </div>
          </div>
          <div class="toggle-item">
            <div class="toggle-info">
              <span class="toggle-name">新关注</span>
              <span class="toggle-desc">当有新用户关注你时通知</span>
            </div>
            <div 
              class="toggle-switch" 
              @click="toggleSwitch('newFollower')"
              :class="{ checked: notifications.newFollower }"
            >
              <span class="slider"></span>
            </div>
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
            <div 
              class="toggle-switch" 
              @click="toggleSwitch('systemMessage')"
              :class="{ checked: notifications.systemMessage }"
            >
              <span class="slider"></span>
            </div>
          </div>
          <div class="toggle-item">
            <div class="toggle-info">
              <span class="toggle-name">每周精选</span>
              <span class="toggle-desc">每周热门内容摘要</span>
            </div>
            <div 
              class="toggle-switch" 
              @click="toggleSwitch('weeklyDigest')"
              :class="{ checked: notifications.weeklyDigest }"
            >
              <span class="slider"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="entry-footer">
      <button class="btn-small bloglo-btn" @click="handleSave">保存设置</button>
    </div>
  </div>
</template>

<style scoped>
/* 基础样式不变，仅修改开关相关样式 */
.settings-panel { padding: 0; }
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
.entry-content { padding: 3rem; }
.section {
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 0.1rem solid rgba(190, 190, 190, 0.3);
}
.section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}
.section-title {
  margin: 0 0 2rem 0;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--bloglo-secondary, #232323);
}
.toggle-list { 
  display: flex; 
  flex-direction: column; 
  gap: 1.5rem;
}
.toggle-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.8rem 2rem;
  background: rgba(190, 190, 190, 0.1);
  border-radius: var(--bloglo-normal-radius, 0.3rem);
}
.toggle-info { 
  display: flex; 
  flex-direction: column; 
  gap: 0.5rem; 
}
.toggle-name {
  font-weight: 500;
  font-size: 1.7rem;
  color: var(--bloglo-secondary, #232323);
}
.toggle-desc {
  font-size: 1.5rem;
  color: #94a3b8;
}

/* 纯div模拟开关，无原生checkbox */
.toggle-switch {
  position: relative;
  width: 4.4rem;
  height: 2.4rem;
  display: inline-block;
  cursor: pointer;
  border-radius: 2.4rem;
  background: #cbd5e1; /* 默认未选中背景 */
  transition: 0.3s;
}

/* 选中状态的背景色 */
.toggle-switch.checked {
  background: var(--bloglo-primary, #FC6668);
}

.slider {
  position: absolute;
  content: "";
  height: 1.8rem;
  width: 1.8rem;
  left: 0.3rem;
  bottom: 0.3rem;
  background: white;
  border-radius: 50%;
  transition: 0.3s;
}

/* 选中时滑块右移 */
.toggle-switch.checked .slider {
  transform: translateX(2rem);
}

.entry-footer {
  padding: 2.5rem 3rem;
  border-top: 0.1rem solid rgba(190, 190, 190, 0.3);
  display: flex;
  justify-content: flex-end;
}
.btn-small {
  padding: 0.8rem 2rem;
  min-height: 4rem;
}
.bloglo-btn {
  border: none;
  border-radius: var(--bloglo-normal-radius, 0.3rem);
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  background: var(--bloglo-primary, #FC6668);
  color: #fff;
}
.bloglo-btn:hover {
  background: #e55557;
}
@media (max-width: 768px) {
  .entry-header, .entry-content, .entry-footer { 
    padding: 2rem; 
  }
  .toggle-item { 
    flex-direction: column; 
    align-items: flex-start; 
    gap: 1.5rem; 
  }
}
</style>