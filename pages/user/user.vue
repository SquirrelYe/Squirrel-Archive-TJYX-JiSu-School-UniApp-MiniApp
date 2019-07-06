<template>
	<view class="container">
		<view class="user-section">
			<image class="bg" src="/static/user/back.jpg"></image>
			<view class="user-info-box">
				<view class="portrait-box"><image class="portrait" :src="userInfo.avatarUrl || '/static/missing-face.png'" @click="navTo('/pages/set/set')"></image></view>
				<view class="info-box"> <text class="username">{{ userInfo.nickName || '游客' }}</text> </view>				
			</view>
			<view class="vip-card-box">
				<image class="card-bg" src="/static/vip-card-bg.png" mode="aspectFit"></image>
				<view class="b-btn" @click="navTo('/pages/set/dashi/dashi')" v-if="user.authen.condition == 1">校园大使</view>
				<view class="b-btn" @click="navTo('/pages/set/dashi/dashi')" v-else >立即申请</view>
				<view class="tit">
					<text class="yticon icon-iLinkapp-"></text>
					校园大使
				</view>
				<text class="e-m">校园大使俱乐部</text>
				<text class="e-b">闲暇时间兼职，服务老师同学</text>
			</view>
		</view>

		<view
			class="cover-container"
			:style="[
				{
					transform: coverTransform,
					transition: coverTransition
				}
			]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
		>
			<image class="arc" src="/static/arc.png"></image>

			<view class="tj-sction">
				<view class="tj-item">
					<text class="num">{{ stock.money || 0 }}</text>
					<text>余额</text>
				</view>
				<view class="tj-item">
					<text class="num">{{  ticketCount || 0 }}</text>
					<text>优惠券</text>
				</view>
				<view class="tj-item">
					<text class="num">{{ stock.score || 0 }}</text>
					<text>积分</text>
				</view>
			</view>
			<!-- 订单 -->
			<view class="order-section">
				<view class="order-item" @click="navTo('/pages/order/order?state=0')" hover-class="common-hover" :hover-stay-time="50">
					<text class="yticon icon-shouye"></text>
					<text>全部订单</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=1')" hover-class="common-hover" :hover-stay-time="50">
					<text class="yticon icon-daifukuan"></text>
					<text>待发货</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=2')" hover-class="common-hover" :hover-stay-time="50">
					<text class="yticon icon-yishouhuo"></text>
					<text>待收货</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=3')" hover-class="common-hover" :hover-stay-time="50">
					<text class="yticon icon-shouhoutuikuan"></text>
					<text>待评价</text>
				</view>
			</view>
			<!-- 浏览历史 -->
			<view class="history-section icon">
				<block v-if="hasLogin">
					<view class="sec-header">
						<text class="yticon icon-xingxing"></text>
						<text>我的收藏</text>
					</view>
					<scroll-view scroll-x class="h-list">
						<block v-for="(item,index) in favList" :key='index'>
							<image @longpress="delFav(item)" @tap="navToDetailPage(item)" :src="host+'/'+item.logo" mode="aspectFill"></image>
						</block>
					</scroll-view>
				</block>
				<list-cell icon="icon-iconfontweixin" iconColor="#e07472" title="我的钱包" @eventClick="navTo('/pages/user/wallet/wallet')" tips="你的小金库"></list-cell>
				<list-cell icon="icon-dizhi" iconColor="#5fcda2" title="地址管理" @eventClick="navTo('/pages/address/address')"></list-cell>
				<!-- <list-cell icon="icon-share" iconColor="#9789f7" open-type="share" title="分享" tips="人人为我，我为人人" @eventClick="share()"></list-cell> -->
				<list-cell icon="icon-shezhi1" iconColor="#e07472" title="设置" @eventClick="navTo('/pages/set/set')"></list-cell>
				<list-cell icon="icon-bangzhu" iconColor="#54b4ef" title="联系客服" @eventClick="about()"  open-type="contact" border=""></list-cell>
			</view>
		</view>		
	</view>
</template>
<script>
import listCell from '@/components/mix-list-cell';
import { mapState } from 'vuex';
import conf from '../../utils/config.js'
let startY = 0,
	moveY = 0,
	pageAtTop = true;
