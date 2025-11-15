<script setup>
import { ref } from "vue";
import { loginApi } from "@/api/login";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

let loginForm = ref({ 
  account: "", 
  password: "",
  rememberMe: false
});
const showPassword = ref(false);
const router = useRouter();

// 登录逻辑
const doLogin = async () => {
  try {
    const result = await loginApi(loginForm.value);
    if (result.code) {
      ElMessage.success("登录成功");
      localStorage.setItem("loginUser", JSON.stringify(result.data));
      router.push("/index");
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
  router.push("/home");
};
</script>

<template>

    
    <div class="login-card">
      <div class="login-header">
        <h1 class="login-title">欢迎回来</h1>
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
            >
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
            >
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
            <input 
              type="checkbox" 
              v-model="loginForm.rememberMe"
            > 记住我
          </label>
          <a href="#" class="forgot-password" @click.prevent="forgotPassword">忘记密码？</a>
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
</template>

<style scoped>
/* 登录卡片 */
.login-card {
  background: #fff;
  border-radius: 20px;
  padding: 30px 50px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
}

/* 卡片头部 */
.login-header {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
}

.login-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
  margin-top: 0;
}
.login-subtitle {
  color: #666;
  font-size: 14px;
  margin: 0;
}

/* 表单组 */
.form-group {
  margin-bottom: 10px;
}
.form-label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
  font-size: 14px;
}

/* 自定义输入框*/
.custom-input-wrapper {
  position: relative;
  width: 100%;
}
.custom-input {
  width: 100%;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  box-sizing: border-box;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
}
.custom-input::-webkit-contacts-auto-fill-button,
.custom-input::-webkit-credentials-auto-fill-button {
  display: none !important;
  visibility: hidden;
  pointer-events: none;
  position: absolute;
  right: 0;
  height: 0;
  width: 0;
}
.custom-input[type="password"],
.custom-input[type="text"] {
  background-image: none !important;
  -webkit-appearance: none !important;
  appearance: none !important;
  padding-right: 40px !important;
}
.custom-input::-webkit-credentials-auto-fill-button,
.custom-input::-webkit-contacts-auto-fill-button,
.custom-input::-webkit-inner-spin-button,
.custom-input::-webkit-outer-spin-button {
  display: none !important;
  visibility: hidden !important;
  width: 0 !important;
  height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}
.custom-input::-ms-reveal,
.custom-input::-ms-clear {
  display: none !important;
  visibility: hidden !important;
}
.custom-input:focus {
  border-color: #7289da;
  box-shadow: 0 0 0 2px rgba(114, 137, 218, 0.2);
}
/* 密码输入框 */
.password-input {
  position: relative;
}
.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 记住我与忘记密码 */
.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
}
.remember-me {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
}
.forgot-password {
  color: #7289da;
  text-decoration: none;
}
.forgot-password:hover {
  text-decoration: underline;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #7289da, #9b6cdc);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}
.login-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(114, 137, 218, 0.3);
  background: linear-gradient(135deg, #677acd, #8c5bc7);
}

/* 分割线 */
.divider {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
  position: relative;
  color: #999;
  font-size: 13px;
}
.divider:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #eee;
  z-index: 1;
}
.divider span {
  background: #fff;
  padding: 0 15px;
  position: relative;
  z-index: 2;
}

/* 社交登录按钮 */
.social-login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 10px;
}
.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}
.social-btn:hover {
  border-color: #7289da;
  transform: translateY(-1px);
}
.social-btn.wechat {
  color: #07c160;
}
.social-btn.qq {
  color: #12b7f5;
}

/* 注册链接 */
.register-link {
  text-align: center;
  color: #666;
  font-size: 14px;
}
.register-link a {
  color: #7289da;
  text-decoration: none;
  font-weight: 600;
}
.register-link a:hover {
  text-decoration: underline;
}
</style>