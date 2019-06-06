<template>
	<view>
		<view class="bg-white padding margin-top-xs">
			<view class="cu-steps">
				<view class="cu-item" :class="index <= data.judgec ? 'text-orange' : ''" v-for="(item, index) in basicsList" :key="index">
					<text :class="index > basics ? 'cuIcon-title' : 'cuIcon-' + item.icon"></text>
					{{ item.name }}
				</view>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">订单状态</view>
			<view class="title">{{judgec.conditionTip}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">信息</view>
			<view class="title">{{item.title}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">收货人</view>
			<view class="title">{{loc.name}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">收货地址</view>
			<view class="title">{{loc.school}}  {{loc.dom}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">电话</view>
			<view class="title">{{loc.phone}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">数量</view>
			<view class="title">{{data.number}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">价格</view>
			<view class="title">￥{{data.price}}</view>
		</view>
		<view class="cu-form-group align-start">
			<textarea maxlength="-1" disabled :placeholder="log.key"></textarea>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			basics: 3,
			basicsList: [
				{ icon: 'usefullfill', name: '未发货' },
				{ icon: 'radioboxfill', name: '已发货' },
				{ icon: 'subscription', name: '已完成' },
				{ icon: 'roundcheckfill', name: '已评价' }
			],
			data:{},
			loc:{},
			item:{},
			judgec:''
		};
	},
	onLoad(options) {
		console.log(options)
		let type = options.type
		let item = JSON.parse(options.item)
		this.data = item
		this.loc = JSON.parse(options.loc)
		if(type == 0) { this.item = item.eitem; this.judgec = this.orderConditionExp(item.judgec) } // 考试
		if(type == 1) { this.item = item.jitem; this.judgec = this.orderConditionExp(item.judgec) } // 旅游
		if(type == 2) { this.item = item.fitem; this.judgec = this.orderConditionExp(item.judgec) } // 水果
	},
	methods: {
		// 格式化订单状态
		orderConditionExp(judgec){
			let conditionTip = '';
			switch(+judgec){
				case 0: conditionTip = '未发货'; break;
				case 1: conditionTip = '已发货'; break;
				case 2: conditionTip = '已完成'; break;
				case 3: conditionTip = '已评价'; break;
				case -1: conditionTip = '订单取消'; break;
			}
			return {conditionTip};
		},	
	}
};
</script>

<style lang="scss">
	page{
		background: $page-color-base;
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
</style>
