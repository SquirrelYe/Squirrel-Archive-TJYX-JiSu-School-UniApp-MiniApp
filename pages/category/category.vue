<template>
	<view>
		<view class="notice-item" v-for="(item, index) in category" :key="index" @click="check(item)">
			<text class="time">{{item.updated_at.split('T')[0]}}</text>
			<view class="content">
				<text class="title">{{item.title}}</text>
				<view class="img-wrapper">
					<image class="pic" :src="item.icon"></image>
					<view class="cover" v-if="item.condition === -1"> 活动结束 </view>
				</view>
				<text class="introduce">
					{{item.detail}}
				</text>
			</view>
		</view>		
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				category:[],
				off:0,
				lim:2
			}
		},
		computed:{ ...mapState(['user']) },
		onLoad() { this.init(0) },
		onShow() { this.off = 0; this.lim = 2; this.init(0)},
		onPullDownRefresh() {
			this.off = 0; this.lim = 2;
			this.init(1)
		},
		onReachBottom() {
			let add = this.lim
			this.off += add; this.lim += add;
			console.log(this.off,this.lim)
			this.init(2)
		},
		methods: {
			// 初始化页面  judge { 0.初始化、 1.下拉刷新、 2.上拉加载}
			init(judge){ 
				const {school_id, type} = this.user
				this.$apis.activity.findAllBySchoolType(school_id,type,this.off,this.lim).then(res=>{ 
					console.log(res.data); 
					if(judge === 0){ this.category = res.data.rows; }
					if(judge === 1){ this.$api.msg('刷新成功'); uni.stopPullDownRefresh(); this.category = res.data.rows; }
					if(judge === 2){
						if(res.data.rows.length != 0){
							// this.$api.msg('加载成功') 
							this.category = this.category.concat(res.data.rows) ; 
							console.log(this.category)
						}else this.$api.msg('没有更多啦~') 
					}					
				})
			},
			// 选择活动信息
			check(item){ console.log('选择的活动信息',item) }
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #f7f7f7;
		padding-bottom: 30upx;
	}

	.notice-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.time {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80upx;
		padding-top: 10upx;
		font-size: 26upx;
		color: #7d7d7d;
	}

	.content {
		width: 710upx;
		padding: 0 24upx;
		background-color: #fff;
		border-radius: 4upx;
	}

	.title {
		display: flex;
		align-items: center;
		height: 90upx;
		font-size: 32upx;
		color: #303133;
	}

	.img-wrapper {
		width: 100%;
		height: 260upx;
		position: relative;
	}

	.pic {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 6upx;
	}

	.cover {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		font-size: 36upx;
		color: #fff;
	}

	.introduce {
		display: inline-block;
		padding: 16upx 0;
		font-size: 28upx;
		color: #606266;
		line-height: 38upx;
	}

	.bot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80upx;
		font-size: 24upx;
		color: #707070;
		position: relative;
	}

	.more-icon {
		font-size: 32upx;
	}
</style>
