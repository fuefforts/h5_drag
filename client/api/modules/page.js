/*
	页面相关api
**/
import $axios from "@/service/httpServer";
// 获取我的页面列表
export const getMyPages = p => $axios.get('/h5-template/quark/page/getMyPages', p);
// 获取我的页面详情
export const getPageDetail = p => $axios.get('/h5-template/quark/page/detail', p);
// 新增页面
export const createPage = p => $axios.post('/h5-template/quark/page/create', p);
// 更新页面
export const updatePage = p => $axios.post('/h5-template/quark/page/update', p);
// 删除页面
export const deletePage = p => $axios.post('/h5-template/quark/page/delete', p);
// 复制页面
export const copyPage = p => $axios.post('/h5-template/quark/page/copy', p);
// 设置为模板
export const setTemplatePage = p => $axios.post('/h5-template/quark/page/setTemplate', p);
// 发布页面
export const publishPage = p => $axios.post('/h5-template/quark/page/setPublish', p);

/**
 * ========================================================================
 * */
// 获取我的模板
export const getMyTemplates = p => $axios.get('/h5-template/quark/page/getMyTemplates', p);


/**
 * ========================================================================
 * */
// 获取模板市场模板
export const getPublishTemplates = p => $axios.get('/h5-template/quark/page/getPublishTemplates', p);

/**
 * ========================================================================
 * */
// 获取协作人列表
export const getCooperationUserListByPageId = p => $axios.get('/h5-template/quark/page/getCooperationList', p)
// 按userIds添加协作人
export const addCooperation = p => $axios.post('/h5-template/quark/page/addCooperation', p)
// 删除协作人
export const delCooperation = p => $axios.post('/h5-template/quark/page/delCooperation', p)
