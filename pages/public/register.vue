<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">REGISTER</view>
			<view class="welcome">
				欢迎注册！
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input 
						type="number" 
						placeholder="请输入手机号码"
						maxlength="11"
						v-model="mobile"
						@input="phoneChange()"
					/>
				</view>
				<!-- 输入验证码 -->
				<view class="input-item" v-show="judgeCode && !judgePhone">
						<text class="tit">验证码</text>
						<input 
							type="text" 
							placeholder="请输入收到的手机验证码"
							placeholder-class="input-empty"
							v-model="virifycode"
						/>
					</view>
				<!-- 短信验证成功 -->
				<view v-show="judgePhone">					
					<view class="input-item">
						<text class="tit">密码</text>
						<input 
							type="mobile" 
							placeholder="6-16位不含特殊字符的数字、字母组合"
							placeholder-class="input-empty"
							maxlength="20"
							password 
							v-model="password"
						/>
					</view>
					<view class="input-item">
						<text class="tit">学校</text>
						<picker @change="PickerChange" :value="index" :range="school" >
							<view class="picker">
								{{index>-1?school[index]:'选择学校'}}
							</view>
						</picker>
					</view>
				</view>
			</view>
			<button class="confirm-btn" :disabled="coding" v-if="canIUse && !judgeCode" @click="toCode">发送验证码</button>
			<button class="confirm-btn" :disabled="coding" v-if="canIUse && judgeCode && !judgePhone" @click="toVerify">验证验证码</button>
			<button class="confirm-btn" :disabled="logining" v-if="canIUse && judgePhone" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="toRegister">注册</button>
		</view>
		<view class="register-section">
			 注册即同意
			<text @tap="law" data-target="law">用户条款</text>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapState } from 'vuex';
	import apis from '../../utils/apis.js'
	import wx_api from '../../utils/wx_api.js'
	
	export default{
		data(){
			return {
				canIUse: uni.canIUse('button.open-type.getUserInfo'),
				isGetUserInfo :false,
				code:'',	// 验证码
				
				judgeCode:false,	// 判断短信发送状态
				judgePhone:false,	// 判断验证码状态
				mobile: '',
				virifycode:'',
				password: '',
				school:'',
				logining: false,
				
				index: -1,
				school: [],
				schoolObj:{},
				userinfo:'',
				openid: null,
				AccessTaken: null,
			}
		},
		computed:{ ...mapState(['userInfo'])},
		onLoad(){
			let _this = this
			// 获取 openid
			wx.login({
			  complete: function (res) {
				if (res.code) {
				  console.log("JS_CODE\t------>\t" + res.code);
				  wx_api.getOpenid(res).then(res=>{ console.log('获取openid', res.data) ; _this.openid = res.data.openid })
				  wx_api.getAccessTaken().then(res => { console.log('获取access_taken', res.data); _this.AccessTaken = res.data.access_token })
				}
				else { console.log('登录失败！' + res.errMsg) }
			  }
			})
			// 查看是否授权
			wx.getSetting({
			  success (res){
				if (res.authSetting['scope.userInfo']) {
				  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
				  wx.getUserInfo({
					success: function(res) {
					  console.log(res.userInfo)
					  _this.userinfo = res.userInfo
					}
				  })
				}
			  }
			}) 
			// 获取学校列表
			apis.school.findAndCountAllOnlyName()
			.then(res=>{
				console.log('获取学校列表',res.data)
				let item = []
				for (let i = 0; i < res.data.rows.length; i++) {
					item.push(res.data.rows[i].name)
				}
				_this.schoolObj = res.data.rows
				_this.school = item
			})
		},
		methods: {
			...mapMutations(['getInfo']),			
			navBack(){ uni.navigateBack(); },
			// 获取用户信息
			bindGetUserInfo(e) { console.log(e.detail.userInfo); this.userinfo = e.detail.userInfo },
			// 选择学校
			PickerChange(e) { this.index = e.detail.value },
			// 电话号码更改
			phoneChange(){
				this.password = '';
				this.virifycode = '';
				this.judgeCode = false;
				this.judgePhone = false;
			},
			async toRegister(){
				let _this = this
				// 查看是否授权
				wx.getSetting({
				  success (res){
					if (res.authSetting['scope.userInfo']) {
						_this.submit()
					}else{
						_this.$api.msg('不能拒绝我喔~')
					}
				  }
				}) 
			},
			// 发送验证码
			async toCode(){
				var code=""; 
				for(let i=0;i<6;i++) { code+=Math.floor(Math.random()*10); } 
				this.code = code
				console.log('发送验证码',this.code)
				uni.showLoading({ title:'发送中，请稍等哈~' })
				// 调用短信接口
				let msg = await this.$msg_api.sendRegisterCode(this.mobile,this.code)
				console.log('调用短信接口--->',msg.data)
				if(msg.data.code != 0){ this.$api.msg('验证码发送失败~'); return; }
				this.$api.msg('验证信息发送成功！');
				this.judgeCode = true
				
				// 测试微信支付
				// let openid = this.openid
				// let productIntro = '腾讯充值中心-QQ会员充值'
				// let price = 0.01
				// // 生成签名
				// let sign = await wx_api.getPaySign(openid, productIntro, price)
				// if(sign.statusCode != 200) { this.$api.msg('调用支付接口失败，请检查'); return; }	
				// // 调用支付
				// wx_api.toPay(sign,(judge,res)=>{
				// 	if(judge != 1){ this.$api.msg('支付失败啦~'); return; }
				// 	this.$api.msg('支付成功啦~');
				// 	console.log('sign-->',sign,'callback-->',judge,res)
				// 	// 写入交易
				// })
				
				// 测试新用户优惠券
				// let school_id = 4;
				// let tic = await this.$apis.uticket.findOneBySchoolConditionType(school_id,0,0);   // sid,condition,type
				// const { id } = tic.data;
				// let user_id = 43;
				// let newUserTic = await this.$apis.uticket.newerGetTicket(user_id,id,0)	// uid,tid,c
				// console.log(tic,newUserTic)
				
			},
			// 验证验证码
			toVerify(){
				console.log(this.virifycode)
				if(this.code != this.virifycode){ this.$api.msg('验证输入有误喔~'); return;}
				this.judgePhone = true;				
			},
			// 注册信息提交
			async submit(){
				const {userinfo, mobile, password ,schoolObj ,index, openid, AccessTaken} = this;
				// 校验
				if(!openid) this.$api.msg('获取唯一识别码失败') ;
				else if ( !this.$regex.phoneP.test(mobile)) this.$api.msg('电话号码不合法') ;
				else if ( !this.$regex.passP.test(password)) this.$api.msg('密码不合法') ;
				else if ( index == -1 ) this.$api.msg('未选择学校') ;
				else {
					console.log(userinfo, mobile, password, index, schoolObj[index],openid,AccessTaken)							
					// 调用注册接口
					let user = await apis.user.cusCreate(mobile,openid,userinfo.nickName,password, schoolObj[index].id)
					if(user.data[1]){
						// 初始化资产信息
						let stock = await apis.stock.create(user.data[0].id,0,0,0)  // u,m,s,c
						// 获取新用户优惠券
						let tic = await this.$apis.uticket.findOneBySchoolConditionType(schoolObj[index].id,0,0);   // sid,condition,type
						const { id } = tic.data;
						let newUserTic = await this.$apis.uticket.newerGetTicket(user.data[0].id,id,0)	// uid,tid,c
						console.log(tic,newUserTic)
						// 上传微信信息
						let u = this.userinfo;
						let info = await apis.info.creat(user.data[0].id, u.nickName, u.avatarUrl, u.gender, u.province, u.city, u.country)
						if(info.statusCode === 200){
							// 保存用户数据到 vuex
							// this.getInfo(info.data);
							console.log('vuex',this.userInfo)
							this.$api.msg('注册成功') ;
							this.logining = true;
							uni.navigateBack();  
						}else{
							this.$api.msg('注册失败，请联系客服');
							this.logining = false;
						}
					}else this.$api.msg('电话号码被占用')	
				}
			},
			// 用户条款
			law(e){ uni.navigateTo({ url:"law/law?judge=0" })}
		},

	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		padding-top: 115px;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}	
	}

	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}
	.register-section{
		position:absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>
