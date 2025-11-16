<script setup>
import { ref, watch, nextTick, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElDialog } from "element-plus";
import { registerApi } from "@/api/register";
import { sendRegisterCodeApi } from "@/api/email";

// 注册表单数据
let registerForm = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeTerms: false,
  emailVerificationCode: "", // 邮箱验证码
  captchaParams: "" // 阿里云验证码参数
});

// 错误提示信息
let registerErrors = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeTerms: "",
  emailVerificationCode: ""
});

// 密码显示状态
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// 密码强度相关状态
const strengthMeterClass = ref("strength-meter");
const strengthText = ref("密码强度");

// 对话框相关状态
const dialogVisible = ref(false); // 验证码对话框显示状态
const countdown = ref(0); // 倒计时秒数
const captcha = ref(null); // 验证码实例
const captchaScriptLoaded = ref(false); // 验证码脚本加载状态

const router = useRouter();

// 切换密码显示/隐藏
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

// 密码强度检测
const checkPasswordStrength = (password) => {
  strengthMeterClass.value = "strength-meter";
  if (password.length === 0) {
    strengthText.value = "密码强度";
    return;
  }

  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  if (strength <= 2) {
    strengthMeterClass.value = "strength-meter strength-weak";
    strengthText.value = "密码强度：弱";
  } else if (strength <= 4) {
    strengthMeterClass.value = "strength-meter strength-medium";
    strengthText.value = "密码强度：中";
  } else {
    strengthMeterClass.value = "strength-meter strength-strong";
    strengthText.value = "密码强度：强";
  }
};

// 表单验证函数
const validateUsername = () => {
  const { username } = registerForm.value;
  if (!username) {
    registerErrors.value.username = "请输入用户名";
    return false;
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    registerErrors.value.username = "用户名只能包含英文字母和数字";
    return false;
  }
  if (username.length < 6 || username.length > 12) {
    registerErrors.value.username = "用户名长度必须在6-12位之间";
    return false;
  }
  registerErrors.value.username = "";
  return true;
};

const validateEmail = () => {
  const { email } = registerForm.value;
  if (!email) {
    registerErrors.value.email = "请输入邮箱地址";
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    registerErrors.value.email = "请输入有效的邮箱地址";
    return false;
  }
  registerErrors.value.email = "";
  return true;
};

const validatePassword = () => {
  const { password } = registerForm.value;
  
  if (!password) {
    registerErrors.value.password = "请输入密码";
    return false;
  }
  
  if (password.length < 6 || password.length > 18) {
    registerErrors.value.password = "密码长度必须在6-18位之间";
    return false;
  }
  
  const allowedCharsRegex = /^[@#$%&*a-zA-Z0-9]+$/;
  if (!allowedCharsRegex.test(password)) {
    registerErrors.value.password = "密码只能包含字母、数字及 @#$%&*";
    return false;
  }
  
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  if (!hasLetter || !hasDigit) {
    registerErrors.value.password = "密码必须包含至少一个字母和一个数字";
    return false;
  }
  
  checkPasswordStrength(password);
  registerErrors.value.password = "";
  return true;
};

const validateConfirmPassword = () => {
  const { password, confirmPassword } = registerForm.value;
  if (!confirmPassword) {
    registerErrors.value.confirmPassword = "请再次输入密码";
    return false;
  }
  if (password !== confirmPassword) {
    registerErrors.value.confirmPassword = "两次输入的密码不一致";
    return false;
  }
  registerErrors.value.confirmPassword = "";
  return true;
};

const validateAgreeTerms = () => {
  const { agreeTerms } = registerForm.value;
  if (!agreeTerms) {
    registerErrors.value.agreeTerms = "请阅读并同意服务条款和隐私政策";
    return false;
  }
  registerErrors.value.agreeTerms = "";
  return true;
};

const validateEmailCode = () => {
  const { emailVerificationCode } = registerForm.value;
  if (!emailVerificationCode) {
    registerErrors.value.emailVerificationCode = "请输入邮箱验证码";
    return false;
  }
  registerErrors.value.emailVerificationCode = "";
  return true;
};

// 初始化阿里云验证码
const initCaptcha = () => {
  if (window.initAliyunCaptcha && captcha.value === null) {
    window.initAliyunCaptcha({
      SceneId: "1h222nka", // 替换为你的实际SceneId
      mode: "popup",
      element: "#register-captcha-element",
      button: "#get-code-button", // 与按钮id匹配
      success: async (captchaVerifyParam) => {
        console.log('验证码验证成功', captchaVerifyParam);
        registerForm.value.captchaParams = captchaVerifyParam;
        await sendRegisterCode();
      },
      fail: function (result) {
        console.error('验证码验证失败', result);
        ElMessage.error("安全验证失败，请重试");
      },
      getInstance: function (instance) {
        captcha.value = instance;
        console.log('验证码实例初始化成功');
      },
      slideStyle: {
        width: 360,
        height: 40,
      }
    });
  } else if (!window.initAliyunCaptcha) {
    // 若脚本未加载完成，延迟重试
    setTimeout(initCaptcha, 100);
  }
};

// 加载阿里云验证码脚本
const loadCaptchaScript = () => {
  if (!document.querySelector('script[src*="AliyunCaptcha.js"]')) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://o.alicdn.com/captcha-frontend/aliyunCaptcha/AliyunCaptcha.js';
    script.onload = () => {
      console.log('阿里云验证码JS加载完成');
      captchaScriptLoaded.value = true;
    };
    script.onerror = () => {
      console.error('阿里云验证码JS加载失败');
      ElMessage.error('验证码加载失败，请刷新页面重试');
    };
    document.head.appendChild(script);
  } else {
    captchaScriptLoaded.value = true;
  }
};

