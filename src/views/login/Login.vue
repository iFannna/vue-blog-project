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

// 主题切换函数 - 真正的圆形扩散动画
let themeToggleTimer = null;
const toggleTheme = async (event) => {
  if (themeToggleTimer) return;
  
  event.preventDefault();
  event.stopPropagation();
  
  // 检查浏览器是否支持 View Transitions API
  if (!document.startViewTransition) {
    applyThemeChange();
    return;
  }

  // 获取点击位置
  const x = event.clientX;
  const y = event.clientY;

  // 计算到屏幕四个角的距离，取最大值作为扩散半径
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  // 启动 View Transition
  const transition = document.startViewTransition(async () => {
    applyThemeChange();
  });

  // 等待过渡准备就绪，然后自定义动画
  transition.ready.then(() => {
    // 为新页面添加圆形扩散动画
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`
    ];

    document.documentElement.animate(
      {
        clipPath: clipPath
      },
      {
        duration: 800,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)'
      }
    );
  });
  
  // 防抖处理
  themeToggleTimer = setTimeout(() => {
    themeToggleTimer = null;
  }, 800);
};

// 应用主题变更
const applyThemeChange = () => {
  isDarkMode.value = !isDarkMode.value;

  if (isDarkMode.value) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("darkmode", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("darkmode", "light");
  }
};

// 登录逻辑 - 添加防抖
let loginTimer = null;
const doLogin = async () => {
  if (loginTimer) return;
  
  loginTimer = setTimeout(() => {
    loginTimer = null;
  }, 1000);
  
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
    <!-- 运动的几何图形背景 -->
    <div class="waves-background">
      <div class="squares">
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
      </div>
      <div class="triangles">
        <div class="triangle"></div>
        <div class="triangle"></div>
        <div class="triangle"></div>
        <div class="triangle"></div>
        <div class="triangle"></div>
      </div>
      <div class="circles">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    </div>
    
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

/* ==================== 运动的几何图形背景 ==================== */
.waves-background {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: 0;
  pointer-events: none;
}

.waves-background .circle,
.waves-background .triangle,
.waves-background .square {
  position: absolute;
  bottom: -100px;
  width: 40px;
  height: 40px;
  background: #fc6668;
  border-radius: 5px;
  opacity: 0.15;
  animation: rise 10s infinite ease-in;
}

[data-theme="dark"] .waves-background .circle,
[data-theme="dark"] .waves-background .triangle,
[data-theme="dark"] .waves-background .square {
  background: #fc6668;
  opacity: 0.2;
}

/* 正方形动画 */
.waves-background .square:nth-child(1) {
  width: 40px;
  height: 40px;
  left: 10%;
  animation-duration: 8s;
}

.waves-background .square:nth-child(2) {
  width: 20px;
  height: 20px;
  left: 20%;
  animation-duration: 5s;
  animation-delay: 1s;
}

.waves-background .square:nth-child(3) {
  width: 50px;
  height: 50px;
  left: 35%;
  animation-duration: 7s;
  animation-delay: 2s;
}

.waves-background .square:nth-child(4) {
  width: 80px;
  height: 80px;
  left: 50%;
  animation-duration: 11s;
  animation-delay: 0s;
}

.waves-background .square:nth-child(5) {
  width: 35px;
  height: 35px;
  left: 55%;
  animation-duration: 6s;
  animation-delay: 1s;
}

.waves-background .square:nth-child(6) {
  width: 45px;
  height: 45px;
  left: 65%;
  animation-duration: 8s;
  animation-delay: 3s;
}

.waves-background .square:nth-child(7) {
  width: 90px;
  height: 90px;
  left: 70%;
  animation-duration: 12s;
  animation-delay: 2s;
}

.waves-background .square:nth-child(8) {
  width: 25px;
  height: 25px;
  left: 80%;
  animation-duration: 6s;
  animation-delay: 2s;
}

.waves-background .square:nth-child(9) {
  width: 15px;
  height: 15px;
  left: 70%;
  animation-duration: 5s;
  animation-delay: 1s;
}

.waves-background .square:nth-child(10) {
  width: 90px;
  height: 90px;
  left: 25%;
  animation-duration: 10s;
  animation-delay: 4s;
}

/* 三角形样式 */
.waves-background .triangle {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.waves-background .triangle:nth-child(1) {
  width: 20px;
  height: 22px;
  left: 50%;
  animation-delay: 0s;
}

.waves-background .triangle:nth-child(2) {
  width: 30px;
  height: 28px;
  left: 25%;
  animation-delay: 12s;
}

.waves-background .triangle:nth-child(3) {
  width: 30px;
  height: 28px;
  left: 80%;
  animation-delay: 4s;
}

.waves-background .triangle:nth-child(4) {
  width: 40px;
  height: 38px;
  left: 30%;
  animation-delay: 18s;
}

.waves-background .triangle:nth-child(5) {
  width: 50px;
  height: 40px;
  left: 70%;
  animation-delay: 1s;
}

/* 圆形样式 */
.waves-background .circle {
  border-radius: 100%;
}

.waves-background .circle:nth-child(1) {
  width: 22px;
  height: 20px;
  left: 10%;
  animation-delay: 0s;
}

.waves-background .circle:nth-child(2) {
  width: 84px;
  height: 80px;
  left: 45%;
  animation-delay: 12s;
}

.waves-background .circle:nth-child(3) {
  width: 53px;
  height: 50px;
  left: 90%;
  animation-delay: 4s;
}

.waves-background .circle:nth-child(4) {
  width: 53px;
  height: 50px;
  left: 60%;
  animation-delay: 18s;
}

.waves-background .circle:nth-child(5) {
  width: 43px;
  height: 40px;
  left: 90%;
  animation-delay: 1s;
}

/* 上升动画 */
@keyframes rise {
  0% {
    bottom: -100px;
    transform: translateX(0) rotate(0deg);
    opacity: 0.15;
  }

  50% {
    transform: translate(100px, 0) rotate(180deg);
    opacity: 0.15;
  }

  100% {
    bottom: 1080px;
    transform: translateX(-200px) rotate(360deg);
    opacity: 0;
  }
}


.bloglo-darkmode-container{
  margin-top: 6px;
}
/* 调整主题切换图标大小 */
.bloglo-darkmode {
  transform: scale(1.5);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* 隐藏原生 checkbox */
.bloglo-darkmode input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}



.bloglo-darkmode:active .bloglo-darkmode-toogle {
  transform: scale(0.9);
}



/* ==================== 登录页面容器 ==================== */
.login-page-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff9f3;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* 深色模式背景 */
[data-theme="dark"] .login-page-wrapper {
  background: #333333;
}


/* ==================== 登录卡片 ==================== */
.login-card {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  padding: 40px 50px;
  box-shadow: 0 20px 60px rgba(252, 102, 104, 0.15);
  width: 100%;
  max-width: 450px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 1;
  position: relative;
  border: 1px solid rgba(252, 102, 104, 0.1);
  backdrop-filter: blur(20px);
}

.login-card:hover {
  box-shadow: 0 25px 70px rgba(252, 102, 104, 0.2);
}

/* 深色模式卡片 */
[data-theme="dark"] .login-card {
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border-color: rgba(190, 190, 190, 0.2);
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
  gap: 10px;
  margin-bottom: 10px;
}

.login-title {
  font-size: 28px;
  font-weight: 700;
  color: #333333;
  margin: 0;
  transition: color 0.3s ease;
}

[data-theme="dark"] .login-title {
  color: #ffffff;
}

.login-subtitle {
  color: #94979e;
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
  color: #333333;
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
  border: 2px solid #ffe7d2;
  border-radius: 12px;
  font-size: 15px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  box-sizing: border-box;
  outline: none;
  background: rgba(255, 255, 255, 0.9);
  color: #212121;
  -webkit-tap-highlight-color: transparent;
}

[data-theme="dark"] .custom-input {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
  color: #ffffff;
}

.custom-input::placeholder {
  color: #b2bec3;
}

[data-theme="dark"] .custom-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.custom-input:focus {
  border-color: #fc6668;
  box-shadow: 0 0 0 3px rgba(252, 102, 104, 0.1);
}

[data-theme="dark"] .custom-input:focus {
  border-color: #fc6668;
  box-shadow: 0 0 0 3px rgba(252, 102, 104, 0.2);
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
  color: #94979e;
  cursor: pointer;
  font-size: 16px;
  padding: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

[data-theme="dark"] .toggle-password {
  color: rgba(255, 255, 255, 0.5);
}

.toggle-password:hover {
  color: #fc6668;
}

[data-theme="dark"] .toggle-password:hover {
  color: #fc6668;
}

@media (hover: none) {
  .toggle-password:hover {
    color: #94979e;
  }
  [data-theme="dark"] .toggle-password:hover {
    color: rgba(255, 255, 255, 0.5);
  }
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
  color: #94979e;
  cursor: pointer;
  transition: color 0.3s ease;
  -webkit-tap-highlight-color: transparent;
}

[data-theme="dark"] .remember-me {
  color: rgba(255, 255, 255, 0.7);
}

.remember-me input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  border: 2px solid #ffe7d2;
  border-radius: 3px;
  background-color: #fff;
  cursor: pointer;
  position: relative;
  transition: background 0.2s ease, border-color 0.2s ease;
  flex-shrink: 0;
  margin: 0;
  -webkit-tap-highlight-color: transparent;
}

.remember-me input[type="checkbox"]:hover {
  border-color: #fc6668;
}

.remember-me input[type="checkbox"]:checked {
  background: #fc6668;
  border-color: #fc6668;
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

[data-theme="dark"] .remember-me input[type="checkbox"] {
  border-color: rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .remember-me input[type="checkbox"]:hover {
  border-color: #fc6668;
  background-color: rgba(255, 255, 255, 0.15);
}

[data-theme="dark"] .remember-me input[type="checkbox"]:checked {
  background: #fc6668;
  border-color: #fc6668;
}

.forgot-password {
  color: #fc6668;
  text-decoration: none;
  transition: color 0.2s ease;
  font-weight: 500;
  -webkit-tap-highlight-color: transparent;
}

[data-theme="dark"] .forgot-password {
  color: #fc6668;
}

.forgot-password:hover {
  text-decoration: underline;
  color: #ff4c60;
}

/* ==================== 登录按钮 ==================== */
.login-btn {
  width: 100%;
  padding: 14px;
  background: #fc6668;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  box-shadow: 0 4px 15px rgba(252, 102, 104, 0.3);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(252, 102, 104, 0.4);
  background: #ff4c60;
}

.login-btn:active {
  transform: translateY(0);
}

[data-theme="dark"] .login-btn {
  background: #fc6668;
  box-shadow: 0 4px 15px rgba(252, 102, 104, 0.4);
}

[data-theme="dark"] .login-btn:hover {
  box-shadow: 0 6px 20px rgba(252, 102, 104, 0.5);
  background: #ff4c60;
}

@media (hover: none) {
  .login-btn:hover {
    transform: none;
  }
}

/* ==================== 分割线 ==================== */
.divider {
  text-align: center;
  margin: 25px 0 20px;
  position: relative;
  color: #b2bec3;
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
  background: #ffe7d2;
  z-index: 1;
}

[data-theme="dark"] .divider:before {
  background: rgba(255, 255, 255, 0.15);
}

.divider span {
  background: rgba(255, 255, 255, 0.85);
  position: relative;
  z-index: 2;

}

[data-theme="dark"] .divider span {
  background: rgba(0, 0, 0, 0.5);
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
  border: 2px solid #ffe7d2;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

[data-theme="dark"] .social-btn {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
  color: #ffffff;
}

.social-btn:hover {
  border-color: #fc6668;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(252, 102, 104, 0.2);
}

[data-theme="dark"] .social-btn:hover {
  border-color: #fc6668;
  box-shadow: 0 4px 12px rgba(252, 102, 104, 0.3);
}

@media (hover: none) {
  .social-btn:hover {
    transform: none;
  }
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
  color: #94979e;
  font-size: 14px;
  transition: color 0.3s ease;
}

[data-theme="dark"] .register-link {
  color: rgba(255, 255, 255, 0.7);
}

.register-link a {
  color: #fc6668;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

[data-theme="dark"] .register-link a {
  color: #fc6668;
}

.register-link a:hover {
  text-decoration: underline;
  color: #ff4c60;
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
  
  .login-page-wrapper {
    background: #fff9f3;
  }
  
  [data-theme="dark"] .login-page-wrapper {
    background: #333333;
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

@media (max-width: 768px) {
  .login-btn,
  .social-btn,
  .toggle-password {
    will-change: transform;
  }
}

</style>