<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.phone" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b"> 
			<text class="tit">学校</text>
			<input class="input" type="text" v-model="addressData.school" placeholder="收货人学校" placeholder-class="placeholder" />
			<text class="yticon icon-shouhuodizhi"></text>
		</view>
		<view class="row b-b"> 
			<text class="tit">宿舍号</text>
			<input class="input" type="text" v-model="addressData.dom" placeholder="宿舍楼、门牌号" placeholder-class="placeholder" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				manageType:'',
				addressData: { }
			}
		},
		computed:{ ...mapState(['user'])},
		onLoad(option){
			let title = '新增收货地址';
			if(option.type==='edit'){
				title = '编辑收货地址'				
				this.addressData = JSON.parse(option.data)
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({ title })
		},
		methods: {
			//提交
			async confirm(){
				const {id, name, phone, school, dom} = this.addressData;
				if(!name){ this.$api.msg('请填写收货人姓名'); return; }
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(phone)){ this.$api.msg('请输入正确的手机号码'); return; }
				if(!school){ this.$api.msg('请填写学校名称'); return; }
				if(!dom){ this.$api.msg('请填写宿舍信息'); return; }				
				//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				// 添加地址
				if(this.manageType === 'add'){
					let res = await this.$apis.location.create(this.user.id,name,phone,school,dom,'')
					if(res){
						this.$api.prePage().refreshList(res.data, this.manageType);
						this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
						setTimeout(()=>{
							uni.navigateBack()
						}, 800)
					}
				}
				// 更新地址
				else{
					let res = await this.$apis.location.update(id,name,phone,school,dom)
					if(res){
						this.$api.prePage().refreshList(res.data, this.manageType);
						this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
						setTimeout(()=>{
							uni.navigateBack()
						}, 800)
					}
				}
				
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
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
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
