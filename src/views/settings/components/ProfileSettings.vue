<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const defaultAvatar = "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png";

const form = ref({
  nickname: userInfo.value?.nickname || "",
  email: userInfo.value?.email || "",
  phone: userInfo.value?.phone || "",
  bio: userInfo.value?.bio || "",
  website: userInfo.value?.website || "",
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
      <p class="entry-desc">管理你的个人信息和公开资料</p>
    </header>

    <div class="entry-content">
      <!-- 头像区域 -->
      <div class="avatar-section">
        <div class="avatar-preview" @click="handleAvatarChange">
          <img :src="userInfo?.avatar || defaultAvatar" alt="头像" />
          <div class="avatar-overlay">
            <i class="fa-solid fa-camera"></i>
            <span>更换头像</span>
          </div>
        </div>
        <div class="avatar-tips">
          <p>支持 JPG、PNG 格式，建议尺寸 200x200 像素</p>
        </div>
      </div>

      <!-- 表单区域 -->
      <div class="form-section">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">昵称</label>
            <input type="text" v-model="form.nickname" class="form-input" placeholder="请输入昵称" />
          </div>
          <div class="form-group">
            <label class="form-label">邮箱</label>
            <input type="email" v-model="form.email" class="form-input" placeholder="请输入邮箱" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">手机号</label>
            <input type="tel" v-model="form.phone" class="form-input" placeholder="请输入手机号" />
          </div>
          <div class="form-group">
            <label class="form-label">所在地</label>
            <input type="text" v-model="form.location" class="form-input" placeholder="请输入所在城市" />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">个人网站</label>
          <input type="url" v-model="form.website" class="form-input" placeholder="https://example.com" />
        </div>

        <div class="form-group">
          <label class="form-label">个人简介</label>
          <textarea v-model="form.bio" class="form-textarea" rows="4" placeholder="介绍一下自己吧..."></textarea>
        </div>
      </div>
    </div>

    <footer class="entry-footer">
      <button class="bloglo-btn" @click="handleSave">
        <span>保存更改</span>
      </button>
    </footer>
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

.entry-desc {
  margin: 0;
  color: #666;
  font-size: 1.5rem;
}

.entry-content {
  padding: 3rem;
}

/* 头像区域 */
.avatar-section {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 0.1rem solid rgba(190, 190, 190, 0.3);
}

.avatar-preview {
  position: relative;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #fff;
  font-size: 1.4rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.avatar-preview:hover .avatar-overlay {
  opacity: 1;
}

.avatar-overlay i {
  font-size: 2rem;
}

.avatar-tips p {
  margin: 0;
  color: #888;
  font-size: 1.4rem;
}

/* 表单样式 */
.form-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

/* 底部按钮 */
.entry-footer {
  padding: 2rem 3rem;
  border-top: 0.1rem solid rgba(190, 190, 190, 0.3);
  display: flex;
  justify-content: flex-end;
}

.bloglo-btn {
  background: var(--bloglo-primary, #FC6668);
  color: #fff;
  border-color: var(--bloglo-primary, #FC6668);
  font-size: 1.5rem;
  padding: 1.2rem 3rem;
}

.bloglo-btn:hover {
  background: var(--bloglo-secondary, #232323);
  border-color: var(--bloglo-secondary, #232323);
}

@media (max-width: 768px) {
  .entry-header,
  .entry-content,
  .entry-footer {
    padding: 2rem;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
  .avatar-section {
    flex-direction: column;
    text-align: center;
  }
}


</style>