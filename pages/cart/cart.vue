<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="!hasLogin || empty === true" class="empty">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view v-if="hasLogin" class="empty-tips">
				空空如也
				<navigator class="navigator" v-if="hasLogin" url="../index/index" open-type="switchTab">随便逛逛></navigator>
			</view>
			<view v-else class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin">去登陆></view>
			</view>
		</view>
		<view v-else>
			<!-- 列表 -->
			<view class="cart-list">
				<block v-for="(item, index) in cartList" :key="item.id">
					<view class="cart-item" :class="{ 'b-b': index !== cartList.length - 1 }">
						<view class="image-wrapper">
							<image v-if="item.type == -2" :src="user.info.avatarUrl" :class="[item.loaded]" mode="aspectFill" lazy-load @load="onImageLoad('cartList', index)" @error="onImageError('cartList', index)" ></image>
							<image v-if="item.type == 0" :src="host+'/'+item.eitem.logo" :class="[item.loaded]" mode="aspectFill" lazy-load @load="onImageLoad('cartList', index)" @error="onImageError('cartList', index)" ></image>
							<image v-if="item.type == 1" :src="host+'/'+item.jitem.logo" :class="[item.loaded]" mode="aspectFill" lazy-load @load="onImageLoad('cartList', index)" @error="onImageError('cartList', index)" ></image>
							<image v-if="item.type == 2" :src="host+'/'+item.fitem.logo" :class="[item.loaded]" mode="aspectFill" lazy-load @load="onImageLoad('cartList', index)" @error="onImageError('cartList', index)" ></image>
							<view class="yticon icon-xuanzhong2 checkbox" :class="{ checked: item.checked }" @click="check(item)"></view>
						</view>
						<view class="item-right">
							<block v-if="item.type == -2">
								<text class="clamp title">快递代发</text>
								<text class="attr">{{item.lsend.name}}</text>
								<text class="price" v-if="item.price">¥{{ item.price }}  重量:{{item.lsend.weight}}kg</text>
								<text v-else>等待校园大使上门^_^</text>
							</block>
							<block v-if="item.type == 0">
								<text class="clamp title">{{ item.eitem.title }}</text>
								<text class="attr">{{ item.eitem.name }}</text>
								<text class="price">¥{{ item.price }}</text>
								<uni-number-box class="step" :min="1" :value="item.number" :isMin="item.number === 1" :index="index" @eventChange="numberChange" ></uni-number-box>
							</block>
							<block v-if="item.type == 1">
								<text class="clamp title">{{ item.jitem.title }}</text>
								<text class="attr">{{ item.jitem.name }}</text>
								<text class="price">¥{{ item.price }}</text>
								<uni-number-box class="step" :min="1" :value="item.number" :isMin="item.number === 1" :index="index" @eventChange="numberChange" ></uni-number-box>
							</block>
							<block v-if="item.type == 2">
								<text class="clamp title">{{ item.fitem.title }}</text>
								<text class="attr">{{ item.fitem.name }}</text>
								<text class="price">¥{{ item.price }}</text>
								<uni-number-box class="step" :min="1" :value="item.number" :isMin="item.number === 1" :index="index" @eventChange="numberChange" ></uni-number-box>
							</block></view>
						<text class="del-btn yticon icon-fork" @click="deleteCartItem(index)"></text>
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox">
					<image :src="show ? '/static/selected.png' : '/static/select.png'" mode="aspectFit"></image>
					<!-- <view class="clear-btn" :class="{ show: allChecked }" @click="clearCart">清空</view> -->
				</view>
				<view class="total-box">
					<text class="price">¥{{ total }}</text>
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import uniNumberBox from '@/components/uni-number-box.vue';
export default {
	components: { uniNumberBox },
	data() {
		return {
			host:'',
			total: 0, //总价格
			empty: true, //空白页显示  true|false
			cartList: [],
			show:false,
			// 分页数据
			off:0,
			lim:5
		};
	},
	computed: { ...mapState(['hasLogin','user']) },
	onLoad() { this.loadData(0); this.host = this.$host },
	// onShow() {  this.cartList = []; this.off = 0; this.lim = 5; this.loadData(0); this.show = false},
	watch: { //显示空白页
		cartList(e) {
			let empty = e.length === 0 ? true : false;
			if (this.empty !== empty) this.empty = empty;
		}
	},
	onPullDownRefresh() {
		console.log('下拉刷新')
		this.off = 0; this.lim = 5; this.cartList = [] ;this.loadData(1);this.show = false;
	},
	onReachBottom() {		
		let add = this.lim
		this.off += add; this.lim += add;		
		console.log('上拉加载',this.off,this.lim)		
		this.loadData(2)		
	},
	methods: {
		init() {  this.cartList = []; this.off = 0; this.lim = 5; this.loadData(0); this.show = false},
		//请求数据
		async loadData(judge) {
			const { id } = this.user;
			let list = await this.$apis.cart.findCartByUserId(id,this.off,this.lim)
			let cartList = list.data.rows.map(item => {
				item.checked = false;
				return item;
			});
			if(judge == 0){ this.cartList = cartList; }
			if(judge == 1){ uni.stopPullDownRefresh(); this.cartList = cartList;}
			if(judge == 2){ 
				if(cartList.length != 0){
					this.cartList = this.cartList.concat(cartList);
				}else this.$api.msg('天啊，没有更多呐~');
			}
		},
		//监听image加载完成
		onImageLoad(key, index) { this.$set(this[key][index], 'loaded', 'loaded'); },
		//监听image加载失败
		onImageError(key, index) { this[key][index].image = '/static/errorImage.jpg'; },
		// 登录
		navToLogin() { uni.navigateTo({ url: '/pages/public/login' }); },
		//选中状态处理
		check(item) {
			const list = this.cartList;
			list.forEach(citem => {
				if(item == citem){
					citem.checked = !citem.checked ;
					this.show = citem.checked;
				}else citem.checked =false ;
			});
			this.calcTotal();
		},
		//数量
		numberChange(data) {
			this.cartList[data.index].number = data.number;
			this.calcTotal();
		},
		//删除
		deleteCartItem(index) {
			let list = this.cartList;
			let row = list[index];
			let id = row.id;

			uni.showModal({
				content: '真的要删除吗？',
				success: e => {
					if (e.confirm) {
						// 删除购物车
						this.$apis.cart.delete(id)
						.then(res=>{
							if(res.data.affectRows == 1){
								this.$api.msg('删除成功^_^')
								this.init()							
								this.calcTotal();
							}
						})
					}
				}
			});
		},
		//计算总价
		calcTotal() {
			let list = this.cartList;
			if (list.length === 0) { this.empty = true; return; }
			let total = 0;
			list.forEach(item => {
				if (item.checked === true) total += item.price * item.number;
			});
			this.total = Number(total.toFixed(2));
		},
		//创建订单
		createOrder() {
			let list = this.cartList;
			let good = {};
			if(this.show){				
				list.forEach(item => { if(item.checked) good = item; });
				console.log('选中的购物车item--->',good)
				const { type,eitem,jitem,fitem } = good;
				// 已下架物品
				let currentItem;
				(type == 0)&&(currentItem = eitem)||(type == 1)&&(currentItem = jitem)||(type == 2)&&(currentItem = fitem);
				if(currentItem && currentItem.condition == -1){
					this.$api.msg('此物品下架啦~');
					return;
				}
				// 生成订单信息传递到支付平台	kind : 0.直接购买、1.购物车付款	
				// 类别*（-3、开卡，-2、代发，-1、代取，0.考试，1.旅游，2.水果）
				// 支付类别 type 0、资金充值、1、发布代取快递，2、快递代发、3、考试下单、旅游下单，水果下单
				if(type == -2) {
					if(good.lsend.condition != 1) this.$api.msg('请等待校园大使上门喔~')
					else{						
						let obj = JSON.stringify({ location_id: good.location_id,good:good, money:good.price})
						uni.navigateTo({ url: `../money/pay?kind=1&type=2&order=${obj}` });
					}
				}
				else  uni.navigateTo({ url: `/pages/order/createOrder?kind=1&data=${JSON.stringify({ good: good })}` })
			}else this.$api.msg('天啊，你还没有选择呐~');

			
		}
	}
};
</script>

