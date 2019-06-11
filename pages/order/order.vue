<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex == index }" @click="tabClick(index)">{{ item.text }}</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="getMore()">
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true"></empty>
					<!-- 订单列表  @scrolltolower="loadData"-->
					<view v-for="(item, index) in tabItem.orderList" :key="index" class="order-item" @click="enter(item)">
						<view class="i-top b-b">
							<text class="time">{{ item.date }}</text>
							<text class="state" :style="{ color: item.stateTipColor }">{{ item.stateTip }}</text>
							<!-- <text v-if="item.condition === -1" class="del-btn yticon icon-iconfontshanchu1" @click="deleteOrder(index)"></text> -->
						</view>
						<!-- 0、快递代发 type -2 -->
						<view class="goods-box-single" v-if="item.type == -2">
							<image class="goods-img" lazy-load :src="user.info.avatarUrl" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">代发快递</text>
								<text class="attr-box">快递代发 x {{ item.number }}</text>
								<text class="price">{{ item.price }}</text>
							</view>
						</view>
						<!-- 1、快递代取 type -1 -->
						<view class="goods-box-single" v-if="item.type == -1">
							<image class="goods-img" lazy-load :src="user.info.avatarUrl" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{ item.logistic.key }}</text>
								<text class="attr-box">快递代取 x {{ item.number }}</text>
								<text class="price">{{ item.price }}</text>
							</view>
						</view>
						<!-- 2、考试订单 type 0 -->
						<view class="goods-box-single" v-if="item.type == 0">
							<image class="goods-img" lazy-load :src="host+'/'+item.eitem.logo" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{ item.eitem.title }}</text>
								<text class="attr-box">{{item.eitem.name}} x {{ item.number }}</text>
								<text class="price">{{ item.price }}</text>
							</view>
						</view>
						<!-- 3、旅游订单 type 1 -->
						<view class="goods-box-single" v-if="item.type == 1">
							<image class="goods-img" lazy-load :src="host+'/'+item.jitem.logo" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{ item.jitem.title }}</text>
								<text class="attr-box">{{item.jitem.name}} x {{ item.number }}</text>
								<text class="price">{{ item.price }}</text>
							</view>
						</view>
						<!-- 4、水果订单 type 2 -->
						<view class="goods-box-single" v-if="item.type == 2">
							<image class="goods-img" lazy-load :src="host+'/'+item.fitem.logo" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{ item.fitem.title }}</text>
								<text class="attr-box">{{item.fitem.name}} x {{ item.number }}</text>
								<text class="price">{{ item.price }}</text>
							</view>
						</view>
												
						<view class="price-box">
							共 <text class="num">{{item.number}}</text> 件商品 实付款 
							<text class="price" v-if="item.ticket">{{item.number * item.price - item.ticket.short}}</text>
							<text class="price" v-else>{{item.number * item.price}}</text>
						</view>
					</view>					
					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import empty from "@/components/empty";
