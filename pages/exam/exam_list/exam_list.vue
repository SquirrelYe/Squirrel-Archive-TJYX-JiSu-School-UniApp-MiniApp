<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular="true" duration="400">
				<swiper-item class="swiper-item" :key="index">  <!--  v-for="(item, index) in imgList" -->
					<view class="image-wrapper"><image :src="host+'/'+item.logo" class="loaded" lazy-load mode="aspectFill"></image></view>
				</swiper-item>
			</swiper>
		</view>

		<view class="introduce-section">
			<text class="title">{{item.title}}</text>
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{item.price}}</text>
			</view>
			<!-- <view class="bot-row">
				<text>销量: 108</text>
				<text>库存: 4690</text>
				<view class="share-btn text-red" @click="share">
					分享 <text class="yticon icon-share text-red"></text>
				</view>
			</view> -->
		</view>

		<view class="c-list">
			<view class="c-row b-b">
				<text class="tit">服务</text>
				<view class="bz-list con">
					<text>金牌服务 ·</text>
					<text>校园大使 ·</text>
					<text>放心购买</text>
				</view>
			</view>
		</view>

		<!-- 评价 -->
		<view class="eva-section" v-if="callbackNumber == 0">
			<view class="e-header">
				<text class="tit">评价</text>
				<text>(暂无评价)</text>
				<text class="tip">没有更多了</text>
			</view>
		</view>
		<view class="eva-section" @click="toCallBack()" v-else>
			<view class="e-header">
				<text class="tit">评价</text>
				<text>({{callbackNumber}})</text>
				<text class="tip">查看更多</text>
				<text class="yticon icon-you"></text>
			</view>
			<view class="eva-box"  v-for="(item,index) in callbackList" :key="index">
				<image class="portrait" :src="item.user.info.avatarUrl" mode="aspectFill"></image>
				<view class="right">
					<text class="name">{{item.user.name}}</text>
					<text class="con">{{item.callback}}</text>
					<view class="bot">
						<text class="attr">购买类型：{{item.eitem.name}}</text>
						<text class="time">{{item.date}}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="detail-desc">
			<view class="d-header"><text>图文详情</text></view>
			<rich-text >
				<div style="width:100%">
					<img style="width:100%;display:block;" :src="host+'/'+item.detail" />
				</div>				
			</rich-text>
		</view>

		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-xiatubiao--copy"></text>
				<text>首页</text>
			</navigator>
			<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-gouwuche"></text>
				<text>购物车</text>
			</navigator>
			<view class="p-b-btn" :class="{ active: favorite }" @click="toFavorite">
				<text class="yticon icon-shoucang"></text>
				<text>收藏</text>
			</view>

			<view class="action-btn-group">
				<button type="primary" class=" action-btn no-border buy-now-btn" @click="buy">立即购买</button>
				<button type="primary" class=" action-btn no-border add-cart-btn" @click="toCart">加入购物车</button>
			</view>
		</view>

		<!-- 分享 -->
		<share ref="share" :contentHeight="580" :shareList="shareList"></share>
	</view>
</template>

