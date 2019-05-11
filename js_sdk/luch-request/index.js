import Request from './request'
export const test = new Request();
test.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = 'http://www.aaa.cn';
	config.header = {
		a: 1,
		b: 2
	}
	return config
})
test.interceptor.request((config) => { /* 请求之前拦截器 */
	config.header = {
		a: 1,
		...config.header
	}
	return config;
})
test.interceptor.response((response) => { /* 请求之后拦截器 */
	return response;
})

export const http = new Request();
http.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = 'http://www.bbb.cn'; /* 根域名不同 */
	config.header = {
		a: 1,
		b: 2
	}
	return config
})
http.interceptor.request((config) => { /* 请求之前拦截器 */
	config.header = {
		a: 1,
		...config.header
	}
	return config;
})
http.interceptor.response((response) => { /* 请求之后拦截器 */
	console.log(response);
	return response;
})
export default {
	test,
	http
}
