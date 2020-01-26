<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input 
						type="number" 
						:value="mobile" 
						placeholder="请输入手机号码"
						maxlength="11"
						data-key="mobile"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input 
						type="mobile" 
						value="" 
						placeholder="8-18位不含特殊字符的数字、字母组合"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="password"
						@input="inputChange"
						@confirm="toLogin"
					/>
				</view>
			</view>
			<button class="confirm-btn" @click="toLogin" :disabled="logining" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">登录</button>
		</view>
		<view class="register-section">
			还没有账号?
			<text @click="toRegist">马上注册</text>
		</view>
		<view class="forget-section">
			密码忘记了?
			<text @click="toForget">找回密码</text>
		</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex';	
	export default{
		data(){
			return {
				mobile: '',
				password: '',
				logining: false,
				userinfo: ''
			}
		},
		onLoad(){ 
			let _this = this
			// 查看是否授权
			uni.getSetting({
			  success (res){
				if (res.authSetting['scope.userInfo']) {
				  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
				  uni.getUserInfo({
					success: function(res) { _this.userinfo = res.userInfo }
				  })
				}
			  }
			}) 
		},
		methods: {
			...mapMutations(['login']),
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			// 获取用户信息
			bindGetUserInfo(e) { console.log(e.detail.userInfo); this.userinfo = e.detail.userInfo },
			navBack(){ uni.navigateBack(); },
			toRegist(){ uni.navigateTo({url:'/pages/public/register'}) },
			async toLogin(){
				const { mobile, password } = this;
				if(!mobile || !password){ this.$api.msg('不能输入空哦~'); return; }
				uni.showLoading({ title:'正在登录大部队，请稍等哈~',mask:true })
				let that = this
				// 登录
				// 密码转换为 MD5
				let passMd5 = this.$getMd5Encrp(password);
				that.$apis.user.cusLogin(mobile,passMd5)
				.then(res=>{
					if(res.statusCode === 200){
						console.log(res.data)
						const { info,token } = res.data
						let obj = { 'userinfo':info, 'token':token, 'user':res.data}
						that.login(obj);
						that.logining = true;
						uni.switchTab({ url: '/pages/user/user' });
					}
				})
				.catch(err=>{								
					that.$api.msg('账号或密码错误');
					that.logining = false;
				})
				// 查看是否授权
				// uni.getSetting({
				//   success (res){
				// 		if (res.authSetting['scope.userInfo']) {						
				// 			const { userinfo } = that;
				// 		}
				// 	}
				// })
			},
			// 跳转找回密码
			toForget(){ uni.navigateTo({url:'/pages/public/forget'}) },
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
	.register-section{
		position:absolute;
		left: 0;
		bottom: 100upx;
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
