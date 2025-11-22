<script setup>
// ===================== 导入模块 =====================
import { ref, watch, nextTick, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElDialog } from "element-plus";
import { registerApi, sendRegisterCodeApi } from "@/api/register";

// ===================== 响应式数据定义 =====================
// 注册表单核心数据
let registerForm = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeTerms: false,
  emailVerificationCode: "", // 邮箱验证码
  captchaParams: "" // 阿里云验证码参数
});

// 表单错误提示信息
let registerErrors = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeTerms: "",
  emailVerificationCode: ""
});

// 密码显示状态控制
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// 密码强度相关状态
const strengthMeterClass = ref("strength-meter");
const strengthText = ref("密码强度");

// 验证码对话框与倒计时状态
const dialogVisible = ref(false); 
const countdown = ref(0); 

// 阿里云验证码相关状态
const captcha = ref(null); 
const captchaScriptLoaded = ref(false); 
const captchaVerified = ref(false); // 标记是否已通过首次校验
const savedCaptchaParams = ref(""); // 复用首次校验通过的验证码参数

// 主题切换状态
const isDarkMode = ref(false);

// ===================== 核心实例初始化 =====================
const router = useRouter();

// ===================== 基础工具方法 =====================
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

// ===================== 表单验证方法 =====================
// 用户名验证
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

// 邮箱格式校验
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

// 密码格式校验
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

// 校验两次密码是否一致
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

// 校验是否同意服务条款
const validateAgreeTerms = () => {
  const { agreeTerms } = registerForm.value;
  if (!agreeTerms) {
    registerErrors.value.agreeTerms = "请阅读并同意服务条款和隐私政策";
    return false;
  }
  registerErrors.value.agreeTerms = "";
  return true;
};

// 邮箱验证码验证
const validateEmailCode = () => {
  const { emailVerificationCode } = registerForm.value;
  if (!emailVerificationCode) {
    registerErrors.value.emailVerificationCode = "请输入邮箱验证码";
    return false;
  }
  registerErrors.value.emailVerificationCode = "";
  return true;
};

// ===================== 阿里云验证码相关方法 =====================
// 初始化阿里云验证码
const initCaptcha = () => {
  if (window.initAliyunCaptcha && captcha.value === null) {
    window.initAliyunCaptcha({
      SceneId: "1h222nka", 
      mode: "popup",
      element: "#register-captcha-element",
      success: async (captchaVerifyParam) => {
        // 保存首次校验的状态和参数
        captchaVerified.value = true;
        savedCaptchaParams.value = captchaVerifyParam;
        registerForm.value.captchaParams = captchaVerifyParam;
        await sendRegisterCode();
      },
      fail: function (result) {
        ElMessage.error("安全验证失败，请重试");
      },
      getInstance: function (instance) {
        captcha.value = instance;
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
      captchaScriptLoaded.value = true;
    };
    script.onerror = () => {
      ElMessage.error('验证码加载失败，请刷新页面重试');
    };
    document.head.appendChild(script);
  } else {
    captchaScriptLoaded.value = true;
  }
};

// 重置阿里云校验状态（如切换邮箱时调用）
const resetCaptchaState = () => {
  captchaVerified.value = false;
  savedCaptchaParams.value = "";
  registerForm.value.captchaParams = "";
};

// 手动触发阿里云验证码校验
const triggerCaptchaVerify = async () => {
  // 倒计时未结束则直接返回
  if (countdown.value > 0) return;
  // 先校验邮箱格式
  if (!validateEmail()) return;

  // 已通过首次校验，直接复用参数发送验证码
  if (captchaVerified.value) {
    registerForm.value.captchaParams = savedCaptchaParams.value;
    await sendRegisterCode();
    return;
  }

  // 未通过校验，触发阿里云滑块校验
  if (captcha.value) {
    // 调用阿里云验证码实例的显示方法（可选择verify/popup）
    captcha.value.show(); 
  } else {
    ElMessage.warning("验证码组件加载中，请稍候");
    // 重新初始化并延迟触发
    initCaptcha();
    setTimeout(() => {
      captcha.value?.show();
    }, 300);
  }
};

// ===================== 验证码发送与倒计时 =====================
// 发送邮箱验证码
const sendRegisterCode = async () => {
  try {
    if (!validateEmail()) {
      return;
    }
    // 优先使用保存的校验参数，保证复用
    const requestParams = {
      email: registerForm.value.email,
      captchaParams: savedCaptchaParams.value || registerForm.value.captchaParams
    };
    
    const response = await sendRegisterCodeApi(requestParams);
    
    if (response.code) {
      ElMessage.success(response.msg || "验证码已发送至邮箱，5分钟内有效");
      startCountdown();
    } else {
      ElMessage.error(response.msg || "验证码发送失败");
    }
  } catch (error) {
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

// ===================== 注册业务操作 =====================
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
    ElMessage.error("注册失败，请检查网络连接");
  }
};

// ===================== 主题切换相关 =====================
// 主题切换函数 - 圆形扩散动画
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

// ===================== 页面导航 =====================
// 前往登录页
const goToLogin = () => {
  router.push("/login");
};

// ===================== 监听器 =====================
// 监听邮箱变化，重置校验状态（邮箱变更后需重新校验）
watch(() => registerForm.value.email, () => {
  resetCaptchaState();
});

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
      // 如需每次打开对话框都重新校验，可取消下方注释
      // resetCaptchaState();
    }
  }
});