export default {
	components: { listCell },
	data() {
		return {
			host:null,
			stock:{},
			ticketCount:0,
			coverTransform: 'translateY(0px)',
			coverTransition: '0s',
			moving: false,
			favList:[]
		};
	},
	computed: { ...mapState(['hasLogin', 'userInfo', 'user']) },
	onLoad() { this.host = this.$host  },
	onShow() { this.getStock(); this.getFav(); this.getTicket() },
	// #ifndef MP
	onNavigationBarButtonTap(e) {
		const index = e.index;
		if (index === 0) {
			this.navTo('/pages/set/set');
		} else if (index === 1) {
			// #ifdef APP-PLUS
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			const currentWebview = page.$getAppWebview();
			currentWebview.hideTitleNViewButtonRedDot({ index });
			// #endif
			uni.navigateTo({ url: '/pages/notice/notice' });
		}
	},
	// #endif
	// 分享
	onShareAppMessage() {
		return {			
			title: 'E校拼',
			path: 'pages/index/index',
			success: function (res) { this.$api.msg('转发成功') },
			fail: function (res) { this.$api.msg('转发失败') }
		}
	},
	methods: {
		// 获取资金信息
		getStock(){ this.$apis.stock.findByUserId(this.user.id).then(res=>{ console.log('账户资金信息',res.data); this.stock = res.data }) },
		// 获取优惠券信息
		async getTicket(){
			let tic = await this.$apis.uticket.findAndCountAllByUser(this.user.id,0,100)
			this.ticketCount = tic.data.count
		},
		// 获取收藏信息
		async getFav(){
			let fList = []
			let fav = await this.$apis.favorite.findAndCountAllByUser(this.user.id)
			fav.data.rows.forEach(item => {
				// 备注：此处的数据未对condition进行过滤
				let type = item.type // 0.考试、1.旅游、2.水果
				let obj = { 'pid': item.id}
				if(type == 0) fList.push(Object.assign(item.eitem,obj)) 
				if(type == 1) fList.push(Object.assign(item.jitem,obj)) 
				if(type == 2) fList.push(Object.assign(item.fitem,obj)) 
			})
			this.favList = fList
			console.log('收藏信息',fav.data,'过滤信息',this.favList)
		},
		/**
		 * 统一跳转接口,拦截未登录路由
		 * navigator标签现在默认没有转场动画，所以用view
		 */
		navTo(url) {
			if (!this.hasLogin) { url = '/pages/public/login'; }
			uni.navigateTo({ url });
		},
		// 分享
		share() { console.log('分享') },
		about(){ uni.makePhoneCall({ phoneNumber:conf.phone }) },
		/**
		 *  会员卡下拉和回弹
		 *  1.关闭bounce避免ios端下拉冲突
		 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
		 *    transition设置0.1秒延迟，让css来过渡这段空窗期
		 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
		 */
		coverTouchstart(e) {
			if (pageAtTop === false) return; 
			this.coverTransition = 'transform .1s linear';
			startY = e.touches[0].clientY;
		},
		coverTouchmove(e) {
			moveY = e.touches[0].clientY;
			let moveDistance = moveY - startY;
			if (moveDistance < 0) { this.moving = false; return; }
			this.moving = true;
			if (moveDistance >= 80 && moveDistance < 100) { moveDistance = 80; }
			if (moveDistance > 0 && moveDistance <= 80) { this.coverTransform = `translateY(${moveDistance}px)`; }
		},
		coverTouchend() {
			if (this.moving === false) { return; }
			this.moving = false;
			this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
			this.coverTransform = 'translateY(0px)';
		},
		// 删除收藏
		delFav(item){
			console.log(item)
			let _this = this
			uni.showModal({
				content: '确定要删除我么~',
				success: (e)=>{
					if(e.confirm){
						_this.$apis.favorite.delete(item.pid)
						.then(res=>{
							if(res.data.affectRows == 1){
								_this.$api.msg('删除成功^_^');
								_this.getFav()
							}else _this.$api.msg('啊哦，删除失败~');
						})
					}
				}
			});
		},
		//详情页
		navToDetailPage(item) {		
			console.log(item)
			// 根据judge ,item 的三级数据的内容判断页面跳转 judge 0、滚动图片，1、大图，2、限时秒杀
			if(item.mexam_id) uni.navigateTo({ url:`../exam/exam_list/exam_list?judge=1&id=${item.id}` })
			if(item.mjourney_id) uni.navigateTo({ url:`../journey/journey_list/journey_list?judge=1&id=${item.id}` })
			if(item.mfruit_id) uni.navigateTo({ url:`../fruit/fruit_list/fruit_list?judge=1&id=${item.id}` })
		}
	}
};
</script>
<style lang="scss">
%flex-center {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
%section {
	display: flex;
	justify-content: space-around;
	align-content: center;
	background: #fff;
	border-radius: 10upx;
}

.user-section {
	height: 520upx;
	padding: 100upx 30upx 0;
	position: relative;
	.bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		filter: blur(1px);
		opacity: 0.7;
	}
}
.user-info-box {
	height: 180upx;
	display: flex;
	align-items: center;
	position: relative;
	z-index: 1;
	.portrait {
		width: 130upx;
		height: 130upx;
		border: 5upx solid #fff;
		border-radius: 50%;
	}
	.username {
		font-size: $font-lg + 6upx;
		color: $font-color-dark;
		margin-left: 20upx;
	}
}