import { mapState } from 'vuex';
export default {
	components: { uniLoadMore, empty },
	data() {
		return {
			tabCurrentIndex: 0,
			navList: [
				{ state: 0, text: '全部', loadingType: 'more', orderList: [] },
				{ state: 1, text: '待发货', loadingType: 'more', orderList: [] },
				{ state: 2, text: '待收货', loadingType: 'more', orderList: [] },
				{ state: 3, text: '待评价', loadingType: 'more', orderList: [] },
				{ state: 4, text: '已完成', loadingType: 'more', orderList: [] } ,
				{ state: -1, text: '取消', loadingType: 'more', orderList: [] } ,
			],
			host:'',
			// 分页数据
			off:0,
			lim:4
		};
	},
	computed: { ...mapState(['user']) },
	onLoad(options) {
		this.host = this.$host
		this.tabCurrentIndex = options.state || 0;
		this.loadData(this.tabCurrentIndex,0);
	},
	onPullDownRefresh() {
		this.off = 0; this.lim = 4;
		this.loadData(this.tabCurrentIndex,1)
	},
	methods: {
		//获取订单列表  订单状态*（0.未发货、1.已发货、2.已完成、3.已评价、-1.订单取消）
		// index:滑动块索引0.1.2.3.-1 ， judge:状态控制 0.初始化，1.下拉加载，2.上拉刷新
		async loadData(index,judge) {			
			//这里是将订单挂载到tab列表下
			let navItem = this.navList[index];
			let state = navItem.state;			
			const { id } = this.user;
			console.log('单元定位',index)
			
			let res;
			// 显示全部
			if(index == 0) res = await this.$apis.cart.findTranByUserId(id,this.off,this.lim);
			// 按状态显示
			else if(index == 5) res = await this.$apis.cart.findByCondition(id, -1,this.off,this.lim)
			else res = await this.$apis.cart.findByCondition(id, index-1 ,this.off,this.lim)
			console.log(res.data)
			
			let orderList = res.data.rows.filter(item=>{
				//添加不同状态下订单的表现形式
				item = Object.assign(item, this.orderConditionExp(item.condition), this.orderTimeExp(item.created_at));
				return item;
			});			
			if(judge === 0){ 
				uni.hideLoading();
				if(orderList.length == 0){					
					//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
					this.$set(navItem, 'loaded', true);
					navItem.orderList = null
				}else{
					navItem.orderList = orderList;
					this.$set(navItem, 'loaded', false);
				}
			}
			if(judge === 1){ this.$api.msg('刷新成功'); uni.stopPullDownRefresh(); navItem.orderList = orderList; }
			if(judge === 2){
				if(orderList.length != 0){
					orderList.forEach(item=>{ navItem.orderList.push(item); })
				}else{
					// this.$api.msg('没有更多啦~') 
					//判断是否还有数据， 有改为 more， 没有改为noMore 
					if(orderList.length == 0) navItem.loadingType = 'noMore';
					else navItem.loadingType = 'more';
				}
			}
		},
		//swiper 切换
		changeTab(e) {
			this.tabCurrentIndex = e.target.current;
			this.off = 0; this.lim = 4;
			this.loadData(this.tabCurrentIndex,0);
		},
		// 上拉加载
		getMore() {
			let add = this.lim
			this.off += add; this.lim += add;
			console.log(this.off,this.lim)
			this.loadData(this.tabCurrentIndex,2)
		},
		// 查看详情
		enter(item){
			console.log('查看详情',item)
			let t = item.type
			let loc = JSON.stringify(item.location)
			if(t == -1){   // 代取快递
				let log = JSON.stringify(item.logistic)
				uni.navigateTo({ url: `/pages/flow/logistic_detail/logistic_detail?loc=${loc}&log=${log}` });	
			}else if(t == -2){	// 代发快递
				let lsend = JSON.stringify(item.lsend)
				uni.navigateTo({ url: `/pages/flow/lsend_detail/lsend_detail?loc=${loc}&lsend=${lsend}` });	
			}
			else if(t == 0||t == 1||t == 2){	// 考试、旅游、水果
				let citem = JSON.stringify(item)
				uni.navigateTo({ url: `/pages/order/order_detail/order_detail?type=${t}&loc=${loc}&item=${citem}` });	
			}
			
		},
		//顶部tab点击
		tabClick(index) { this.tabCurrentIndex = index; },
		//删除订单
		deleteOrder(index) { },
		//取消订单
		cancelOrder(item) { },
		//订单状态文字和颜色
		orderConditionExp(condition){
			let stateTip = '',
				stateTipColor = '#fa436a';
			switch(+condition){
				case 0: stateTip = '未付款'; break;
				case 1: stateTip = '已付款'; break;
				case -1:
					stateTip = '订单已关闭'; 
					stateTipColor = '#909399';
					break;
			}
			return {stateTip, stateTipColor};
		},		
		//订单时间格式化
		orderTimeExp(time){
			let tmp = time.split('T')
			let date = tmp[0] + '  '+ tmp[1].split(':')[0]+ ':' + tmp[1].split(':')[1]
			return {date};
		}
	}
};
</script>

<style lang="scss">
page,
.content {
	background: $page-color-base;
	height: 100%;
}

.swiper-box {
	height: calc(100% - 40px);
}
.list-scroll-content {
	height: 100%;
}

.navbar {
	display: flex;
	height: 40px;
	padding: 0 5px;
	background: #fff;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
	position: relative;
	z-index: 10;
	.nav-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: 15px;
		color: $font-color-dark;
		position: relative;
		&.current {
			color: $base-color;
			&:after {
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				width: 44px;
				height: 0;
				border-bottom: 2px solid $base-color;
			}
		}
	}
}

