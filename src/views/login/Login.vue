<script setup>
import { ref, onMounted } from "vue";
import { loginApi } from "@/api/login";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

let loginForm = ref({
  account: "",
  password: "",
  rememberMe: false,
});
const showPassword = ref(false);
const router = useRouter();

// 主题切换
const isDarkMode = ref(false);

// 主题切换函数
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;

  if (isDarkMode.value) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("darkmode", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("darkmode", "light");
  }
};

// 登录逻辑
const doLogin = async () => {
  try {
    const result = await loginApi(loginForm.value);
    if (result.code) {
      ElMessage.success("登录成功");
      localStorage.setItem("loginUser", JSON.stringify(result.data));
      router.push("/");
    } else {
      ElMessage.error(result.msg);
    }
  } catch (error) {
    ElMessage.error("登录失败，请检查网络连接");
  }
};

// 切换密码显示
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// 第三方登录提示
const socialLogin = (platform) => {
  ElMessage.info(`${platform}登录功能即将开放！`);
};

// 忘记密码提示
const forgotPassword = () => {
  ElMessage.info("密码重置功能即将开放！");
};

// 前往注册页
const goToRegister = () => {
  router.push("/register");
};

// 返回首页
const goToHome = () => {
  router.push("/");
};

// 初始化主题
onMounted(() => {
  const darkmode = localStorage.getItem("darkmode");
  isDarkMode.value = darkmode === "dark";

  if (isDarkMode.value) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
});
</script>

<template>
  <div class="login-page-wrapper">
    <div class="login-card">
      <div class="login-header">
        <!-- 标题和主题切换图标容器 -->
        <div class="title-with-theme">
          <!-- 主题切换图标 -->
          <div class="bloglo-header-widgets">
            <div class="bloglo-header-widget bloglo-header-widget__darkmode">
              
              <div class="bloglo-darkmode-container">
                <div class="bloglo-widget-wrapper">
                <label
                  class="bloglo-darkmode"
                  for="login-darkswitch"
                  tabindex="0"
                  @click="toggleTheme"
                >
                  <input
                    type="checkbox"
                    id="login-darkswitch"
                    :checked="isDarkMode"
                    @change="toggleTheme"
                    :class="{ active: isDarkMode }"
                  />
                  <div class="bloglo-darkmode-toogle"></div>
                </label>
              </div>
              </div>
            </div>
          </div>
          
          <h1 class="login-title">欢迎回来</h1>
        </div>
        
        <p class="login-subtitle">登录您的账户，继续创意之旅</p>
      </div>

      <form @submit.prevent="doLogin">
        <!-- 邮箱/用户名输入框 -->
        <div class="form-group">
          <label class="form-label">邮箱或用户名</label>
          <div class="custom-input-wrapper">
            <input
              type="text"
              v-model="loginForm.account"
              placeholder="请输入邮箱或用户名"
              class="custom-input"
              required
            />
          </div>
        </div>

        <!-- 密码输入框 -->
        <div class="form-group">
          <label class="form-label">密码</label>
          <div class="custom-input-wrapper password-input">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="loginForm.password"
              placeholder="请输入密码"
              class="custom-input"
              required
            />
            <button
              type="button"
              class="toggle-password"
              @click="togglePassword"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>

        <div class="remember-forgot">
          <label class="remember-me">
            <input type="checkbox" v-model="loginForm.rememberMe" /> 记住我
          </label>
          <a href="#" class="forgot-password" @click.prevent="forgotPassword"
            >忘记密码？</a
          >
        </div>

        <!-- 登录按钮 -->
        <button type="submit" class="login-btn">登录</button>

        <div class="divider">
          <span>或使用以下方式登录</span>
        </div>

        <div class="social-login">
          <button
            type="button"
            class="social-btn wechat"
            @click="socialLogin('微信')"
          >
            <i class="fab fa-weixin"></i> 微信
          </button>
          <button
            type="button"
            class="social-btn qq"
            @click="socialLogin('QQ')"
          >
            <i class="fab fa-qq"></i> QQ
          </button>
        </div>

        <div class="register-link">
          还没有账户？ <a href="#" @click.prevent="goToRegister">立即注册</a>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.bloglo-darkmode-container{
  margin-top: 6px;
}
/* ==================== 登录页面容器 ==================== */
.login-page-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  position: relative;
}

/* 深色模式背景 */
[data-theme="dark"] .login-page-wrapper {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}


/* ==================== 登录卡片 ==================== */
.login-card {
  background: #fff;
  border-radius: 20px;
  padding: 40px 50px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 450px;
  transition: all 0.3s ease;
  z-index: 1;
  position: relative;
}

/* 深色模式卡片 */
[data-theme="dark"] .login-card {
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

/* ==================== 卡片头部 ==================== */
.login-header {
  text-align: center;
  margin-bottom: 20px;
}

/* 标题和主题切换图标容器 */
.title-with-theme {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; /* 图标和标题之间的间距 */
  margin-bottom: 10px;
}

.login-title {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 0;
  transition: color 0.3s ease;
}

[data-theme="dark"] .login-title {
  color: #ffffff;
}

.login-subtitle {
  color: #666;
  font-size: 14px;
  margin: 0;
  transition: color 0.3s ease;
}

[data-theme="dark"] .login-subtitle {
  color: rgba(255, 255, 255, 0.7);
}

/* ==================== 表单组 ==================== */
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
  font-size: 14px;
  transition: color 0.3s ease;
}

