<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";

const settings = ref({
  language: "zh-CN",
  theme: "auto",
  fontSize: "medium"
});

const saveSettings = () => {
  ElMessage.success("通用设置已保存");
};
</script>

<template>
  <div class="general-content">
    <div class="content-header">
      <h2 class="content-title">通用设置</h2>
    </div>

    <div class="settings-form">
      <div class="form-group">
        <label class="form-label">语言</label>
        <select v-model="settings.language" class="form-select">
          <option value="zh-CN">简体中文</option>
          <option value="en-US">English</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">主题</label>
        <select v-model="settings.theme" class="form-select">
          <option value="auto">自动</option>
          <option value="light">浅色</option>
          <option value="dark">深色</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">字体大小</label>
        <select v-model="settings.fontSize" class="form-select">
          <option value="small">小</option>
          <option value="medium">中</option>
          <option value="large">大</option>
        </select>
      </div>

      <div class="form-actions">
        <button class="btn-save" @click="saveSettings">保存更改</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.general-content {
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

/* 浅色主题标题颜色 */
:root[data-theme="light"] .content-title {
  color: #333;
}

:root[data-theme="light"] .content-header {
  border-bottom-color: rgba(0, 0, 0, 0.1);
}

/* 浅色主题标签颜色 */
:root[data-theme="light"] .form-label {
  color: #333;
}

/* 浅色主题下拉框颜色 */
:root[data-theme="light"] .form-select {
  color: #333;
  background: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.15);
}

:root[data-theme="light"] .form-select:focus {
  background: rgba(0, 0, 0, 0.08);
}

:root[data-theme="light"] .form-actions {
  border-top-color: rgba(0, 0, 0, 0.1);
}

.settings-form {
  max-width: 600px;
}

.form-group {
  margin-bottom: 2rem;
}

.form-label {
  display: block;
  font-size: 1.4rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.8rem;
}

.form-select {
  width: 100%;
  padding: 0.8rem 1.2rem;
  font-size: 1.4rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.form-select:focus {
  outline: none;
  border-color: var(--bloglo-primary, #0554f2);
  background: rgba(0, 0, 0, 0.4);
}

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
</style>