<template>
  <view>
    <view class="bg-white padding margin-top-xs">
      <view class="cu-steps">
        <view class="cu-item" :class="item.judge <= lsend.condition ? 'text-orange' : ''" v-for="(item, index) in basicsList" :key="index">
          <text class="cuIcon-title"></text>
          {{ item.name }}
        </view>
      </view>
    </view>
    <view class="cu-form-group">
      <view class="title">订单状态</view>
      <view class="title">{{ lsend.conditionTip }}</view>
    </view>
    <view class="cu-form-group" v-if="lsend.condition != 0" @click="call(lsend.user.phone)">
      <view class="title">校园大使</view>
      <view class="title">{{ lsend.user.name }}</view>
    </view>
    <view class="cu-form-group">
      <view class="title">取件地址</view>
      <view class="title">{{ loc.school }} {{ loc.dom }}</view>
    </view>
    <view class="cu-form-group">
      <view class="title">收货人</view>
      <view class="title">{{ lsend.name }}</view>
    </view>
    <view class="cu-form-group">
      <view class="title">收货人电话</view>
      <view class="title">{{ lsend.phone }}</view>
    </view>
    <view class="cu-form-group">
      <view class="title">收货地址</view>
      <view class="title">{{ lsend.arrive }}</view>
    </view>
    <view class="cu-form-group" v-if="lsend.condition >= 2">
      <view class="title">重量</view>
      <view class="title">{{ lsend.weight }}kg</view>
    </view>
    <view class="cu-form-group" v-if="lsend.condition >= 2">
      <view class="title">价格</view>
      <view class="title">￥{{ lsend.money }}</view>
    </view>
    <view class="cu-form-group" v-if="lsend.condition == 4">
      <view class="title">快递单号</view>
      <view class="title">￥{{ lsend.code }}</view>
    </view>
    <view class="cu-form-group align-start">
      <textarea maxlength="-1" disabled :placeholder="lsend.key"></textarea>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      basics: 3,
      basicsList: [
        // { icon: 'roundclosefill', name: '已取消',judge: -1 },
        { name: '未领单', judge: 0 },
        { name: '已接单', judge: 1 },
        { name: '已取件', judge: 2 },
        { name: '已入库', judge: 3 },
        { name: '已邮寄', judge: 4 }
      ],
      loc: {},
      lsend: {}
    };
  },
  onLoad(options) {
    console.log(options);
    this.loc = JSON.parse(options.loc);
    let lsend = JSON.parse(options.lsend);
    //添加不同状态下订单的表现形式
    this.lsend = Object.assign(lsend, this.orderConditionExp(lsend.condition));
  },
  methods: {
    // 拨打校园大使
    call(phone) {
      uni.showActionSheet({
        itemList: [phone, '呼叫'],
        success: function (res) {
          if (res.tapIndex == 1) {
            wx.makePhoneCall({ phoneNumber: phone });
          }
        }
      });
    },
    // 格式化订单状态
    orderConditionExp(condition) {
      let conditionTip = '';
      switch (+condition) {
        case -1:
          conditionTip = '订单取消';
          break;
        case 0:
          conditionTip = '未接单';
          break;
        case 1:
          conditionTip = '已接单';
          break;
        case 2:
          conditionTip = '已取件';
          break;
        case 3:
          conditionTip = '已送至平台';
          break;
        case 4:
          conditionTip = '已邮寄';
          break;
      }
      return { conditionTip };
    }
  }
};
</script>

<style lang="scss">
page {
  background: $page-color-base;
}
.row {
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 30upx;
  height: 110upx;
  background: #fff;

  .tit {
    flex-shrink: 0;
    width: 120upx;
    font-size: 30upx;
    color: $font-color-dark;
  }
  .input {
    flex: 1;
    font-size: 30upx;
    color: $font-color-dark;
  }
  .icon-shouhuodizhi {
    font-size: 36upx;
    color: $font-color-light;
  }
}
</style>
