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
					/>
				</view>
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
			<button class="confirm-btn" :disabled="logining" v-if="canIUse" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="toRegister">注册</button>
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

				mobile: '',
				password: '',
				school:'',
				logining: false,
				
				index: -1,
				school: [],
				schoolObj:{},
				userinfo:'',
				openid: null,
				AccessTaken: null
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
			async toRegister(){
				let _this = this
				// 查看是否授权
				wx.getSetting({
				  success (res){
					if (res.authSetting['scope.userInfo']) {
						const {userinfo, mobile, password ,schoolObj ,index, openid, AccessTaken} = _this;
						// 校验
						if(!openid) _this.$api.msg('获取唯一识别码失败') ;
						else if ( !_this.$regex.phoneP.test(mobile)) _this.$api.msg('电话号码不合法') ;
						else if ( !_this.$regex.passP.test(password)) _this.$api.msg('密码不合法') ;
						else if ( index == -1 ) _this.$api.msg('未选择学校') ;
						else {
							console.log(userinfo, mobile, password, index, schoolObj[index],openid,AccessTaken)							
							// 调用注册接口
							apis.user.cusCreate(mobile,openid,userinfo.nickName,password, schoolObj[index].id)
							.then(res=>{
								console.log(res.data)
								let u = _this.userinfo
								if(res.data[1]){
									// 上传微信信息
									apis.info.creat(res.data[0].id, u.nickName, u.avatarUrl, u.gender, u.province, u.city, u.country)
									.then(res=>{
										console.log(res)
										if(res.statusCode === 200){
											// 保存用户数据到 vuex
											_this.getInfo(res.data);
											console.log('vuex',_this.userInfo)
											_this.$api.msg('注册成功') ;
											_this.logining = true;
											uni.navigateBack();  
										}else{
											_this.$api.msg('注册失败，请联系客服');
											_this.logining = false;
										}
									})
								}else _this.$api.msg('电话号码被占用')			
							})
						}
					}else{
						_this.$api.msg('没有权限')
					}
				  }
				}) 
			}
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
