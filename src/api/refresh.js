import request from '@/utils/request';

export const refreshTokenApi = () => request.get('/refresh-token');