<style lang="scss">
.container {
	padding-bottom: 134upx;
	/* 空白页 */
	.empty {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		padding-bottom: 100upx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background: #fff;
		image {
			width: 240upx;
			height: 160upx;
			margin-bottom: 30upx;
		}
		.empty-tips {
			display: flex;
			font-size: $font-sm + 2upx;
			color: $font-color-disabled;
			.navigator {
				color: $uni-color-primary;
				margin-left: 16upx;
			}
		}
	}
}
	
.cart-list{
	background: #ffffff;
}
/* 购物车列表项 */
.cart-item {
	display: flex;
	position: relative;
	padding: 30upx 40upx;
	.image-wrapper {
		width: 200upx;
		height: 200upx;
		flex-shrink: 0;
		position: relative;
		image {
			border-radius: 8upx;
		}
	}
	.checkbox {
		position: absolute;
		left: -16upx;
		top: -16upx;
		z-index: 8;
		font-size: 44upx;
		line-height: 1;
		padding: 4upx;
		color: $font-color-disabled;
		background: #fff;
		border-radius: 50px;
	}
	.item-right {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		position: relative;
		padding-left: 30upx;
		.title,
		.price {
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			height: 40upx;
			line-height: 40upx;
		}
		.attr {
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			height: 50upx;
			line-height: 50upx;
		}
		.price {
			height: 50upx;
			line-height: 50upx;
		}
	}
	.del-btn {
		padding: 4upx 10upx;
		font-size: 34upx;
		height: 50upx;
		color: $font-color-light;
	}
}
/* 底部栏 */
.action-section {
	/* #ifdef H5 */
	margin-bottom: 100upx;
	/* #endif */
	position: fixed;
	left: 30upx;
	bottom: 30upx;
	z-index: 95;
	display: flex;
	align-items: center;
	width: 690upx;
	height: 100upx;
	padding: 0 30upx;
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.5);
	border-radius: 16upx;
	.checkbox {
		height: 52upx;
		position: relative;
		image {
			width: 52upx;
			height: 100%;
			position: relative;
			z-index: 5;
		}
	}
	.clear-btn {
		position: absolute;
		left: 26upx;
		top: 0;
		z-index: 4;
		width: 0;
		height: 52upx;
		line-height: 52upx;
		padding-left: 38upx;
		font-size: $font-base;
		color: #fff;
		background: $font-color-disabled;
		border-radius: 0 50px 50px 0;
		opacity: 0;
		transition: 0.2s;
		&.show {
			opacity: 1;
			width: 120upx;
		}
	}
	.total-box {
		flex: 1;
		display: flex;
		flex-direction: column;
		text-align: right;
		padding-right: 40upx;
		.price {
			font-size: $font-lg;
			color: $font-color-dark;
		}
		.coupon {
			font-size: $font-sm;
			color: $font-color-light;
			text {
				color: $font-color-dark;
			}
		}
	}
	.confirm-btn {
		padding: 0 38upx;
		margin: 0;
		border-radius: 100px;
		height: 76upx;
		line-height: 76upx;
		font-size: $font-base + 2upx;
		background: $uni-color-primary;
		box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72);
	}
}
/* 复选框选中状态 */
.action-section .checkbox.checked,
.cart-item .checkbox.checked {
	color: $uni-color-primary;
}
</style>
