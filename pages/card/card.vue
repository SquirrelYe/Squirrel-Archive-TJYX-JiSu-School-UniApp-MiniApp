<template>
	<view>
		<text style="display:block;padding: 16upx 30upx 10upx;lihe-height: 1.6;color: #fa436a;font-size: 24upx;">
			长按保存并扫描二维码，填写信息之后会有校园大使上门开卡。
		</text>
		<view class="qr">
			<image mode="aspectFit" :src="qr[0]" class="qr-img" :data-url="qr" @click="ViewImage"></image>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qr:''
			}
		},
		onLoad(){
			let host = this.$host
			this.qr = [`${host}/www/card/card.png`]
		},
		methods: {			
			ViewImage(e) {
				uni.previewImage({
					urls: this.qr,
					current: e.currentTarget.dataset.url
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #fff;
		padding-bottom: 100upx;
		display: flex;
		justify-content: center;
		flex-direction: column
	}
	.qr{
		height: 500upx;
		display: flex;
		justify-content: center;
		align-items: center
	}
	.qr-img{
		width: 185upx;
		height: 185upx;
		
		display: flex;
		justify-content: center;
		align-items: center
	}


</style>
