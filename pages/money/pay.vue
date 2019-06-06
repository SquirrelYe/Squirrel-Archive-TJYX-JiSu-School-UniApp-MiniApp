<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{order.money}}</text>
		</view>

		<view class="pay-type-list">

			<view class="type-item b-b" @click="changePayType(1)">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 1' />
					</radio>
				</label>
			</view>
			<view class="type-item" @click="changePayType(2)">
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">预存款支付</text>
					<text>可用余额 ¥{{stock.money}}</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 2' />
					</radio>
				</label>
			</view>
		</view>		
		<text class="mix-btn" @click="confirm">确认支付</text>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				kind:null,	// 订单种类 0.直接购买、1.购物车付款
				type:null,  // 支付类别 0.资金充值、1.发布代取快递，2.快递代发、3.考试下单、4.旅游下单、5.水果下单
				order:{},
				stock:{},
				payType: 1,
				orderInfo: {}
			};
		},
		computed: { ...mapState(['user']) },
		onLoad(options) { 
			this.kind = options.kind || 0
			this.type = options.type
			this.order = JSON.parse(options.order)
			console.log(this.type, this.order)
			this.$apis.stock.findByUserId(this.user.id).then(res=>{ console.log('账户资金信息',res.data); this.stock = res.data })  // 获取资金信息
		},
		methods: {
			//选择支付方式 1、微信支付，2、预付款支付
			changePayType(type) { this.payType = type; },
			//确认支付
			async confirm() {
				console.log(this.user, this.order)
				const { id,school_id } = this.user
				//  支付类别 0、资金充值、1、发布代取快递，2、快递代发、3、考试下单、4、旅游下单，5、水果下单
				// ①、调用微信支付接口
				// ②、回调，写入快递代取订单、写入订单信息 
				// 类别*（-3、开卡，-2、代发，-1、代取，0.考试，1.旅游，2.水果）
				// 购物车状态*（0.未付款、1.已付款、-1.关闭）
				// 订单状态*（0.未发货、1.已发货、2.已完成、3.已评价、-1.订单取消）
				
				// 微信支付
				if(this.payType == 1){
					const { from,key,location_id,money,total } = this.order
					// 微信支付
					
					// 写入订单
					if(this.type == 1){  //  1、发布代取快递
						let log = await this.$apis.logistic.create(id,from,location_id,total,money,key,school_id)
						let tran = await this.$apis.cart.createLog(id,-1,1,log.data.id,1,location_id,2)
						console.log(log,tran)
						if(log && tran){
							this.$api.msg('订单创建成功')
							uni.redirectTo({ url: '/pages/money/paySuccess' })
						}else this.$api.msg('订单创建失败')
					}
				}
				// 预付款支付
				else{
					// 预付款支付
					const { money,location_id } = this.order;
					let stock = await this.$apis.stock.findByUserId(id)
					if( money<=stock.data.money ){  // 账户余额足够
						// 扣款
						let m = stock.data.money - money;
						let final = await this.$apis.stock.updateMoney(stock.data.id,m)
						// 写入订单					
						if(this.type == 1){ //  1、发布代取快递
							const { from,key,location_id,total } = this.order
							let log = await this.$apis.logistic.create(id,from,location_id,total,money,key,school_id)
							let tran = await this.$apis.cart.createLog(id,-1,1,money,log.data.id,1,location_id,2)
							console.log(log,tran)
							if(log && tran){ this.$api.msg('订单创建成功'); uni.redirectTo({ url: '/pages/money/paySuccess' }) }
							else this.$api.msg('订单创建失败')
						}						
						if(this.type == 2){ //  2、快递代发 
						}						
						if(this.type == 3){ //  3、考试下单 
							if(this.kind == 0){}
							if(this.kind == 1) this.pay()
						}						
						if(this.type == 4){ //  4、旅游下单 
							if(this.kind == 0){}
							if(this.kind == 1) this.pay()
						}						
						if(this.type == 5){ //  5、水果下单 
							if(this.kind == 0){}
							if(this.kind == 1) this.pay()
						}
					}else  this.$api.msg('可用余额不足')					
				}
			},
			// 下单逻辑
			async pay(){
				const { location_id } = this.order;
				const { id,other,number } = this.order.good
				let res = await this.$apis.cart.updateCart(id,number,location_id,other,1,0)  // 1.已付款，0.未发货
				console.log(res.data)
				if(res.data[0] == 1){ this.$api.msg('订单创建成功'); uni.redirectTo({ url: '/pages/money/paySuccess' }) }
				else this.$api.msg('订单创建失败')
			}
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price{
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;
			&:before{
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;
		
		.type-item{
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position:relative;
		}
		
		.icon{
			width: 100upx;
			font-size: 52upx;
		}
		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}
		.icon-weixinzhifu {
			color: #36cb59;
		}
		.icon-alipay {
			color: #01aaef;
		}
		.tit{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}
		.con{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

</style>