.vip-card-box {
	display: flex;
	flex-direction: column;
	color: #f7d680;
	height: 240upx;
	background: linear-gradient(left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
	border-radius: 16upx 16upx 0 0;
	overflow: hidden;
	position: relative;
	padding: 20upx 24upx;
	.card-bg {
		position: absolute;
		top: 20upx;
		right: 0;
		width: 380upx;
		height: 260upx;
	}
	.b-btn {
		position: absolute;
		right: 20upx;
		top: 16upx;
		width: 132upx;
		height: 40upx;
		text-align: center;
		line-height: 40upx;
		font-size: 22upx;
		color: #36343c;
		border-radius: 20px;
		background: linear-gradient(left, #f9e6af, #ffd465);
		z-index: 1;
	}
	.tit {
		font-size: $font-base + 2upx;
		color: #f7d680;
		margin-bottom: 28upx;
		.yticon {
			color: #f6e5a3;
			margin-right: 16upx;
		}
	}
	.e-b {
		font-size: $font-sm;
		color: #d8cba9;
		margin-top: 10upx;
	}
}
.cover-container {
	background: $page-color-base;
	margin-top: -150upx;
	padding: 0 30upx;
	position: relative;
	background: #f5f5f5;
	padding-bottom: 20upx;
	.arc {
		position: absolute;
		left: 0;
		top: -34upx;
		width: 100%;
		height: 36upx;
	}
}
.tj-sction {
	@extend %section;
	.tj-item {
		@extend %flex-center;
		flex-direction: column;
		height: 140upx;
		font-size: $font-sm;
		color: #75787d;
	}
	.num {
		font-size: $font-lg;
		color: $font-color-dark;
		margin-bottom: 8upx;
	}
}
.order-section {
	@extend %section;
	padding: 28upx 0;
	margin-top: 20upx;
	.order-item {
		@extend %flex-center;
		width: 120upx;
		height: 120upx;
		border-radius: 10upx;
		font-size: $font-sm;
		color: $font-color-dark;
	}
	.yticon {
		font-size: 48upx;
		margin-bottom: 18upx;
		color: #fa436a;
	}
	.icon-shouhoutuikuan {
		font-size: 44upx;
	}
}
.history-section {
	padding: 30upx 0 0;
	margin-top: 20upx;
	background: #fff;
	border-radius: 10upx;
	.sec-header {
		display: flex;
		align-items: center;
		font-size: $font-base;
		color: $font-color-dark;
		line-height: 40upx;
		margin-left: 30upx;
		.yticon {
			font-size: 44upx;
			color: #5eba8f;
			margin-right: 16upx;
			line-height: 40upx;
		}
	}
	.h-list {
		white-space: nowrap;
		padding: 30upx 30upx 0;
		image {
			display: inline-block;
			width: 160upx;
			height: 160upx;
			margin-right: 20upx;
			border-radius: 10upx;
		}
	}
}
</style>
