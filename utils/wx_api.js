const http = require('./req/index')
let req = http.req

const testUrl = 'https://www.yexuan.site/logistics/wx_api'

// 获取openid   res 为 wx.login 接口调用获取的值
const getOpenid = (res) => {
	return req.post('/wx/wx', {
			judge: '0',
			appid: 'wx755d37a92190903e',
			secret: 'fe91a08b40b57a9b8bdfdc6485d90b49',
			js_code: res.code,
			grant_type: 'authorization_code'
		})
}

// 获取access_taken
const getAccessTaken = () => {
	return req.post('/wx/wx', {
	    judge: '1',
	    appid: 'wx755d37a92190903e',
	    secret: 'fe91a08b40b57a9b8bdfdc6485d90b49'
	  })
}

module.exports = {
	getOpenid: getOpenid,
	getAccessTaken: getAccessTaken
}