// 发送邮箱验证码
const sendRegisterCode = async () => {
  try {
    if (!validateEmail()) {
      return;
    }
    
    const response = await sendRegisterCodeApi({
      email: registerForm.value.email,
      captchaParams: registerForm.value.captchaParams
    });
    
    if (response.code) {
      ElMessage.success(response.msg || "验证码已发送至邮箱，5分钟内有效");
      startCountdown();
    } else {
      ElMessage.error(response.msg || "验证码发送失败");
    }
  } catch (error) {
    console.error("发送验证码错误:", error);
    ElMessage.error("发送验证码失败，请稍后重试");
  }
};

// 开始倒计时
const startCountdown = () => {
  countdown.value = 60;
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);
};

// 打开验证码对话框
const openVerificationDialog = () => {
  const isUsernameValid = validateUsername();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();
  const isAgreeTermsValid = validateAgreeTerms();

  if (!(isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isAgreeTermsValid)) {
    return;
  }
  
  dialogVisible.value = true;
};

// 提交注册
const submitRegister = async () => {
  if (!validateEmailCode()) {
    return;
  }
  
  try {
    const response = await registerApi(registerForm.value);
    
    if (response.code) {
      ElMessage.success("注册成功！即将跳转到登录页面");
      dialogVisible.value = false;
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } else {
      ElMessage.error(response.msg || "注册失败，请稍后重试");
    }
  } catch (error) {
    console.error("注册错误:", error);
    ElMessage.error("注册失败，请检查网络连接");
  }
};

// 第三方注册提示
const socialRegister = (platform) => {
  ElMessage.info(`${platform}注册功能即将开放！`);
};

// 页面导航
const goToHome = () => {
  router.push("/home");
};
const goToLogin = () => {
  router.push("/login");
};

// 监听对话框显示状态，动态初始化/销毁验证码
watch(() => dialogVisible.value, async (newVal) => {
  if (newVal) {
    // 确保验证码脚本已加载
    if (!captchaScriptLoaded.value) {
      loadCaptchaScript();
    }
    // 等待DOM更新完成
    await nextTick();
    // 初始化验证码
    initCaptcha();
  } else {
    // 销毁验证码实例
    if (captcha.value) {
      captcha.value.destroy();
      captcha.value = null;
    }
  }
});

// 页面加载时预加载验证码脚本
onMounted(() => {
  loadCaptchaScript();
});
</script>

