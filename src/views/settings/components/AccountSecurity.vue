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
       
        <button class="btn-small bloglo-btn" @click="handleChangePassword">
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
           
            <button class="btn-small bloglo-btn">更换</button>
          </div>
          
          <div class="bind-item">
            <div class="bind-info">
              <i class="fa-brands fa-github"></i>
              <div class="bind-details">
                <span class="bind-name">GitHub</span>
                <span class="bind-status unbound">未绑定</span>
              </div>
            </div>
           
            <button class="btn-small bloglo-btn">绑定</button>
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

.btn-small {
  padding: 0.8rem 2rem;
  min-height: 4rem;
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

.bind-name {
  margin-right: 1rem;
  font-weight: 500;
  font-size: 1.7rem;
  color: var(--bloglo-secondary, #232323);
}

.bind-status { font-size: 1.7rem; }
.bind-status.bound { color: var(--bloglo-secondary, #232323)}
.bind-status.unbound { color: #94a3b8; }

@media (max-width: 768px) {
  .entry-header, .entry-content { padding: 2rem; }
  .form-row { grid-template-columns: 1fr; }
  .bind-item { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
}
</style>