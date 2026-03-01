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
    <!-- 统一命名为entry-header，保持结构一致性 -->
    <header class="entry-header">
      <h2 class="entry-title">网站设置</h2>
      
    </header>

    <!-- 统一命名为entry-content -->
    <div class="entry-content">
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
          <label class="form-label">关键词</label>
          <input type="text" v-model="seoForm.keywords" class="form-input" placeholder="英文逗号分隔多个关键词"/>
        </div>
      </div>
    </div>

    <!-- 统一命名为entry-footer -->
    <div class="entry-footer">
      <button class="btn-small bloglo-btn" @click="handleSave">保存设置</button>
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

/* 区块样式统一：间距、边框、标题样式 */
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

/* 表单行样式适配rem单位 */
.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.6rem;
}

.form-label {
  font-size: 1.7rem;
  font-weight: 500;
  color: var(--bloglo-secondary, #232323);
}

/* 表单输入框样式统一：尺寸、边框、圆角、聚焦效果 */
.form-input,
.form-textarea {
  padding: 1rem 1.4rem;
  border: 0.2rem solid rgba(190, 190, 190, 0.3);
  border-radius: var(--bloglo-normal-radius, 0.3rem);
  font-size: 1.5rem;
  color: var(--bloglo-secondary, #232323);
  background: #fff;
  transition: 0.3s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--bloglo-primary, #FC6668);

}

.form-textarea {
  resize: vertical;
  min-height: 8rem;
}

/* 上传区域样式适配统一风格 */
.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 2.4rem;
  border: 0.2rem dashed rgba(190, 190, 190, 0.3);
  border-radius: var(--bloglo-normal-radius, 0.3rem);
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-area:hover {
  border-color: var(--bloglo-primary, #FC6668);
  color: var(--bloglo-primary, #FC6668);
}

.upload-area i { 
  font-size: 2rem; 
}

.upload-area span {
  font-size: 1.5rem;
}

/* 底部样式统一：padding、边框、布局 */
.entry-footer {
  padding: 2.5rem 3rem;
  border-top: 0.1rem solid rgba(190, 190, 190, 0.3);
  display: flex;
  justify-content: flex-end;
}

/* 按钮样式和已有页面完全统一 */
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
  transition: 0.3s;
}

.bloglo-btn:hover {
  background: #e55557;
}

/* 响应式设计和已有页面保持一致 */
@media (max-width: 768px) {
  .entry-header, .entry-content, .entry-footer { 
    padding: 2rem; 
  }
  .form-row { 
    grid-template-columns: 1fr; 
  }
  .upload-area {
    padding: 1.8rem;
  }
}
</style>