<template>
  <div class="register-container">
    <!-- 返回首页按钮 -->
    <div class="return-button">
      <button class="return-btn" @click="goToHome">返回首页</button>
    </div>

    <!-- 注册卡片 -->
    <div class="register-card">
      <!-- 卡片头部 -->
      <div class="register-header">
        <div class="register-logo">
          <i class="fas fa-palette"></i>
          <span class="register-logo-text">创图AI</span>
        </div>
        <h1 class="register-title">加入创图AI</h1>
        <p class="register-subtitle">注册账户，开启您的创意之旅</p>
      </div>

      <!-- 阿里云验证码预留元素 -->
      <div id="register-captcha-element" style="display: none;"></div>
      
      <!-- 注册表单 -->
      <form @submit.prevent="openVerificationDialog">
        <!-- 用户名输入 -->
        <div class="form-group">
          <label class="form-label">用户名</label>
          <div class="custom-input-wrapper">
            <input
              type="text"
              v-model="registerForm.username"
              placeholder="请输入6-12位字母或数字"
              class="custom-input"
              @blur="validateUsername"
              @input="validateUsername"
              maxlength="12"
            >
          </div>
          <div class="error-message" v-if="registerErrors.username">
            {{ registerErrors.username }}
          </div>
        </div>

        <!-- 邮箱输入 -->
        <div class="form-group">
          <label class="form-label">邮箱地址</label>
          <div class="custom-input-wrapper">
            <input
              type="email"
              v-model="registerForm.email"
              placeholder="请输入邮箱地址"
              class="custom-input"
              @blur="validateEmail"
              @input="validateEmail"
            >
          </div>
          <div class="error-message" v-if="registerErrors.email">
            {{ registerErrors.email }}
          </div>
        </div>

        <!-- 密码输入（带强度检测） -->
        <div class="form-group">
          <label class="form-label">密码</label>
          <div class="custom-input-wrapper password-input">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="registerForm.password"
              @input="checkPasswordStrength(registerForm.password); validatePassword()"
              @blur="validatePassword"
              placeholder="请输入密码"
              class="custom-input"
              maxlength="18"
            >
            <button
              type="button"
              class="toggle-password"
              @click="togglePassword"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          <!-- 密码强度条 -->
          <div class="password-strength">
            <div :class="strengthMeterClass"></div>
          </div>
          <!-- 强度文本提示 -->
          <div class="strength-text">{{ strengthText }}</div>
          <div class="error-message" v-if="registerErrors.password">
            {{ registerErrors.password }}
          </div>
        </div>

        <!-- 确认密码输入 -->
        <div class="form-group">
          <label class="form-label">确认密码</label>
          <div class="custom-input-wrapper password-input">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="registerForm.confirmPassword"
              @input="validateConfirmPassword"
              @blur="validateConfirmPassword"
              placeholder="请再次输入密码"
              class="custom-input"
              maxlength="18"
            >
            <button
              type="button"
              class="toggle-password"
              @click="toggleConfirmPassword"
            >
              <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          <div class="error-message" v-if="registerErrors.confirmPassword">
            {{ registerErrors.confirmPassword }}
          </div>
        </div>

        <!-- 条款同意 -->
        <div class="terms-agreement">
          <input
            type="checkbox"
            id="terms"
            v-model="registerForm.agreeTerms"
            @change="validateAgreeTerms"
          >
          <label for="terms">
            我已阅读并同意
            <a href="#" @click.prevent>服务条款</a>
            和
            <a href="#" @click.prevent>隐私政策</a>
          </label>
          <div class="error-message" v-if="registerErrors.agreeTerms">
            {{ registerErrors.agreeTerms }}
          </div>
        </div>

        <!-- 注册按钮 -->
        <button type="submit" class="register-btn">注册</button>

        <!-- 分割线 -->
        <div class="divider">
          <span>或使用以下方式注册</span>
        </div>

        <!-- 社交注册 -->
        <div class="social-register">
          <button
            type="button"
            class="social-btn wechat"
            @click="socialRegister('微信')"
          >
            <i class="fab fa-weixin"></i> 微信
          </button>
          <button
            type="button"
            class="social-btn qq"
            @click="socialRegister('QQ')"
          >
            <i class="fab fa-qq"></i> QQ
          </button>
        </div>

        <!-- 前往登录 -->
        <div class="login-link">
          已有账户？
          <a href="#" @click.prevent="goToLogin">立即登录</a>
        </div>
      </form>
    </div>

    <!-- 邮箱验证码对话框 -->
    <ElDialog
      v-model="dialogVisible"
      title="邮箱验证"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      class="verification-dialog"
    >
      <div class="dialog-content">
        <p>请输入发送到 {{ registerForm.email }} 的验证码</p>
        
        <div class="verification-input-group">
          <input
            type="text"
            v-model="registerForm.emailVerificationCode"
            placeholder="请输入6位验证码"
            class="verification-input"
            @input="validateEmailCode"
            maxlength="6"
          >
          <button
            id="get-code-button"
            class="get-code-btn"
            :disabled="countdown > 0"
          >
            {{ countdown > 0 ? `${countdown}s后重新获取` : '获取验证码' }}
          </button>
        </div>
        
        <div class="error-message" v-if="registerErrors.emailVerificationCode">
          {{ registerErrors.emailVerificationCode }}
        </div>
      </div>
      
      <template #footer>
        <button class="dialog-btn cancel-btn" @click="dialogVisible = false">
          取消
        </button>
        <button class="dialog-btn confirm-btn" @click="submitRegister">
          注册
        </button>
      </template>
    </ElDialog>
  </div>
