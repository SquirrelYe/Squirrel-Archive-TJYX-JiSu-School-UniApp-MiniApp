<template>
	<view>
		<view class="bg-white padding margin-top-xs">
			<view class="cu-steps">
				<view class="cu-item" :class="index != log.condition ? '' : 'text-orange'" v-for="(item, index) in basicsList" :key="index">
					<text :class="index > basics ? 'cuIcon-title' : 'cuIcon-' + item.icon"></text>
					{{ item.name }}
				</view>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">订单状态</view>
			<view class="title">{{log.conditionTip}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">收货人</view>
			<view class="title">{{loc.name}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">取件地址</view>
			<view class="title">{{log.from}}</view>
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
			<view class="title">{{log.total}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">价格</view>
			<view class="title">￥{{log.money}}</view>
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
				{ icon: 'usefullfill', name: '未领单' },
				{ icon: 'radioboxfill', name: '已领单' },
				{ icon: 'subscription', name: '待送达' },
				{ icon: 'roundcheckfill', name: '已完成' }
			],
			loc:{},
			log:{}
		};
	},
	onLoad(options) {
		console.log(options)
		this.loc = JSON.parse(options.loc)
		let log = JSON.parse(options.log)
		//添加不同状态下订单的表现形式
		this.log = Object.assign(log, this.orderConditionExp(log.condition));
	},
	methods: {
		// 格式化订单状态
		orderConditionExp(condition){
			let conditionTip = '';
			switch(+condition){
				case 0: conditionTip = '未接单'; break;
				case 1: conditionTip = '已接单'; break;
				case 2: conditionTip = '已取件'; break;
				case 3: conditionTip = '已送达'; break;
				case 4: conditionTip = '已评价'; break;
			}
			return {conditionTip};
		},	
	}
};
</script>

<style></style>
