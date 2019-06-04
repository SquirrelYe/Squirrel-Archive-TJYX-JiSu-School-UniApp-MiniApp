<template>
	<view class="container">
        <view class="tj-sction">
            <view class="tj-item">
                <text class="num">{{ user.stock.money || 0 }}</text>
                <text>余额</text>
            </view>
            <view class="tj-item">
                <text class="num">{{  user.stock.ticket || 0 }}</text>
                <text>优惠券</text>
            </view>
            <view class="tj-item">
                <text class="num">{{  user.stock.jifen || 0 }}</text>
                <text>积分</text>
            </view>
        </view>
		<view class="list-cell log-out-btn">
			<text class="cell-tit" @tap="showModal" data-target="ChooseModal">点击充值</text>
		</view>

		<view class="cu-modal bottom-modal" :class="modalName=='ChooseModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @tap="hideModal">取消</view>
					<view class="action text-green" @tap="choose">确定</view>
				</view>
				<view class="grid col-3 padding-sm">
					<view v-for="(item,index) in checkbox" class="padding-xs" :key="index">
						<button class="cu-btn orange lg block text-xs" :class="item.checked?'bg-orange':'line-orange'" @tap="ChooseCheckbox"
						 :data-value="item.value"> {{item.name}}
							<view class="cu-tag sm round" :class="item.checked?'bg-white text-orange':'bg-orange'" v-if="item.hot">HOT</view>
						</button>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				modalName: null,
				checkbox: [
					{ value: 0, name: '10元', checked: false, hot: false, }, 
					{ value: 1, name: '20元', checked: false, hot: false, }, 
					{ value: 2, name: '30元', checked: true, hot: true, }, 
					{ value: 3, name: '60元', checked: false, hot: true, }, 
					{ value: 4, name: '80元', checked: false, hot: false, }, 
					{ value: 5, name: '100元', checked: false, hot: false, }]
			};
		},
		computed: {
			...mapState(['user']),
		},
		methods:{
            showModal(e) { this.modalName = e.currentTarget.dataset.target },
			hideModal(e) { this.modalName = null },
            choose(){
				// 调用微信支付接口
				// 更新资产
				console.log('微信支付')
                this.hideModal()
            },
			ChooseCheckbox(e) {
				let items = this.checkbox;
                let values = e.currentTarget.dataset.value;
                console.log(this.checkbox[values])
				for (let i = 0; i < items.length; ++i) {
					if (items[i].value == values) {
						items[i].checked = true;
					}else{
						items[i].checked = false;
                    }
				}
			}
		}
	}
</script>

<style lang='scss'>
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}
    
	page{
		background: $page-color-base;
	}
    
	.tj-sction{
		@extend %section;
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}
		.num{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
	}
</style>
