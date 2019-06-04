<template>
	<view class="content">
		<view class="navbar" :style="{ position: headerPosition, top: headerTop }">
			<view class="nav-item" :class="{ current: filterIndex === -1 }" @click="tabClick(-1)">全部订单</view>
			<view class="nav-item" :class="{ current: filterIndex === 0 }" @click="tabClick(0)">未领单</view>
			<view class="nav-item" :class="{ current: filterIndex === 1 }" @click="tabClick(1)">已领单</view>
			<view class="nav-item" :class="{ current: filterIndex === 2 }" @click="tabClick(2)">待送达</view>
			<view class="nav-item" :class="{ current: filterIndex === 3 }" @click="tabClick(3)">已完成</view>
		</view>
		<view class="goods-list">
			<view v-for="(item, index) in logisticList" :key="index" class="goods-item" @click="confirm()">
				<view class="image-wrapper"><image :src="item.cus.info.avatarUrl" lazy-load mode="aspectFill"></image></view>
				<text class="text-xs item-center">取件地址: {{item.from}}</text>
				<text class="text-xs item-center">送货地址：{{item.location.dom}}</text>
				<view class="price-box">
					<text>{{item.cus.info.nickName}}</text>
					<text>￥ {{item.money}}</text> 
					<!-- 数量 3 -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import { mapState } from 'vuex';
export default {
	components: { uniLoadMore },
	data() {
		return {
			headerPosition: 'fixed',
			headerTop: '0px',
			loadingType: 'more', //加载更多状态
			filterIndex: -1,
			logisticList: [],
			// 分页
			off:0,
			lim:6
		};
	},
	computed: { ...mapState(['user']) },
	onLoad(options) { this.init(0); },
	onPageScroll(e) {
		//兼容iOS端下拉时顶部漂移
		if (e.scrollTop >= 0) this.headerPosition = 'fixed'; 
		else this.headerPosition = 'absolute'; 
	},
	onPullDownRefresh() {
		this.off = 0; this.lim = 6;
		this.init(1)
	},
	onReachBottom() {
		let add = this.lim
		this.off += add; this.lim += add;
		console.log(this.off,this.lim)
		this.init(2)
	},
	methods: {
		// 初始化页面  judge { 0.初始化、 1.下拉刷新、 2.上拉加载}
		async init(judge){
			const { school_id } = this.user
			console.log('单元定位',this.filterIndex)
			let res
			// 显示全部
			if(this.filterIndex === -1) res = await this.$apis.logistic.findAllBySchool(school_id,this.off,this.lim);
			// 按状态显示
			else res = await this.$apis.logistic.findAllBySchoolCondition(school_id, this.filterIndex,this.off,this.lim)
			
			console.log(res.data)
			if(judge === 0){ uni.hideLoading(); this.logisticList = res.data.rows; }
			if(judge === 1){ this.$api.msg('刷新成功'); uni.stopPullDownRefresh(); this.logisticList = res.data.rows; }
			if(judge === 2){
				if(res.data.rows.length != 0){
					// this.$api.msg('加载成功') 
					this.logisticList = this.logisticList.concat(res.data.rows) ; 
					console.log(this.logisticList)
				}else this.$api.msg('没有更多啦~') 
			}
		},
		//筛选点击
		tabClick(index) {
			if (this.filterIndex === index) return; 
			this.filterIndex = index;
			uni.pageScrollTo({
				duration: 300,
				scrollTop: 0
			});
			this.off = 0; this.lim = 6;
			uni.showLoading({ title: '正在加载' });
			this.init(0);
		},
		//详情
		confirm() {
			// 校园大使才能查看详细信息
			// uni.navigateTo({ url: `/pages/flow/logistic_detail/logistic_detail` });
			this.$api.msg('校园大使才能查看喔')
		},
	}
};
</script>

<style lang="scss">
page,
.content {
	background: $page-color-base;
}
.content {
	padding-top: 96upx;
}

.navbar {
	position: fixed;
	left: 0;
	top: var(--window-top);
	display: flex;
	width: 100%;
	height: 80upx;
	background: #fff;
	box-shadow: 0 2upx 10upx rgba(0, 0, 0, 0.06);
	z-index: 10;
	.nav-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: 30upx;
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
				width: 120upx;
				height: 0;
				border-bottom: 4upx solid $base-color;
			}
		}
	}
	.p-box {
		display: flex;
		flex-direction: column;
		.yticon {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 30upx;
			height: 14upx;
			line-height: 1;
			margin-left: 4upx;
			font-size: 26upx;
			color: #888;
			&.active {
				color: $base-color;
			}
		}
		.xia {
			transform: scaleY(-1);
		}
	}
	.cate-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 80upx;
		position: relative;
		font-size: 44upx;
		&:after {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			border-left: 1px solid #ddd;
			width: 0;
			height: 36upx;
		}
	}
}

/* 商品列表 */
.goods-list {
	display: flex;
	flex-wrap: wrap;
	padding: 0 30upx;
	background: #fff;
	.goods-item {
		display: flex;
		flex-direction: column;
		width: 48%;
		padding-bottom: 40upx;
		&:nth-child(2n + 1) {
			margin-right: 4%;
		}
	}
	.image-wrapper {
		width: 100%;
		height: 330upx;
		border-radius: 10px;
		overflow: hidden;
		image {
			width: 100%;
			height: 100%;
			opacity: 1;
		}
	}
	.title {
		font-size: $font-lg;
		color: $font-color-dark;
		line-height: 80upx;
	}
	.item-center{
		display: flex;
		justify-content: center
	}
	.price-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 10upx;
		font-size: 24upx;
		color: $font-color-light;
	}
	.price {
		font-size: $font-lg;
		color: $font-color-dark;
		line-height: 1;
	}
}
</style>