// ===================== 生命周期钩子 =====================
// 页面挂载时初始化
onMounted(() => {
  loadCaptchaScript();
  
  // 初始化主题
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
  <div class="register-page-wrapper">
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

    <!-- 注册卡片 -->
    <div class="register-card">
      <!-- 卡片头部 -->
      <div class="register-header">
        <!-- 标题和主题切换图标容器 -->
        <div class="title-with-theme">
          <!-- 主题切换图标 -->
          <div class="bloglo-header-widgets">
            <div class="bloglo-header-widget bloglo-header-widget__darkmode">
              <div class="bloglo-darkmode-container">
                <div class="bloglo-widget-wrapper">
                  <label
                    class="bloglo-darkmode"
                    for="register-darkswitch"
                    tabindex="0"
                    @click="toggleTheme"
                  >
                    <input
                      type="checkbox"
                      id="register-darkswitch"
                      :checked="isDarkMode"
                      :class="{ active: isDarkMode }"
                    />
                    <div class="bloglo-darkmode-toogle"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
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
          <label class="remember-me">
            <input
              type="checkbox"
              v-model="registerForm.agreeTerms"
              @change="validateAgreeTerms"
            />
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
      :width="440"
      :close-on-click-modal="true"
      :show-close=false
      center
      draggable
      class="verification-dialog"
    >
      <div class="dialog-content">
        <div class="dialog-icon">
          <i class="fas fa-envelope"></i>
        </div>
        
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
            @click="triggerCaptchaVerify"
          >
            {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
          </button>
        </div>
        
        <div class="error-message" v-if="registerErrors.emailVerificationCode">
          {{ registerErrors.emailVerificationCode }}
        </div>
      </div>
      
      <template #footer>
        <div class="dialog-footer">
          <button class="dialog-btn cancel-btn" @click="dialogVisible = false">
            取消
          </button>
          <button class="dialog-btn confirm-btn" @click="submitRegister">
            确认注册
          </button>
        </div>
      </template>
    </ElDialog>
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

.bloglo-darkmode-container {
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

/* ==================== 注册页面容器 ==================== */
.register-page-wrapper {
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
[data-theme="dark"] .register-page-wrapper {
  background: #333333;
}

/* ==================== 注册卡片 ==================== */
.register-card {
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

.register-card:hover {
  box-shadow: 0 25px 70px rgba(252, 102, 104, 0.2);
}

/* 深色模式卡片 */
[data-theme="dark"] .register-card {
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border-color: rgba(190, 190, 190, 0.2);
}

/* ==================== 卡片头部 ==================== */
.register-header {
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

.register-subtitle {
  color: #94979e;
  font-size: 14px;
  margin: 0;
  transition: color 0.3s ease;
}

[data-theme="dark"] .register-subtitle {
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

/* ==================== 条款同意 ==================== */
.terms-agreement {
  margin-bottom: 25px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #94979e;
  cursor: pointer;
  transition: color 0.3s ease;
  font-size: 14px;
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

.terms-agreement a {
  color: #fc6668;
  text-decoration: none;
  transition: color 0.2s ease;
  font-weight: 500;
  -webkit-tap-highlight-color: transparent;
}

[data-theme="dark"] .terms-agreement a {
  color: #fc6668;
}

.terms-agreement a:hover {
  text-decoration: underline;
  color: #ff4c60;
}

/* ==================== 注册按钮 ==================== */
.register-btn {
  width: 100%;
  padding: 14px;
  margin-bottom: 20px;
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

.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(252, 102, 104, 0.4);
  background: #ff4c60;
}

.register-btn:active {
  transform: translateY(0);
}

[data-theme="dark"] .register-btn {
  background: #fc6668;
  box-shadow: 0 4px 15px rgba(252, 102, 104, 0.4);
}

[data-theme="dark"] .register-btn:hover {
  box-shadow: 0 6px 20px rgba(252, 102, 104, 0.5);
  background: #ff4c60;
}

@media (hover: none) {
  .register-btn:hover {
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

/* ==================== 前往登录链接 ==================== */
.login-link {
  text-align: center;
  color: #94979e;
  font-size: 14px;
  transition: color 0.3s ease;
}

[data-theme="dark"] .login-link {
  color: rgba(255, 255, 255, 0.7);
}

.login-link a {
  color: #fc6668;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

[data-theme="dark"] .login-link a {
  color: #fc6668;
}

.login-link a:hover {
  text-decoration: underline;
  color: #ff4c60;
}

/* ==================== 密码强度检测 ==================== */
.password-strength {
  margin-top: 8px;
  height: 4px;
  border-radius: 2px;
  background: #ffe7d2;
  overflow: hidden;
}

[data-theme="dark"] .password-strength {
  background: rgba(255, 255, 255, 0.15);
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
  color: #94979e;
}

[data-theme="dark"] .strength-text {
  color: rgba(255, 255, 255, 0.5);
}

/* ==================== 错误提示样式 ==================== */
.error-message {
  color: #ff4757;
  font-size: 13px;
  margin-top: 5px;
  line-height: 1.4;
  min-height: 17px;
}

/* ==================== 验证码对话框样式（优化版） ==================== */
:deep(.verification-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

:deep(.verification-dialog .el-dialog__header) {
  background: linear-gradient(135deg, #fc6668 0%, #ff8a80 100%);
  padding: 20px;
  margin: 0;
  text-align: center;
}

:deep(.verification-dialog .el-dialog__title) {
  color: white;
  font-size: 20px;
  font-weight: 600;
}

:deep(.verification-dialog .el-dialog__body) {
  padding: 30px;
  background: white;
}

:deep(.verification-dialog .el-dialog__footer) {
  padding: 0 30px 30px;
  background: white;
}

[data-theme="dark"] :deep(.verification-dialog .el-dialog__body) {
  background: #2a2a2a;
}

[data-theme="dark"] :deep(.verification-dialog .el-dialog__footer) {
  background: #2a2a2a;
}

.dialog-content {
  text-align: center;
}

.dialog-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #fc6668 0%, #ff8a80 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: white;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(252, 102, 104, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(252, 102, 104, 0);
  }
}

.dialog-tip {
  font-size: 14px;
  color: #666;
  margin: 10px 0 5px;
}

[data-theme="dark"] .dialog-tip {
  color: rgba(255, 255, 255, 0.7);
}

.dialog-email {
  font-size: 16px;
  font-weight: 600;
  color: #fc6668;
  margin: 5px 0;
}

.dialog-hint {
  font-size: 12px;
  color: #999;
  margin: 5px 0 25px;
}

[data-theme="dark"] .dialog-hint {
  color: rgba(255, 255, 255, 0.5);
}

.verification-input-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  align-items: stretch;
}

.verification-input {
  flex: 1;
  padding: 12px 0px;
  border: 2px solid #ffe7d2;
  border-radius: 10px;
  font-size: 12px;
  text-align: center;
  letter-spacing: 4px;
  font-weight: 600;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  min-height: 4.5rem !important;
}

.verification-input:focus {
  outline: none;
  border-color: #fc6668;
  box-shadow: 0 0 0 3px rgba(252, 102, 104, 0.1);
}

[data-theme="dark"] .verification-input {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

[data-theme="dark"] .verification-input:focus {
  border-color: #fc6668;
  background: rgba(255, 255, 255, 0.15);
}

.get-code-btn {
  padding: 0px 20px;
  background: linear-gradient(135deg, #fc6668 0%, #ff8a80 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.get-code-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(252, 102, 104, 0.4);
}

.get-code-btn:disabled {
  background: #ddd;
  cursor: not-allowed;
  transform: none;
}

[data-theme="dark"] .get-code-btn:disabled {
  background: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.5);
}

.dialog-footer {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.dialog-btn {
  padding: 12px 30px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  min-width: 100px;
}

.cancel-btn {
  background: #f5f5f5;
  color: #666;
}

.cancel-btn:hover {
  background: #e8e8e8;
  transform: translateY(-2px);
}

[data-theme="dark"] .cancel-btn {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

[data-theme="dark"] .cancel-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

.confirm-btn {
  background: linear-gradient(135deg, #fc6668 0%, #ff8a80 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(252, 102, 104, 0.3);
}

.confirm-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(252, 102, 104, 0.4);
}

/* ==================== 响应式设计 ==================== */
@media (max-width: 768px) {
  .register-card {
    padding: 30px 25px;
    max-width: 100%;
  }

  .register-title {
    font-size: 24px;
  }
  
  .register-page-wrapper {
    background: #fff9f3;
  }
  
  [data-theme="dark"] .register-page-wrapper {
    background: #333333;
  }
}

@media (max-width: 480px) {
  .register-card {
    padding: 25px 20px;
    border-radius: 16px;
  }
}

@media (max-width: 768px) {
  .register-btn,
  .toggle-password {
    will-change: transform;
  }
}
</style>