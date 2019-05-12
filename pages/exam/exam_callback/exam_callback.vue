<template>
	<view class="container">
		<!-- 评价 -->
		<view class="eva-section">
			<!-- <view class="e-header">
				<text class="tit">评价</text>
				<text>(86)</text>
				<text class="tip">好评率 100%</text>
				<text class="yticon icon-you"></text>
			</view> -->
			<view class="eva-box">
				<image class="portrait" src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg" mode="aspectFill"></image>
				<view class="right">
					<text class="name">风继续吹</text>
					<text class="con">一下子就考过了，很开心</text>
					<view class="bot">
						<text class="attr">购买类型：标准</text>
						<text class="time">2019-04-01 19:21</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	async onLoad(options) {
		//接收传值,id里面放的是标题，因为测试数据并没写id
		let id = options.id;
		if (id) {
			this.$api.msg(`点击了${id}`);
		}
	},
	methods: {}
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
</style>