[data-theme="dark"] .form-label {
  color: #ffffff;
}

/* ==================== 自定义输入框 ==================== */
.custom-input-wrapper {
  position: relative;
  width: 100%;
}

.custom-input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s ease;
  box-sizing: border-box;
  outline: none;
  background: #fff;
  color: #333;
}

[data-theme="dark"] .custom-input {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
  color: #ffffff;
}

.custom-input::placeholder {
  color: #999;
}

[data-theme="dark"] .custom-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.custom-input:focus {
  border-color: #7289da;
  box-shadow: 0 0 0 3px rgba(114, 137, 218, 0.1);
}

[data-theme="dark"] .custom-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

/* 密码输入框 */
.password-input {
  position: relative;
}

.password-input .custom-input {
  padding-right: 45px;
}

.toggle-password {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
}

[data-theme="dark"] .toggle-password {
  color: rgba(255, 255, 255, 0.5);
}

.toggle-password:hover {
  color: #7289da;
}

[data-theme="dark"] .toggle-password:hover {
  color: #667eea;
}

/* ==================== 记住我与忘记密码 ==================== */
.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;
}

[data-theme="dark"] .remember-me {
  color: rgba(255, 255, 255, 0.7);
}

/* 统一浅色和深色模式的 checkbox 样式 */
.remember-me input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  border: 2px solid #d0d0d0;
  border-radius: 3px;
  background-color: #fff;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin: 0;
}

.remember-me input[type="checkbox"]:hover {
  border-color: #7289da;
}

.remember-me input[type="checkbox"]:checked {
  background: linear-gradient(135deg, #7289da, #9b6cdc);
  border-color: #7289da;
}

.remember-me input[type="checkbox"]:checked::before {
  content: "";
  position: absolute;
  left: 4px;
  top: 1px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* 深色主题下的 checkbox 调整 */
[data-theme="dark"] .remember-me input[type="checkbox"] {
  border-color: rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .remember-me input[type="checkbox"]:hover {
  border-color: #667eea;
  background-color: rgba(255, 255, 255, 0.15);
}

[data-theme="dark"] .remember-me input[type="checkbox"]:checked {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-color: #667eea;
}

.forgot-password {
  color: #7289da;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
}

[data-theme="dark"] .forgot-password {
  color: #667eea;
}

.forgot-password:hover {
  text-decoration: underline;
  color: #5a6fc7;
}

/* ==================== 登录按钮 ==================== */
.login-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #7289da, #9b6cdc);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(114, 137, 218, 0.3);
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(114, 137, 218, 0.4);
  background: linear-gradient(135deg, #677acd, #8c5bc7);
}

.login-btn:active {
  transform: translateY(0);
}

[data-theme="dark"] .login-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

[data-theme="dark"] .login-btn:hover {
  background: linear-gradient(135deg, #5568d3, #6a3f8f);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

/* ==================== 分割线 ==================== */
.divider {
  text-align: center;
  margin: 25px 0 20px;
  position: relative;
  color: #999;
  font-size: 13px;
}

[data-theme="dark"] .divider {
  color: rgba(255, 255, 255, 0.5);
}

.divider:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e0e0e0;
  z-index: 1;
}

[data-theme="dark"] .divider:before {
  background: rgba(255, 255, 255, 0.15);
}

.divider span {
  background: #fff;
  position: relative;
  z-index: 2;
}

[data-theme="dark"] .divider span {
  background: rgba(0, 0, 0, 0.3);
}

/* ==================== 社交登录按钮 ==================== */
.social-login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

[data-theme="dark"] .social-btn {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
  color: #ffffff;
}

.social-btn:hover {
  border-color: #7289da;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] .social-btn:hover {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.social-btn.wechat {
  color: #07c160;
}

[data-theme="dark"] .social-btn.wechat {
  color: #09d569;
}

.social-btn.qq {
  color: #12b7f5;
}

[data-theme="dark"] .social-btn.qq {
  color: #1ac0ff;
}

/* ==================== 注册链接 ==================== */
.register-link {
  text-align: center;
  color: #666;
  font-size: 14px;
  transition: color 0.3s ease;
}

[data-theme="dark"] .register-link {
  color: rgba(255, 255, 255, 0.7);
}

.register-link a {
  color: #7289da;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

[data-theme="dark"] .register-link a {
  color: #667eea;
}

.register-link a:hover {
  text-decoration: underline;
  color: #5a6fc7;
}

/* ==================== 响应式设计 ==================== */

@media (max-width: 768px) {
  .login-card {
    padding: 30px 25px;
    max-width: 100%;
  }

  .login-title {
    font-size: 24px;
  }

}

@media (max-width: 480px) {

  .login-card {
    padding: 25px 20px;
    border-radius: 16px;
  }

  .social-login {
    grid-template-columns: 1fr;
  }

}

</style>