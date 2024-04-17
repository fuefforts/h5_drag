/*
	用户相关api
**/
import $axios from "@/service/httpServer";
// 登录
export const login = p => $axios.post('/h5-template/quark/auth/login', p);
// 注册
export const register = p => $axios.post('/h5-template/quark/auth/register', p);
// 获取用户信息
export const getUserInfo = () => $axios.get('/h5-template/quark/user/info');
// 修改用户昵称
export const updateNickName = p => $axios.post('/h5-template/quark/user/update/name', p);
// 修改密码
export const updateUserPass = p => $axios.post('/h5-template/quark/user/update/pass', p);
// 修改头像
export const updateUserAvatar = p => $axios.post('/h5-template/quark/user/update/avatar', p);
// 关键字搜索用户列表
export const getUserListByKeywords = p => $axios.get('/h5-template/quark/user/getUserList', p);


