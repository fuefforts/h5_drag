/**
 *  路由权限相关管理
 * */
import router from '@/router'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import userModel from '@/libs/userModel'
function getUrlParams(key) {
	try {
		let params = window.location.href.split("?")[1].split("&");
		if (params) {
			return params.filter((d) => d.split("=")[0] === key)[0].split("=")[1];
		} else {
			return null;
		}
	} catch (error) {
		console.warn(error);
		return null;
	}
}
router.beforeEach(async (to, from, next) => {
	NProgress.start()
	// 检测是否需要用户登录验证
	if (to.meta.noNeedLogin) {
		next()
		return;
	}
	// 用户登录状态拦截
	let loginStatus = await userModel.checkLoginState();
	if (!loginStatus && !(getUrlParams("userName") && getUrlParams("pwd"))) {
		userModel.goLogin();
		return false;
	}

	//TODO 黄维 根据加载的资源，更新路由meta属性中的title属性，所有的页面title使用route.meta.title
	next()
})

router.afterEach(() => {
	NProgress.done() // 结束Progress
})

