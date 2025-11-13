import request from '@/utils/request';

export const sendRegisterCodeApi = (data) => request.post('/send-register-code', data);