.uni-swiper-item {
	height: auto;
}
.order-item {
	display: flex;
	flex-direction: column;
	padding-left: 30upx;
	background: #fff;
	margin-top: 16upx;
	.i-top {
		display: flex;
		align-items: center;
		height: 80upx;
		padding-right: 30upx;
		font-size: $font-base;
		color: $font-color-dark;
		position: relative;
		.time {
			flex: 1;
		}
		.state {
			color: $base-color;
		}
		.del-btn {
			padding: 10upx 0 10upx 36upx;
			font-size: $font-lg;
			color: $font-color-light;
			position: relative;
			&:after {
				content: '';
				width: 0;
				height: 30upx;
				border-left: 1px solid $border-color-dark;
				position: absolute;
				left: 20upx;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
	/* 多条商品 */
	.goods-box {
		height: 160upx;
		padding: 20upx 0;
		white-space: nowrap;
		.goods-item {
			width: 120upx;
			height: 120upx;
			display: inline-block;
			margin-right: 24upx;
		}
		.goods-img {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
	/* 单条商品 */
	.goods-box-single {
		display: flex;
		padding: 20upx 0;
		.goods-img {
			display: block;
			width: 120upx;
			height: 120upx;
		}
		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 0 30upx 0 24upx;
			overflow: hidden;
			.title {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				line-height: 1;
			}
			.attr-box {
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				padding: 10upx 12upx;
			}
			.price {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				&:before {
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
	}

	.price-box {
		display: flex;
		justify-content: flex-end;
		align-items: baseline;
		padding: 20upx 30upx;
		font-size: $font-sm + 2upx;
		color: $font-color-light;
		.num {
			margin: 0 8upx;
			color: $font-color-dark;
		}
		.price {
			font-size: $font-lg;
			color: $font-color-dark;
			&:before {
				content: '￥';
				font-size: $font-sm;
				margin: 0 2upx 0 8upx;
			}
		}
	}
	.action-box {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 100upx;
		position: relative;
		padding-right: 30upx;
	}
	.action-btn {
		width: 160upx;
		height: 60upx;
		margin: 0;
		margin-left: 24upx;
		padding: 0;
		text-align: center;
		line-height: 60upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		background: #fff;
		border-radius: 100px;
		&:after {
			border-radius: 100px;
		}
		&.recom {
			background: #fff9f9;
			color: $base-color;
			&:after {
				border-color: #f7bcc8;
			}
		}
	}
}

/* load-more */
.uni-load-more {
	display: flex;
	flex-direction: row;
	height: 80upx;
	align-items: center;
	justify-content: center;
}

.uni-load-more__text {
	font-size: 28upx;
	color: #999;
}

.uni-load-more__img {
	height: 24px;
	width: 24px;
	margin-right: 10px;
}

.uni-load-more__img > view {
	position: absolute;
}

.uni-load-more__img > view view {
	width: 6px;
	height: 2px;
	border-top-left-radius: 1px;
	border-bottom-left-radius: 1px;
	background: #999;
	position: absolute;
	opacity: 0.2;
	transform-origin: 50%;
	animation: load 1.56s ease infinite;
}

.uni-load-more__img > view view:nth-child(1) {
	transform: rotate(90deg);
	top: 2px;
	left: 9px;
}

.uni-load-more__img > view view:nth-child(2) {
	transform: rotate(180deg);
	top: 11px;
	right: 0;
}

.uni-load-more__img > view view:nth-child(3) {
	transform: rotate(270deg);
	bottom: 2px;
	left: 9px;
}

.uni-load-more__img > view view:nth-child(4) {
	top: 11px;
	left: 0;
}

.load1,
.load2,
.load3 {
	height: 24px;
	width: 24px;
}

.load2 {
	transform: rotate(30deg);
}

.load3 {
	transform: rotate(60deg);
}

.load1 view:nth-child(1) {
	animation-delay: 0s;
}

.load2 view:nth-child(1) {
	animation-delay: 0.13s;
}

.load3 view:nth-child(1) {
	animation-delay: 0.26s;
}

.load1 view:nth-child(2) {
	animation-delay: 0.39s;
}

.load2 view:nth-child(2) {
	animation-delay: 0.52s;
}

.load3 view:nth-child(2) {
	animation-delay: 0.65s;
}

.load1 view:nth-child(3) {
	animation-delay: 0.78s;
}

.load2 view:nth-child(3) {
	animation-delay: 0.91s;
}

.load3 view:nth-child(3) {
	animation-delay: 1.04s;
}

.load1 view:nth-child(4) {
	animation-delay: 1.17s;
}

.load2 view:nth-child(4) {
	animation-delay: 1.3s;
}

.load3 view:nth-child(4) {
	animation-delay: 1.43s;
}

@-webkit-keyframes load {
	0% {
		opacity: 1;
	}

	100% {
		opacity: 0.2;
	}
}
</style>
