import Request from './request'
import conf from '../config'
import store from '../../store/index.js'

export const req = new Request();
/* 设置全局配置 */
req.setConfig((config) => {
	// config.baseUrl = 'http://127.0.0.1:11130';
	// config.baseUrl = 'https://jisu.yexuan.site/api'; 
	config.baseUrl = conf.host
	config.header = { 
		edition: conf.edition,	// 请求头添加 应用版本信息
	}
	return config
})
/* 请求之前拦截器 */
req.interceptor.request((config) => {
	// user_id、token无登录态时值为 -1
	const uid = store.state.user.id || -1;
	const token = store.state.token || -1;
	// console.log(uid,token)
	config.header = { 
		...config.header,	
		uid,					// 请求头添加 uid
		token					// 请求头添加 token
	}
	return config;
})
/* 请求之后拦截器 */
req.interceptor.response((response) => { 
	return response;
})

export default { req }
