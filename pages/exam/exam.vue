<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="item in flist" :key="item.id" class="f-item b-b" :class="{ active: item.id === currentId }" @click="tabtap(item)">{{ item.title }}</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
			<view v-for="item in slist" :key="item.id" class="s-list" :id="'main-' + item.id">
				<text class="s-item">{{ item.title }}</text>
				<view class="t-list">
					<view @click="navToList(titem)" v-if="titem.mexam_id === item.id" class="t-item" v-for="titem in tlist" :key="titem.id">
						<image :src="host+'/'+titem.logo"></image>
						<text>{{ titem.name }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			host:'',
			sizeCalcState: false,
			tabScrollTop: 0,
			currentId: 1,
			flist: [],
			slist: [],
			tlist: [],
		};
	},
	computed: { ...mapState(['user']) },
	onLoad() { this.loadData(); this.host = this.$host },
	methods: {
		async loadData() {
			const { school_id } = this.user;
			// 菜单状态*（0.正常、-1.关闭）
			let exam = await this.$apis.exam.findAllBySchool(school_id,0,100)
			exam.data.rows.forEach(item => { if(item.condition ==0 ) this.flist.push(item) })
			let mexam = await this.$apis.mexam.findAllBySchool(school_id,0,100)
			mexam.data.rows.forEach(item => { if(item.condition ==0 && item.exam.condition ==0 ) this.slist.push(item) })
			let eitem = await this.$apis.eitem.findAllBySchool(school_id,0,100)
			eitem.data.rows.forEach(item => { if(item.condition ==0 ) this.tlist.push(item) })
			// 初始化选中
			try{
				this.currentId = this.flist[0].id
			}catch(e){
				console.log('暂无产品')
			}
			console.log(this.flist,this.slist,this.tlist)
		},
		//一级分类点击
		tabtap(item) {
			if (!this.sizeCalcState) { this.calcSize(); }
			this.currentId = item.id;
			let index = this.slist.findIndex(sitem => sitem.exam_id === item.id);
			this.tabScrollTop = this.slist[index].top;
		},
		//右侧栏滚动
		asideScroll(e) {
			if (!this.sizeCalcState) { this.calcSize(); }
			let scrollTop = e.detail.scrollTop;
			let tabs = this.slist.filter(item => item.top <= scrollTop).reverse();
			if (tabs.length > 0) {
				this.currentId = tabs[0].exam_id;
			}
		},
		//计算右侧栏每个tab的高度等信息
		calcSize() {
			let h = 0;
			this.slist.forEach(item => {
				let view = uni.createSelectorQuery().select('#main-' + item.id);
				view.fields(
					{ size: true },
					data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
					}
				).exec();
			});
			this.sizeCalcState = true;
		},
		// 进入详情页
		navToList(titem) { uni.navigateTo({ url: `/pages/exam/exam_list/exam_list?item=${JSON.stringify(titem)}` }); }
	}
};
</script>

<style lang="scss">
page,
.content {
	height: 100%;
	background-color: #f8f8f8;
}

.content {
	display: flex;
}
.left-aside {
	flex-shrink: 0;
	width: 200upx;
	height: 100%;
	background-color: #fff;
}
.f-item {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100upx;
	font-size: 28upx;
	color: $font-color-base;
	position: relative;
	&.active {
		color: $base-color;
		background: #f8f8f8;
		&:before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			height: 36upx;
			width: 8upx;
			background-color: $base-color;
			border-radius: 0 4px 4px 0;
			opacity: 0.8;
		}
	}
}

.right-aside {
	flex: 1;
	overflow: hidden;
	padding-left: 20upx;
}
.s-item {
	display: flex;
	align-items: center;
	height: 70upx;
	padding-top: 8upx;
	font-size: 28upx;
	color: $font-color-dark;
}
.t-list {
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	background: #fff;
	padding-top: 12upx;
	&:after {
		content: '';
		flex: 99;
		height: 0;
	}
}
.t-item {
	flex-shrink: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 176upx;
	font-size: 26upx;
	color: #666;
	padding-bottom: 20upx;

	image {
		width: 140upx;
		height: 140upx;
	}
}
</style>
