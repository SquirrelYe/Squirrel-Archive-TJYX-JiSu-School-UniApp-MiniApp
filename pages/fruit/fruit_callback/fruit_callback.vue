<template>
	<view class="container">
		<!-- 评价 -->
		<view class="eva-section">
			<view class="eva-box"  v-for="(item,index) in callbackList" :key="index">
				<image class="portrait" :src="user.info.avatarUrl" mode="aspectFill"></image>
				<view class="right">
					<text class="name">{{item.user.name}}</text>
					<text class="con">{{item.callback}}</text>
					<view class="bot">
						<text class="attr">购买类型：{{item.fitem.name}}</text>
						<text class="time">{{item.date}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			id:null,
			callbackNumber:null,
			callbackList:[],
			// 上拉加载
			off:0,
			limit:7
		};
	},
	computed: { ...mapState(['user']) },
	async onLoad(options) {
		// 接收传值,id里面放的是考试项目id
		this.id = options.id;	
		this.load(0)
	},
	onPullDownRefresh() { this.init(); this.load(0) },
	onReachBottom() {
		console.log('上拉加载')
		let n = this.limit
		this.off+=n; this.limit+=n;
		this.load(1)
	},
	methods: {
		// 分页初始化
		init(){ this.off = 0; this.limit =7},
		// loadData
		async load(judge){  // judge 0.初始化、1.上拉加载
			console.log('定位',this.off,this.limit)
			let call = await this.$apis.cart.findFruitCallBack(this.id,this.off,this.limit)
			this.callbackNumber = call.data.count
			if(judge ==0) {
				this.callbackList = call.data.rows.filter(item=>{ item = Object.assign(item, this.orderTimeExp(item.updated_at)); return item; });
				uni.stopPullDownRefresh();
			}
			if(judge ==1) {
				let item =  call.data.rows.filter(item=>{ item = Object.assign(item, this.orderTimeExp(item.updated_at)); return item; });
				if(item.length == 0) { this.$api.msg('没有更多啦~'); return; }
				this.callbackList = this.callbackList.concat(item)
			}
		},
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

/* 评价 */
.eva-section {
	display: flex;
	flex-direction: column;
	padding: 20upx 30upx;
	background: #fff;
	// margin-top: 16upx;
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
</style>
