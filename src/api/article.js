import request from "@/utils/request";

// 分页查询文章信息
export const queryArticlePageApi = (
  page, 
  pageSize, 
  type = "", 
  categoryId = "", 
  tagId = "", 
  authorName = "", 
  title = "", 
  begin = "", 
  end = ""
) => {
  // 拼接URL时过滤空值
  const params = [
    `page=${page}`,
    `pageSize=${pageSize}`,
    type && `type=${type}`,
    categoryId && `categoryId=${categoryId}`,
    tagId && `tagId=${tagId}`,
    authorName && `authorName=${authorName}`,
    title && `title=${title}`,
    begin && `begin=${begin}`,
    end && `end=${end}`
  ].filter(Boolean).join("&"); // 过滤掉false值，再拼接

  return request.get(`/articles?${params}`);
};

// 根据id查询文章信息
export const getArticleByIdApi = (id) => request.get(`/articles/${id}`);

// 根据id批量删除文章信息
export const deleteArticlesByIdApi = (ids) => request.delete(`/articles?ids=${ids}`);

// 新增文章信息
export const addArticleApi = (data) => request.post("/articles", data);

// 获取热门文章信息
export const getHotArticlesApi = () => request.get("/articles/hot");

// 获取点赞较多的文章信息
export const getMostLikeArticlesApi = () => request.get("/articles/mostLike");

// 获取收藏较多的文章信息
export const getMostStarArticlesApi = () => request.get("/articles/mostStar");

// 获取分享较多的文章信息
export const getMostShareArticlesApi = () => request.get("/articles/mostShare");
