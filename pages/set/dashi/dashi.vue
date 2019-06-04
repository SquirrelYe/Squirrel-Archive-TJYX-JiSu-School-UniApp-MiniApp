<template>
	<view class="content">
		<view class="bg-white padding margin-top-xs">
			<view class="cu-steps">
				<view class="cu-item" :class="index > basics ? '' : 'text-orange'" v-for="(item, index) in basicsList" :key="index">
					<text :class="index > basics ? 'cuIcon-title' : 'cuIcon-' + item.icon"></text>
					{{ item.name }}
				</view>
			</view>
		</view>
		<view class="row b-b">
			<text class="tit">姓名</text>
			<input class="input" :disabled="!first" type="text" v-model="authen.name" placeholder="请输入真实姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" :disabled="!first" type="number" v-model="authen.phone" placeholder="请输入手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">学校</text>
			<text @click="chooseLocation" class="input">
				{{user.school.name}}
			</text>
			<text class="yticon icon-shouhuodizhi"></text>
		</view>
		<view class="row b-b">
			<text class="tit">学号</text>
			<input class="input" type="number" :disabled="!first" v-model="authen.xuehao" placeholder="请输入学号" placeholder-class="placeholder" />
		</view>
		<!-- <view class="row b-b"> 
			<text class="tit">宿舍</text>
			<input class="input" type="text" v-model="authen.dom" placeholder="宿舍楼、门牌号" placeholder-class="placeholder" />
		</view> -->
		
		<view class="cu-bar bg-white">
			<view class="action">
				身份认证
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="padding-xs bg-img" :style="[{backgroundImage:'url(' + host+'/'+imgList[index] +')'}]" v-for="(item,index) in imgList"
				 :key="index" @tap="ViewImage" :data-url="host+'/'+imgList[index]">
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index" v-if="first">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="padding-xs solids" @tap="ChooseImage" v-if="imgList.length<2">
					<text class='cuIcon-cameraadd'></text>
				</view>
				<text class="text-xs"  v-if="imgList.length==0">请提交一卡通、学生证、或其他证件信息</text>
			</view>
		</view>
		
		<button class="add-btn" @click="confirm" v-if="first">提交</button>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				host:'',
				isAuthen:false,
				first:true,
				authen: { name: null, phone : null, xuehao: null},
				imgList: [],
				basics: 0,
				basicsList: [
					{ icon: 'usefullfill', name: '未申请' },
					{ icon: 'radioboxfill', name: '已申请' },
					{ icon: 'subscription', name: '待认证' },
					{ icon: 'roundcheckfill', name: '已完成' }
				]
			}
		},
		computed:{
			...mapState(['user'])
		},
		onLoad(){
			this.host = this.$host
			console.log(this.user.authen)
			if(this.user.authen){
				this.first = false;
				// 重新调用登录
				const {phone, pass} = this.user;
				this.$apis.user.cusLogin(phone, pass)
				.then(res=>{
					let obj = { 'token':res.data.token, 'user':res.data}
					console.log(obj)
					this.reLogin(obj);
					
					this.authen = res.data.authen
					this.imgList = [this.authen.card,this.authen.rz_icon]
					if(this.authen.condition === 1) { this.basics = 3;  this.isAuthen = true; }
					else{ this.basics = 2;  this.isAuthen = false; }
				})				
			}else this.first = true;
		},
		methods: {
			...mapMutations(['reLogin']),
			switchChange(e){
				this.authen.default = e.detail;
			},			
			//地图选择地址
			chooseLocation(){
				// if(!this.isAuthen){
				// 	uni.chooseLocation({
				// 		success: (data)=> {
				// 			this.authen.addressName = data.name;
				// 			this.authen.address = data.name;
				// 		}
				// 	})
				// }else{ }
			},			
			//提交
			confirm(){
				console.log(this.imgList.length)
				let data = this.authen;
				if(!data.name){ this.$api.msg('请填写你的姓名'); return; }
				else if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.phone)){ this.$api.msg('请输入正确的手机号码'); return; }
				else if(!data.xuehao){ this.$api.msg('请填写学号信息'); return; }	
				else if(this.imgList.length < 2){ this.$api.msg('请上传学生证和一卡通'); return; }	
				// 提交认证信息
				else {
					console.log(this.user,this.authen , this.imgList)
					this.$apis.authen.creat(this.user.id,data.name,this.user.school_id,data.xuehao,data.phone,this.imgList[0],this.imgList[1])
					.then(res=>{
						console.log(res.data)
						this.$api.msg('认证信息提交成功') ;
						this.first = false;
						// 重新调用登录
						const {phone, pass} = this.user;
						this.$apis.user.cusLogin(phone, pass)
						.then(res=>{
							let obj = { 'token':res.data.token, 'user':res.data}
							console.log(obj)
							this.reLogin(obj);
							setTimeout(()=>{ uni.navigateBack(); },1000) // 返回
						})
					})
				}
			},
			ChooseImage() {
				if(this.imgList.length === 2){
					this.$api.msg('只能提交两张照片')
				}else{
					uni.chooseImage({
					count: 1, // 默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						uni.uploadFile({
							url: 'http://127.0.0.1:11110/upload', //仅为示例，非真实的接口地址
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: { },
							success: (file) => {
								let data = JSON.parse(file.data)
								// let img = `${this.$host}/${data.info}`;
								if(data.status === 1){
									this.imgList.push(data.info)
								}else this.$api.msg('照片上传错误');								
							}
						});						
					}
				});
				}
			},
			ViewImage(e) {
				let arr = []
				for (let img in this.imgList) { arr.push(`${this.host}/${this.imgList[img]}`) }
				uni.previewImage({
					urls: arr,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '确认删除',
					content: '确定要删除这张照片么？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
