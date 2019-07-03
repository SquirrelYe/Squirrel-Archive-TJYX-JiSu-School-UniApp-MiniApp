import Request from './request'
import edi from 'utils/edition'

export const req = new Request();
/* 设置全局配置 */
req.setConfig((config) => {
	// config.baseUrl = 'http://127.0.0.1:11130';
	// config.baseUrl = 'https://jisu.yexuan.site/api'; 
	config.baseUrl = 'https://www.exiaopin.cn/api';
	config.header = { edition: edi.edition }	// 请求头添加 应用版本信息
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
