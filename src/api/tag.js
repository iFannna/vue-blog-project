import request from "@/utils/request";

export const getTagsApi = () => request.get('/tags');