import request from '@/utils/request';

// 注册
export const registerApi = (data) => request.post('/register', data);

// 发送注册验证码
export const sendRegisterCodeApi = (data) => request.post('/send-register-code', data);