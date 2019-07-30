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
			<view class="title">单价</view>
			<view class="title">￥{{data.price}}</view>
		</view>
		<view class="cu-form-group" v-if="data.ticket">
			<view class="title">优惠券</view>
			<view class="title">{{data.ticket.title}}  ￥{{data.ticket.short}}</view>
		</view>
		<view class="cu-form-group" v-if="data.other">
			<view class="title">备注</view>
			<view class="title">{{data.other}}</view>
		</view>
		<view class="cu-form-group align-start" v-if="type == -1">
			<textarea maxlength="-1" disabled :placeholder="log.key"></textarea>
		</view>
		<view class="cu-form-group align-start" v-if="data.judgec == 3">
			<view class="title">评价</view>
			<view class="title">{{data.callback}}</view>
		</view>
		<view class="cu-form-group" v-if="data.judgec == 2">
			<view class="title">评价</view>
			<view class="title text-red" @tap="showModal" data-target="ChooseModal">发表评论</view>
		</view>
		<!-- 评价 -->
		<view class="cu-modal bottom-modal" :class="modalName=='ChooseModal'?'show':''"  @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @tap="hideModal">取消</view>
					<view class="action text-green" @tap="choose">确定</view>
				</view>
				<view class="cu-form-group"><textarea maxlength="-1" v-model="callback" :placeholder="msg" placeholder-class="placeholder text-sm"></textarea></view>
			</view>
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
			type:null,
			loc:{},
			item:{},
			judgec:'',
			modalName: null,
			
			msg:'点击填写你的反馈信息哟~',
			callback:''
		};
	},
	onLoad(options) {
		// 类别*（-2、代发，-1、代取，0.考试，1.旅游，2.水果）
		console.log(options)
		let type = options.type
		let item = JSON.parse(options.item)
		this.type = type
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
		showModal(e) { this.modalName = e.currentTarget.dataset.target; this.callback = null },
		hideModal(e) { this.modalName = null },
		async choose(){
			// 隐藏
			this.hideModal()
			let call = this.callback
			const { id } = this.data
			console.log('评价信息--->',call)
			if(!call){ this.$api.msg('不能输入为空哦~'); return ;}
			let res = await this.$apis.cart.createCallback(id,3,call)
			console.log('评价信息修改--->',res.data)
			if(res.data){
				this.$api.msg('评价成功，蟹蟹你~');
				setTimeout(()=> { uni.navigateBack()}, 1500);
			}else this.$api.msg('评价失败，请重试~');
		}
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
