const http = require('./req/index')
let req = http.req

// const testUrl = 'https://www.yexuan.site/logistics/wx_api'

// 获取openid   res 为 wx.login 接口调用获取的值
const getOpenid = (res) => {
	return req.post('/wx/wx', {
		judge: '0',
		appid: 'wxa61d29a0f35c452b',
		secret: '4a57f21e5d994a66f23607fe97a33699',
		js_code: res.code,
		grant_type: 'authorization_code'
	})
}

// 获取access_taken
const getAccessTaken = () => {
	return req.post('/wx/wx', {
		judge: '1',
		appid: 'wxa61d29a0f35c452b',
		secret: '4a57f21e5d994a66f23607fe97a33699'
	})
}

// 调用微信支付签名
const getPaySign = (openid, productIntro, notifyUrl, price) => {
	return req.post('/wx/wx', {
		judge: '3',
		openid: openid,
		productIntro: productIntro,
		notifyUrl: notifyUrl,
		price: price
	})
}

module.exports = {
	getOpenid: getOpenid,
	getAccessTaken: getAccessTaken,
	getPaySign: getPaySign
}
