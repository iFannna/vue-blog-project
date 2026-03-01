<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const defaultAvatar = "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png";

const form = ref({
  nickname: userInfo.value?.nickname || "",
  bio: userInfo.value?.bio || "",
  location: userInfo.value?.location || "",
});

const handleAvatarChange = () => {
  ElMessage.info("头像上传功能即将开放");
};

const handleSave = () => {
  ElMessage.success("个人资料保存成功");
};
</script>

<template>
  <div class="settings-panel">
    <header class="entry-header">
      <h2 class="entry-title">个人资料</h2>
    </header>

    <div class="entry-content">
      <!-- 表单区域（左侧） -->
      <div class="form-section">
        <div class="form-group">
          <label class="form-label">昵称</label>
          <input type="text" v-model="form.nickname" class="form-input" placeholder="SAu" />
        </div>

        <div class="form-group">
          <label class="form-label">简介</label>
          <textarea v-model="form.bio" class="form-textarea" rows="4" placeholder="请简单介绍一下你自己"></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">位置</label>
          <input type="text" v-model="form.location" class="form-input" placeholder="" />
        </div>
      </div>

      <!-- 头像区域（右侧） -->
      <div class="avatar-section">
        <div class="avatar-container">
          <div class="avatar-preview">
            <img :src="userInfo?.avatar || defaultAvatar" alt="头像" />
            <!-- 编辑按钮 -->
            <button class="edit-avatar-btn" @click="handleAvatarChange">
              <i class="fa-solid fa-pen"></i>
              <span>编辑</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-panel {
  padding: 0;
}

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

.entry-content {
  display: flex;
  gap: 8rem; /* 增加间距，视觉更协调 */
  padding: 3rem;
  align-items: flex-start; /* 顶部对齐 */
}

/* 表单区域样式 */
.form-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.form-label {
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--bloglo-secondary, #232323);
}

.form-input,
.form-textarea {
  padding: 1.2rem 1.6rem;
  border: 0.2rem solid rgba(190, 190, 190, 0.3);
  border-radius: var(--bloglo-normal-radius, 0.3rem);
  font-size: 1.5rem;
  color: var(--bloglo-secondary, #232323);
  background: var(--bloglo-white, #fff);
  transition: var(--bloglo-transition-primary);
  min-height: 5rem;
  width: 100%; /* 确保输入框宽度自适应 */
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--bloglo-primary, #FC6668);
}

.form-textarea {
  resize: vertical;
  min-height: 12rem;
  line-height: 1.6;
}

/* 头像区域样式 */
.avatar-section {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.avatar-container {
  position: relative; /* 作为编辑按钮的定位容器 */
}

.avatar-preview {
  width: 200px; /* 头像尺寸改为200px */
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  position: relative; 

}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 编辑按钮 - 定位到头像左下角 */
.edit-avatar-btn {
  position: absolute;
  bottom: 15px; /* 距离底部 */
  left: 15px; /* 距离左侧 */
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: none;
  border-radius: 20px; /* 圆角按钮 */
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  font-size: 1.4rem;
  transition: background 0.2s ease;
}

.edit-avatar-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.edit-avatar-btn i {
  font-size: 1.4rem;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .entry-header,
  .entry-content {
    padding: 2rem;
  }
  .entry-content {
    flex-direction: column;
    align-items: center;
    gap: 4rem;
  }
  .form-section {
    width: 100%;
  }
  .avatar-preview {
    width: 180px; /* 移动端适当缩小，但仍大于200px的80% */
    height: 180px;
  }
}
</style>