<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

// 用户信息
const userInfo = ref({
  nickname: "SAu",
  username: "iFannna",
  signature: "Tell us a little bit about yourself",
  bio: "Tell us a little bit about yourself",
  avatar: "https://java-ai-sau.oss-cn-beijing.aliyuncs.com/2025/04/312b700a-e1c7-42bf-aa23-5db8dc7121a6.jpg",
  socialLinks: [
    { id: 1, url: "", placeholder: "Link to social profile 1" },
    { id: 2, url: "", placeholder: "Link to social profile 2" },
    { id: 3, url: "", placeholder: "Link to social profile 3" },
    { id: 4, url: "", placeholder: "Link to social profile 4" }
  ],
  address: ""
});

// 保存设置
const saveSettings = () => {
  // TODO: 调用API保存数据
  ElMessage.success("设置已保存");
};

// 上传头像
const uploadAvatar = () => {
  // TODO: 实现头像上传功能
  ElMessage.info("头像上传功能开发中");
};

// 页面加载
onMounted(() => {
  const loginUser = localStorage.getItem("loginUser");
  if (loginUser) {
    const user = JSON.parse(loginUser);
    userInfo.value.nickname = user.nickname || userInfo.value.nickname;
    userInfo.value.username = user.username || userInfo.value.username;
    userInfo.value.avatar = user.avatar || userInfo.value.avatar;
  }
});
</script>

<template>
  <div class="profile-content">
    <div class="content-header">
      <h2 class="content-title">个人资料</h2>
    </div>

    <div class="settings-form">
      <!-- 昵称和头像 -->
      <div class="form-row">
        <div class="form-group form-group-large">
          <label class="form-label">昵称</label>
          <input
            type="text"
            v-model="userInfo.nickname"
            class="form-input"
          />
        </div>

        <div class="form-group avatar-group">
          <label class="form-label">头像</label>
          <div class="avatar-upload">
            <img :src="userInfo.avatar" alt="Avatar" class="avatar-preview" />
            <button class="avatar-edit-btn" @click="uploadAvatar">
              ✏️ 编辑
            </button>
          </div>
        </div>
      </div>

      <!-- 个性签名 -->
      <div class="form-group">
        <label class="form-label">个性签名</label>
        <textarea
          v-model="userInfo.signature"
          class="form-textarea"
          rows="3"
        ></textarea>
      </div>

      <!-- 个人介绍 -->
      <div class="form-group">
        <label class="form-label">个人介绍</label>
        <textarea
          v-model="userInfo.bio"
          class="form-textarea"
          rows="3"
        ></textarea>
      </div>

      <!-- 社交账号 -->
      <div class="form-group">
        <label class="form-label">社交账号</label>
        <div class="social-links">
          <div
            v-for="link in userInfo.socialLinks"
            :key="link.id"
            class="social-link-item"
          >
            <span class="link-icon">🔗</span>
            <input
              type="text"
              v-model="link.url"
              :placeholder="link.placeholder"
              class="form-input"
            />
          </div>
        </div>
      </div>

      <!-- 住址 -->
      <div class="form-group">
        <label class="form-label">住址</label>
        <input
          type="text"
          v-model="userInfo.address"
          placeholder="Enter your address"
          class="form-input"
        />
      </div>

      <!-- 保存按钮 -->
      <div class="form-actions">
        <button class="btn-save" @click="saveSettings">保存更改</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.content-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
}

.content-title {
  font-size: 2rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

/* 表单样式 */
.settings-form {
  max-width: 900px;
}

.form-row {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 2rem;
}

.form-group-large {
  flex: 1;
}

.avatar-group {
  width: 280px;
  flex-shrink: 0;
}

.form-label {
  display: block;
  font-size: 1.4rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.8rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.8rem 1.2rem;
  font-size: 1.4rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--bloglo-primary, #0554f2);
  background: rgba(0, 0, 0, 0.4);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

/* 头像上传 */
.avatar-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.avatar-preview {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.2);
}

.avatar-edit-btn {
  padding: 0.6rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  color: #fff;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.avatar-edit-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

/* 社交链接 */
.social-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-link-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.link-icon {
  font-size: 1.6rem;
  color: rgba(255, 255, 255, 0.6);
}

/* 保存按钮 */
.form-actions {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-save {
  padding: 1rem 2.5rem;
  background: var(--bloglo-primary, #0554f2);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-save:hover {
  background: #0443d1;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(5, 84, 242, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .profile-content {
    padding: 1rem;
  }

  .form-row {
    flex-direction: column;
    gap: 1rem;
  }

  .avatar-group {
    width: 100%;
  }
}

/* 暗色主题适配 */
[data-theme="dark"] .form-input,
[data-theme="dark"] .form-textarea {
  color: #fff;
}
</style>