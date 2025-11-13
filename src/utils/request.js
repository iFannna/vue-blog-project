import axios from "axios";
import router from "../router";
import { refreshTokenApi } from "@/api/refresh"
import { ElMessage } from "element-plus";

// 创建axios实例对象
const request = axios.create({
  baseURL: "/api",
  timeout: 600000,
});

// axios的请求 request 拦截器
request.interceptors.request.use(
  (config) => {
    // 从localStorage获取登录用户信息
    const loginUser = JSON.parse(localStorage.getItem("loginUser")) || {};
    // 设置Authorization请求头
    if (loginUser.token) {
      // 格式：Bearer + 空格 + token
      config.headers.Authorization = `Bearer ${loginUser.token}`;
    }
    return config;
  },
  (error) => {
    // 错误处理
    return Promise.reject(error);
  }
);

// axios的响应 response 拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      // 服务器响应401（未授权，Token过期等）
      if (error.response.status === 401) {
        // 防止刷新token的请求本身返回401导致无限循环
        if (error.config.url === '/refresh-token') {
          localStorage.removeItem("loginUser");
          router.push("/login");
          ElMessage.error("登录超时，请重新登录");
          return Promise.reject(error);
        }

        // 尝试刷新token
        return refreshTokenApi()
          .then(refreshRes => {
            // 刷新成功
            if (refreshRes.code === 1) {
              // 更新localStorage中的token
              const loginUser = JSON.parse(localStorage.getItem("loginUser")) || {};
              loginUser.token = refreshRes.data; 
              localStorage.setItem("loginUser", JSON.stringify(loginUser));

              // 更新Authorization请求头
              error.config.headers.Authorization = `Bearer ${refreshRes.data}`;

              // 重新发送原请求
              return request(error.config);
            } else {
              throw new Error("刷新token失败");
            }
          })
          .catch(refreshError => {
            // 刷新token失败
            localStorage.removeItem("loginUser");
            router.push("/login");
            ElMessage.error("登录超时，请重新登录");
            return Promise.reject(refreshError);
          });
      } else {
        ElMessage.error(`服务异常，状态码：${error.response.status}`);
      }
    } else if (error.request) {
      // 请求发出去但未收到响应
      ElMessage.error("请求超时或网络错误，请检查网络连接");
    } else {
      ElMessage.error(`请求配置错误：${error.message}`);
    }
    return Promise.reject(error);
  }
);
export default request;