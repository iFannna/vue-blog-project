<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";

const passwordForm = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const handleChangePassword = () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    ElMessage.error("两次输入的密码不一致");
    return;
  }
  ElMessage.success("密码修改成功");
};
</script>

<template>
  <div class="settings-panel">
    <header class="entry-header">
      <h2 class="entry-title">账户安全</h2>
      <p class="entry-desc">管理你的密码和账户安全设置</p>
    </header>

    <div class="entry-content">
      <!-- 修改密码 -->
      <div class="section">
        <h3 class="section-title">修改密码</h3>
        <div class="form-group">
          <label class="form-label">当前密码</label>
          <input type="password" v-model="passwordForm.currentPassword" class="form-input" placeholder="请输入当前密码" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">新密码</label>
            <input type="password" v-model="passwordForm.newPassword" class="form-input" placeholder="请输入新密码" />
          </div>
          <div class="form-group">
            <label class="form-label">确认新密码</label>
            <input type="password" v-model="passwordForm.confirmPassword" class="form-input" placeholder="请再次输入新密码" />
          </div>
        </div>
        <button class="bloglo-btn btn-small" @click="handleChangePassword">
          <span>更新密码</span>
        </button>
      </div>

      <!-- 账号绑定 -->
      <div class="section">
        <h3 class="section-title">账号绑定</h3>
        <div class="bind-list">
          <div class="bind-item">
            <div class="bind-info">
              <i class="fa-solid fa-envelope"></i>
              <div class="bind-details">
                <span class="bind-name">邮箱</span>
                <span class="bind-status bound">user@example.com</span>
              </div>
            </div>
            <button class="bloglo-btn btn-small btn-outline">更换</button>
          </div>
          <div class="bind-item">
            <div class="bind-info">
              <i class="fa-solid fa-mobile-screen"></i>
              <div class="bind-details">
                <span class="bind-name">手机号</span>
                <span class="bind-status unbound">未绑定</span>
              </div>
            </div>
            <button class="bloglo-btn btn-small">绑定</button>
          </div>
          <div class="bind-item">
            <div class="bind-info">
              <i class="fa-brands fa-github"></i>
              <div class="bind-details">
                <span class="bind-name">GitHub</span>
                <span class="bind-status unbound">未绑定</span>
              </div>
            </div>
            <button class="bloglo-btn btn-small">绑定</button>
          </div>
          <div class="bind-item">
            <div class="bind-info">
              <i class="fa-brands fa-weixin" style="color: #07c160;"></i>
              <div class="bind-details">
                <span class="bind-name">微信</span>
                <span class="bind-status unbound">未绑定</span>
              </div>
            </div>
            <button class="bloglo-btn btn-small">绑定</button>
          </div>
        </div>
      </div>

      <!-- 安全设置 -->
      <div class="section">
        <h3 class="section-title">安全设置</h3>
        <div class="toggle-list">
          <div class="toggle-item">
            <div class="toggle-info">
              <span class="toggle-name">两步验证</span>
              <span class="toggle-desc">登录时需要额外验证码</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="toggle-item">
            <div class="toggle-info">
              <span class="toggle-name">登录通知</span>
              <span class="toggle-desc">新设备登录时发送邮件通知</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" checked />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  color: #666;
  font-size: 1.5rem;
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

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;
}

.form-label {
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--bloglo-secondary, #232323);
}

.form-input {
  padding: 1.2rem 1.6rem;
  border: 0.2rem solid rgba(190, 190, 190, 0.3);
  border-radius: var(--bloglo-normal-radius, 0.3rem);
  font-size: 1.5rem;
  color: var(--bloglo-secondary, #232323);
  min-height: 5rem;
}

.form-input:focus {
  outline: none;
  border-color: var(--bloglo-primary, #FC6668);
}

.bloglo-btn {
  background: var(--bloglo-primary, #FC6668);
  color: #fff;
  border-color: var(--bloglo-primary, #FC6668);
  font-size: 1.4rem;
}

.bloglo-btn:hover {
  background: var(--bloglo-secondary, #232323);
  border-color: var(--bloglo-secondary, #232323);
}

.btn-small {
  padding: 0.8rem 2rem;
  min-height: 4rem;
}

.btn-outline {
  background: transparent;
  color: var(--bloglo-secondary, #232323);
  border-color: rgba(190, 190, 190, 0.5);
}

.btn-outline:hover {
  background: var(--bloglo-primary, #FC6668);
  border-color: var(--bloglo-primary, #FC6668);
  color: #fff;
}

/* 绑定列表 */
.bind-list { display: flex; flex-direction: column; gap: 1.5rem; }

.bind-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.8rem 2rem;
  background: rgba(190, 190, 190, 0.1);
  border-radius: var(--bloglo-normal-radius, 0.3rem);
}

.bind-info { display: flex; align-items: center; gap: 1.5rem; }

.bind-info > i {
  font-size: 2rem;
  width: 3rem;
  text-align: center;
  color: var(--bloglo-primary, #FC6668);
}

.bind-details { display: flex; flex-direction: column; gap: 0.3rem; }

.bind-name {
  font-weight: 500;
  font-size: 1.5rem;
  color: var(--bloglo-secondary, #232323);
}

.bind-status { font-size: 1.3rem; }
.bind-status.bound { color: #22c55e; }
.bind-status.unbound { color: #94a3b8; }

/* 开关列表 */
.toggle-list { display: flex; flex-direction: column; gap: 1.5rem; }

.toggle-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.8rem 2rem;
  background: rgba(190, 190, 190, 0.1);
  border-radius: var(--bloglo-normal-radius, 0.3rem);
}

.toggle-info { display: flex; flex-direction: column; gap: 0.3rem; }

.toggle-name {
  font-weight: 500;
  font-size: 1.5rem;
  color: var(--bloglo-secondary, #232323);
}

.toggle-desc {
  font-size: 1.3rem;
  color: #666;
}

.toggle-switch {
  position: relative;
  width: 5rem;
  height: 2.6rem;
}

.toggle-switch input { opacity: 0; width: 0; height: 0; }

.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background: #cbd5e1;
  border-radius: 2.6rem;
  transition: 0.3s;
}

.slider::before {
  position: absolute;
  content: "";
  height: 2rem;
  width: 2rem;
  left: 0.3rem;
  bottom: 0.3rem;
  background: white;
  border-radius: 50%;
  transition: 0.3s;
}

.toggle-switch input:checked + .slider { background: var(--bloglo-primary, #FC6668); }
.toggle-switch input:checked + .slider::before { transform: translateX(2.4rem); }

@media (max-width: 768px) {
  .entry-header, .entry-content { padding: 2rem; }
  .form-row { grid-template-columns: 1fr; }
  .bind-item, .toggle-item { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
}

/* 深色模式 */
[data-theme="dark"] .entry-header, [data-theme="dark"] .section { border-color: rgba(255, 255, 255, 0.1); }
[data-theme="dark"] .entry-title, [data-theme="dark"] .section-title, [data-theme="dark"] .form-label, [data-theme="dark"] .bind-name, [data-theme="dark"] .toggle-name { color: #f1f5f9; }
[data-theme="dark"] .entry-desc, [data-theme="dark"] .toggle-desc { color: #94a3b8; }
[data-theme="dark"] .form-input { background: rgba(30, 41, 59, 0.8); border-color: rgba(255, 255, 255, 0.1); color: #f1f5f9; }
[data-theme="dark"] .bind-item, [data-theme="dark"] .toggle-item { background: rgba(30, 41, 59, 0.5); }
[data-theme="dark"] .slider { background: #475569; }
</style>