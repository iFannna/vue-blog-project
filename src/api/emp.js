import request from "@/utils/request";

//查询全部员工
export const queryAllEmp = () => request.get("/emps/list");
// 查询全部数据
export const queryAllApi = () => request.get("/emps");

//查询员工列表数据
export const queryPageApi = (name, gender, begin, end, page, pageSize) =>
  request.get(
    `/emps?name=${name}&gender=${gender}&begin=${begin}&end=${end}&page=${page}&pageSize=${pageSize}`
  );

//新增员工
export const addApi = (emp) => request.post("/emps", emp);
//根据ID查询员工
export const queryInfoApi = (id) => request.get(`/emps/${id}`);
//修改员工
export const updateApi = (emp) => request.put("/emps", emp);
//删除员工
export const deleteApi = (ids) => request.delete(`/emps?ids=${ids}`);