</template>

<style scoped>
/* 全局背景与布局 */
.register-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
}

/* 返回按钮 */
.return-button {
  position: absolute;
  left: 20px;
  top: 20px;
}
.return-btn {
  padding: 10px 20px;
  border: 2px solid #e7e8f0;
  border-radius: 5px;
  background: transparent;
  color: #aeb9eb;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}
.return-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

/* 注册卡片 */
.register-card {
  background: #fff;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
}

/* 卡片头部 */
.register-header {
  text-align: center;
  margin-bottom: 40px;
}
.register-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}
.register-logo i {
  font-size: 32px;
  color: #667eea;
}
.register-logo-text {
  font-size: 28px;
  font-weight: bold;
  color: #333;
}
.register-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
  margin-top: 0;
}
.register-subtitle {
  color: #666;
  font-size: 14px;
  margin: 0;
}

/* 表单组 */
.form-group {
  margin-bottom: 25px;
}
.form-label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
  font-size: 14px;
}

/* 自定义输入框 */
.custom-input-wrapper {
  position: relative;
  width: 100%;
}
.custom-input {
  width: 100%;
  padding: 15px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  box-sizing: border-box;
  outline: none;
  background: transparent;
}
.custom-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
.custom-input.error {
  border-color: #ff4757;
}

/* 密码输入框 */
.password-input .custom-input {
  padding-right: 45px !important;
}
.toggle-password {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
}

/* 条款同意 */
.terms-agreement {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 25px;
  font-size: 14px;
  color: #666;
  flex-wrap: wrap;
}
.terms-agreement input {
  margin-top: 2px;
  cursor: pointer;
}
.terms-agreement a {
  color: #667eea;
  text-decoration: none;
}
.terms-agreement a:hover {
  text-decoration: underline;
}

/* 注册按钮 */
.register-btn {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 25px;
}
.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

/* 分割线 */
.divider {
  text-align: center;
  margin: 25px 0;
  position: relative;
  color: #666;
  font-size: 14px;
}
.divider:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e1e5e9;
  z-index: 1;
}
.divider span {
  background: #fff;
  padding: 0 15px;
  position: relative;
  z-index: 2;
}

/* 社交注册按钮 */
.social-register {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 30px;
}
.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 600;
}
.social-btn:hover {
  border-color: #667eea;
  transform: translateY(-1px);
}
.social-btn.wechat {
  color: #09bb07;
}
.social-btn.qq {
  color: #12b7f5;
}

/* 前往登录链接 */
.login-link {
  text-align: center;
  color: #666;
  font-size: 14px;
}
.login-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}
.login-link a:hover {
  text-decoration: underline;
}

/* 密码强度检测 */
.password-strength {
  margin-top: 8px;
  height: 4px;
  border-radius: 2px;
  background: #e1e5e9;
  overflow: hidden;
}
.strength-meter {
  height: 100%;
  width: 0;
  transition: all 0.3s ease;
}
.strength-weak {
  background: #ff4757;
  width: 33%;
}
.strength-medium {
  background: #ffa502;
  width: 66%;
}
.strength-strong {
  background: #2ed573;
  width: 100%;
}
.strength-text {
  font-size: 13px;
  margin-top: 5px;
  color: #666;
}

/* 错误提示样式 */
.error-message {
  color: #ff4757;
  font-size: 13px;
  margin-top: 5px;
  line-height: 1.4;
  min-height: 17px;
}

/* 验证码对话框样式 */
.verification-dialog {
  --el-dialog-width: 400px;
}
.dialog-content {
  padding: 10px 0;
}
.dialog-content p {
  color: #666;
  margin-bottom: 20px;
  font-size: 14px;
}
.verification-input-group {
  display: flex;
  gap: 10px;
  align-items: center;
}
.verification-input {
  flex: 1;
  padding: 12px 15px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
}
.verification-input:focus {
  border-color: #667eea;
}
.get-code-btn {
  padding: 12px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap;
}
.get-code-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.get-code-btn:hover:not(:disabled) {
  background: #556cd6;
}
.dialog-btn {
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}
.cancel-btn {
  background: #f5f5f5;
  color: #666;
  border: none;
  margin-right: 10px;
}
.cancel-btn:hover {
  background: #e8e8e8;
}
.confirm-btn {
  background: #667eea;
  color: white;
  border: none;
}
.confirm-btn:hover {
  background: #556cd6;
}
</style>