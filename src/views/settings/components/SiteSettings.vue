<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";

const siteForm = ref({
  siteName: "赵瑾瑜个人博客",
  siteDesc: "Vue+SpringBoot 个人博客",
  siteUrl: "https://example.com",
  logo: "",
  favicon: "",
  icp: "赣ICP备2025076466号-1",
  police: "渝公网安备50010802006648号",
  keywords: "博客, Vue, SpringBoot, 前端, 后端",
});

const seoForm = ref({
  title: "赵瑾瑜个人博客 - 技术分享",
  description: "分享前端、后端技术文章，记录学习成长",
  keywords: "Vue, SpringBoot, 前端开发, Java",
});

const handleSave = () => {
  ElMessage.success("网站设置已保存");
};
</script>

<template>
  <div class="settings-panel">
    <div class="panel-header">
      <h2 class="panel-title">网站设置</h2>
      <p class="panel-desc">配置网站基本信息和SEO设置</p>
    </div>

    <div class="panel-body">
      <!-- 基本信息 -->
      <div class="section">
        <h3 class="section-title">基本信息</h3>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">网站名称</label>
            <input type="text" v-model="siteForm.siteName" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">网站地址</label>
            <input type="url" v-model="siteForm.siteUrl" class="form-input" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">网站描述</label>
          <textarea v-model="siteForm.siteDesc" class="form-textarea" rows="3"></textarea>
        </div>

        <!-- Logo 上传 -->
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">网站 Logo</label>
            <div class="upload-area">
              <i class="fa-solid fa-cloud-arrow-up"></i>
              <span>点击上传 Logo</span>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">网站 Favicon</label>
            <div class="upload-area">
              <i class="fa-solid fa-cloud-arrow-up"></i>
              <span>点击上传 Favicon</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 备案信息 -->
      <div class="section">
        <h3 class="section-title">备案信息</h3>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">ICP 备案号</label>
            <input type="text" v-model="siteForm.icp" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label">公安备案号</label>
            <input type="text" v-model="siteForm.police" class="form-input" />
          </div>
        </div>
      </div>

      <!-- SEO 设置 -->
      <div class="section">
        <h3 class="section-title">SEO 设置</h3>
        <div class="form-group">
          <label class="form-label">页面标题</label>
          <input type="text" v-model="seoForm.title" class="form-input" />
        </div>
        <div class="form-group">
          <label class="form-label">页面描述</label>
          <textarea v-model="seoForm.description" class="form-textarea" rows="2"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">关键词（用逗号分隔）</label>
          <input type="text" v-model="seoForm.keywords" class="form-input" />
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

.section {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--bloglo-border-color, #e2e8f0);
}

.section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.section-title {
  margin: 0 0 16px 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--bloglo-headings-color, #1e293b);
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.form-label {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--bloglo-headings-color, #374151);
}

.form-input,
.form-textarea {
  padding: 10px 14px;
  border: 1px solid var(--bloglo-border-color, #e2e8f0);
  border-radius: 8px;
  font-size: 0.9375rem;
  color: var(--bloglo-headings-color, #1e293b);
  background: var(--bloglo-input-bg, #fff);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--bloglo-primary, #2563eb);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  border: 2px dashed var(--bloglo-border-color, #e2e8f0);
  border-radius: 8px;
  color: var(--bloglo-text-color, #94a3b8);
  cursor: pointer;
  transition: all 0.2s;
}

.upload-area:hover {
  border-color: var(--bloglo-primary, #2563eb);
  color: var(--bloglo-primary, #2563eb);
}

.upload-area i { font-size: 1.5rem; }

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

@media (max-width: 768px) {
  .panel-header, .panel-body, .panel-footer { padding: 20px; }
  .form-row { grid-template-columns: 1fr; }
}

</style>