/*
* image 图片库
**/
import $axios from "@/service/httpServer";

// 获取我的图片列表
export const getMyImages = p => $axios.get('/h5-template/quark/imageLib/myImages', p);
// 上传图片
export const uploadImage = p => $axios.post('/h5-template/quark/imageLib/upload', p)
export const uploadCommonImage = p => $axios.post('/h5-template/quark/imageCommon/upload', p)
