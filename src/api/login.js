import request from "@/utils/request";

// 登录
export const loginApi = (data) => request.post("/login",data);

// 刷新token令牌
export const refreshTokenApi = () => request.get('/refresh-token');