<script>
import share from '@/components/share';
import { mapState } from 'vuex';
export default {
	components: { share },
	data() {
		return {
			host:'',
			favorite: false,
			item:{},
			shareList: [],
			callbackNumber:null,
			callbackList:[],
			fid:null,  // 收藏信息
			// 图文详情  <rich-text :nodes="desc"></rich-text>
			desc: `
					<div style="width:100%">
						<img style="width:100%;display:block;" :src="host+'/'+item.detail" />
					</div>
				`
		};
	},
	computed: { ...mapState(['user']) },
	async onLoad(options) {
		this.host = this.$host
		let uid = this.user.id
		//接收传值  包含judge=1 的为首页面传过来的值,不包含则为列表页面传递（减少访问请求，减轻服务器压力）
		if(options.judge == 1){
			let id = options.id;
			let exam = await this.$apis.eitem.findOneById(id);
			var call = await this.$apis.cart.findExamCallBack(id,0,1)
			var fav = await this.$apis.favorite.findExam(uid,id)
			this.item = exam.data
		}else{
			this.item = JSON.parse(options.item)
			var call = await this.$apis.cart.findExamCallBack(this.item.id,0,1)
			var fav = await this.$apis.favorite.findExam(uid,this.item.id)
		}
		this.callbackNumber = call.data.count || 0
		this.callbackList = call.data.rows.filter(item=>{ item = Object.assign(item, this.orderTimeExp(item.updated_at)); return item; });	
		console.log('考试项目',this.item,'评价清单',this.callbackList,'收藏',fav.data)
		this.shareList = await this.$api.json('shareList');  // 载入分享		
		fav.data ? this.favorite = true:this.favorite = false;		// 判断收藏显示
		fav.data ? this.fid = fav.data.id: this.fid =null;		// 暂存收藏信息
	},
	methods: {
		//分享
		share() { this.$refs.share.toggleMask(); },
		//收藏
		async toFavorite() {
			let eid = this.item.id
			let uid = this.user.id
			uni.showLoading({ title:'收藏中，请稍后^_^' })			
			if(this.favorite){   // 已经加入收藏，删除
				let delFav = await this.$apis.favorite.delete(this.fid)
				uni.showToast({ title:'取消成功~', icon:'success' })
				console.log('删除',delFav.data)
			}else{		// 未加入收藏，添加
				let addFav = await this.$apis.favorite.createExam(0,eid,uid)
				this.fid = addFav.data.id
				uni.showToast({ title:'收藏成功~', icon:'success' })
				console.log('添加',addFav)
			}
			this.favorite = !this.favorite; 
		},
		// 购买
		buy() {
			let data = JSON.stringify(this.item)
			let obj = JSON.stringify({ number: 1,price:this.item.price,other:null })
			// 支付类别 支付类别 0、资金充值、1、发布代取快递，2、快递代发、3、考试下单、4、旅游下单，5、水果下单
			uni.navigateTo({ url: `/pages/order/createOrder?kind=0&type=3&data=${data}&other=${obj}` })
		},
		// 加入购物车
		async toCart() {
			uni.showLoading()
			let ecart = await this.$apis.cart.createExamCart(this.user.id,0,1,this.item.price,this.item.id,0,0)   // u,t,n,p,e,c,j
			console.log(ecart.data)
			if(ecart.data){
				// 延时显示
				let _this = this
				setTimeout(function(){
					uni.hideLoading();
					_this.$api.msg('加入购物车成功~');
					// uni.switchTab({ url:'../../cart/cart' })
				},600)
			}
		},
		// 评价
		toCallBack(){ uni.navigateTo({ url:`../exam_callback/exam_callback?id=${this.item.id}` }) },
		//时间格式化
		orderTimeExp(time){
			let tmp = time.split('T')
			let date = tmp[0] + '  '+ tmp[1].split(':')[0]+ ':' + tmp[1].split(':')[1]
			return {date};
		}
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
	padding-bottom: 160upx;
}
.icon-you {
	font-size: $font-base + 2upx;
	color: #888;
}
.carousel {
	height: 722upx;
	position: relative;
	swiper {
		height: 100%;
	}
	.image-wrapper {
		width: 100%;
		height: 100%;
	}
	.swiper-item {
		display: flex;
		justify-content: center;
		align-content: center;
		height: 750upx;
		overflow: hidden;
		image {
			width: 100%;
			height: 100%;
		}
	}
}

/* 标题简介 */
.introduce-section {
	background: #fff;
	padding: 20upx 30upx;

	.title {
		font-size: 32upx;
		color: $font-color-dark;
		height: 50upx;
		line-height: 50upx;
	}
	.price-box {
		display: flex;
		align-items: baseline;
		height: 64upx;
		padding: 10upx 0;
		font-size: 26upx;
		color: $uni-color-primary;
	}
	.price {
		font-size: $font-lg + 2upx;
	}
	.m-price {
		margin: 0 12upx;
		color: $font-color-light;
		text-decoration: line-through;
	}
	.coupon-tip {
		align-items: center;
		padding: 4upx 10upx;
		background: $uni-color-primary;
		font-size: $font-sm;
		color: #fff;
		border-radius: 6upx;
		line-height: 1;
		transform: translateY(-4upx);
	}
	.bot-row {
		display: flex;
		align-items: center;
		height: 50upx;
		font-size: $font-sm;
		color: $font-color-light;
		text {
			flex: 1;
		}
	}
}
/* 分享 */
.share-section {
	display: flex;
	align-items: center;
	color: $font-color-base;
	background: linear-gradient(left, #fdf5f6, #fbebf6);
	padding: 12upx 30upx;
	.share-icon {
		display: flex;
		align-items: center;
		width: 70upx;
		height: 30upx;
		line-height: 1;
		border: 1px solid $uni-color-primary;
		border-radius: 4upx;
		position: relative;
		overflow: hidden;
		font-size: 22upx;
		color: $uni-color-primary;
		&:after {
			content: '';
			width: 50upx;
			height: 50upx;
			border-radius: 50%;
			left: -20upx;
			top: -12upx;
			position: absolute;
			background: $uni-color-primary;
		}
	}
	.icon-xingxing {
		position: relative;
		z-index: 1;
		font-size: 24upx;
		margin-left: 2upx;
		margin-right: 10upx;
		color: #fff;
		line-height: 1;
	}
	.tit {
		font-size: $font-base;
		margin-left: 10upx;
	}
	.icon-bangzhu1 {
		padding: 10upx;
		font-size: 30upx;
		line-height: 1;
	}
	.share-btn {
		flex: 1;
		text-align: right;
		font-size: $font-sm;
		color: $uni-color-primary;
	}
	.icon-you {
		font-size: $font-sm;
		margin-left: 4upx;
		color: $uni-color-primary;
	}
}

.c-list {
	font-size: $font-sm + 2upx;
	color: $font-color-base;
	background: #fff;
	.c-row {
		display: flex;
		align-items: center;
		padding: 20upx 30upx;
		position: relative;
	}
	.tit {
		width: 140upx;
	}
	.con {
		flex: 1;
		color: $font-color-dark;
		.selected-text {
			margin-right: 10upx;
		}
	}
	.bz-list {
		height: 40upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		text {
			display: inline-block;
			margin-right: 30upx;
		}
	}
	.con-list {
		flex: 1;
		display: flex;
		flex-direction: column;
		color: $font-color-dark;
		line-height: 40upx;
	}
	.red {
		color: $uni-color-primary;
	}
}

/* 评价 */
.eva-section {
	display: flex;
	flex-direction: column;
	padding: 20upx 30upx;
	background: #fff;
	margin-top: 16upx;
	.e-header {
		display: flex;
		align-items: center;
		height: 70upx;
		font-size: $font-sm + 2upx;
		color: $font-color-light;
		.tit {
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right: 4upx;
		}
		.tip {
			flex: 1;
			text-align: right;
		}
		.icon-you {
			margin-left: 10upx;
		}
	}
}
.eva-box {
	display: flex;
	padding: 20upx 0;
	.portrait {
		flex-shrink: 0;
		width: 80upx;
		height: 80upx;
		border-radius: 100px;
	}
	.right {
		flex: 1;
		display: flex;
		flex-direction: column;
		font-size: $font-base;
		color: $font-color-base;
		padding-left: 26upx;
		.con {
			font-size: $font-base;
			color: $font-color-dark;
			padding: 20upx 0;
		}
		.bot {
			display: flex;
			justify-content: space-between;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
}
/*  详情 */
.detail-desc {
	background: #fff;
	margin-top: 16upx;
	.d-header {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80upx;
		font-size: $font-base + 2upx;
		color: $font-color-dark;
		position: relative;

		text {
			padding: 0 20upx;
			background: #fff;
			position: relative;
			z-index: 1;
		}
		&:after {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translateX(-50%);
			width: 300upx;
			height: 0;
			content: '';
			border-bottom: 1px solid #ccc;
		}
	}
}

/* 底部操作菜单 */
.page-bottom {
	position: fixed;
	left: 30upx;
	bottom: 30upx;
	z-index: 95;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 690upx;
	height: 100upx;
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.5);
	border-radius: 16upx;

	.p-b-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: $font-sm;
		color: $font-color-base;
		width: 96upx;
		height: 80upx;
		.yticon {
			font-size: 40upx;
			line-height: 48upx;
			color: $font-color-light;
		}
		&.active,
		&.active .yticon {
			color: $uni-color-primary;
		}
		.icon-fenxiang2 {
			font-size: 42upx;
			transform: translateY(-2upx);
		}
		.icon-shoucang {
			font-size: 46upx;
		}
	}
	.action-btn-group {
		display: flex;
		height: 76upx;
		border-radius: 100px;
		overflow: hidden;
		box-shadow: 0 20upx 40upx -16upx #fa436a;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
		background: linear-gradient(to right, #ffac30, #fa436a, #f56c6c);
		margin-left: 20upx;
		position: relative;
		&:after {
			content: '';
			position: absolute;
			top: 50%;
			right: 50%;
			transform: translateY(-50%);
			height: 28upx;
			width: 0;
			border-right: 1px solid rgba(255, 255, 255, 0.5);
		}
		.action-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 180upx;
			height: 100%;
			font-size: $font-base;
			padding: 0;
			border-radius: 0;
			background: transparent;
		}
	}
}
</style>
