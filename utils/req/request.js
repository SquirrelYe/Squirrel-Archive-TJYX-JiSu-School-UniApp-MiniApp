import store from '../../store/index'
import conf from '../config.js'
// JWT
import jwt from '../../node_modules/jsonwebtoken/index.js'

export default class Request {
	constructor(arg) { this.request(arg) }
	config = {
		baseUrl: '',
		header: {
			'Content-Type': 'application/json;charset=UTF-8'
		},
		method: 'GET',
		dataType: 'json',
		responseType: 'text',
		success() {},
		fail() {},
		complete() {}
	}
	/* 判断url是否为绝对路径 */
	static posUrl(url) {
		return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
	}
	interceptor = {
		request(f) { if (f) { Request.requestBeforeFun = f } },
		response(f) { if (f) { Request.requestComFun = f } }
	}
	static requestBeforeFun(config) { return config }
	static requestComFun(response) { return response }
	setConfig(f) { this.config = f(this.config) }
	
	request(options = {}) {
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = Request.posUrl(options.url) ? options.url : (options.baseUrl + options.url)
		options.data = options.data || {},
		options.header = options.header || this.config.header
		options.method = options.method || this.config.method
		return new Promise((resolve, reject) => {
			let _config = null

			options.complete = (response) => {
				let statusCode = response.statusCode
				response.config = _config
				response = Request.requestComFun(response)
				// 成功
				if (statusCode === 200) { resolve(response) } 
				// 状态码 250 用户另一处代登录，被迫下线
				else if (statusCode === 250) { this.toLogin() }
				else if (statusCode === 431) { this.tokenErr() }
				else if (statusCode === 251) { this.redisError() }
				else { reject(response) }
			}
			let afC = { ...this.config, ...options }
			_config = { ...afC, ...Request.requestBeforeFun(afC) }
			uni.request(_config)
		})
	}
	// GET 请求
	get(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	}
	// POST 请求
	post(url, data, options = {}) {
		options.url = url
		// 针对请求的数据进行 sha-256 加密
		let encrp = jwt.sign(data , conf.interface ,{ expiresIn:'10s'});
		options.data = { 'data' : encrp }
		options.method = 'POST'
		return this.request(options)
	}
	// --------------------- 状态码响应方法 --------------------------------
	// 250 --> 单一登录 to login
	toLogin(){
		uni.showModal({
			title:'被迫下线',
			content:'用户在另一处登录',
			complete() {
				// 清除缓存
				store.commit('logout')
				uni.clearStorage()
				// 重定向
				uni.redirectTo({ url:"/pages/public/login" })
			}
		})
	}
	// 431 --> token失效
	tokenErr(){
		uni.showModal({
			title:'被迫下线',
			content:'登录状态失效',
			complete() {
				// 清除缓存
				store.commit('logout')
				uni.clearStorage()
				// 重定向
				uni.redirectTo({ url:"/pages/public/login" })
			}
		})
	}
	// 251 --> redis服务器出现错误
	redisError(){
		uni.showModal({
			title: '服务器出错',
			content: '请等待程序猿哥哥修复~',
			complete: () => {
				// 清除缓存
				uni.clearStorage()
				// 重定向
				uni.redirectTo({ url:"/pages/public/login" })
			}
		});
	}
}
