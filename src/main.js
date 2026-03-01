import { createApp } from 'vue'
import pinia from '@/stores/index'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/assets/scripts/bloglo-min.js'

// 阿里云安全校验服务配置
window.AliyunCaptchaConfig = {
  region: 'cn',
  prefix: '1afws2',
};

// bloglo 主题配置（供 bloglo-min.js 使用）
window.bloglo_vars = {
  'sticky-header': { enabled: false, hide_on: [''] },
  dark_mode: '',
};

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus, {locale: zhCn})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
