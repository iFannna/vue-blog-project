import request from "@/utils/request";

export const getCategoriesApi = () => request.get('/categories');