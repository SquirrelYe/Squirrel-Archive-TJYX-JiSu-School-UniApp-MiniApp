<template>
	<view>
		<view class="bg-white padding margin-top-xs">
			<view class="cu-steps">
				<view class="cu-item" :class="index > basics ? '' : 'text-orange'" v-for="(item, index) in basicsList" :key="index">
					<text :class="index > basics ? 'cuIcon-title' : 'cuIcon-' + item.icon"></text>
					{{ item.name }}
				</view>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">订单状态</view>
			<view class="title">已完成</view>
		</view>
		<view class="cu-form-group">
			<view class="title">驿站</view>
			<view class="title">煦园驿站</view>
		</view>
		<view class="cu-form-group">
			<view class="title">收货人</view>
			<view class="title">叶泫</view>
		</view>
		<view class="cu-form-group">
			<view class="title">收货地址</view>
			<view class="title">启能斋 520宿舍</view>
		</view>
		<view class="cu-form-group">
			<view class="title">电话</view>
			<view class="title">176-9579-6264</view>
		</view>
		<view class="cu-form-group">
			<view class="title">数量</view>
			<view class="title">2</view>
		</view>
		<view class="cu-form-group">
			<view class="title">价格</view>
			<view class="title">￥3</view>
		</view>
		<view class="cu-form-group align-start">
			<textarea maxlength="-1" disabled placeholder="收货码：Q6，姓名：叶武，学号：1607070125"></textarea>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			basics: 3,
			basicsList: [
				{
					icon: 'usefullfill',
					name: '未领单'
				},
				{
					icon: 'radioboxfill',
					name: '已领单'
				},
				{
					icon: 'subscription',
					name: '待送达'
				},
				{
					icon: 'roundcheckfill',
					name: '已完成'
				}
			]
		};
	},
	methods: {}
};
</script>

<style></style>
