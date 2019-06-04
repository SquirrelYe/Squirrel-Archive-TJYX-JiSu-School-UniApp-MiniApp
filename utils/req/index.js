import Request from './request'
export const req = new Request();
/* 设置全局配置 */
req.setConfig((config) => {
	config.baseUrl = 'http://127.0.0.1:11130';
	// config.baseUrl = 'https://jisu.yexuan.site/api';
	config.header = { a: 1 }
	return config
})
/* 请求之前拦截器 */
req.interceptor.request((config) => { 
	config.header = { b: 2, ...config.header }
	return config;
})
/* 请求之后拦截器 */
req.interceptor.response((response) => { 
	return response;
})

export default { req }
