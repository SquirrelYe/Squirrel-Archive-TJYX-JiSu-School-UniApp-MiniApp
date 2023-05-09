<template>
  <view>
    <view class="bg-white padding margin-top-xs">
      <view class="cu-steps">
        <view class="cu-item" :class="index <= log.condition ? 'text-orange' : ''" v-for="(item, index) in basicsList" :key="index">
          <text class="cuIcon-title"></text>
          {{ item.name }}
        </view>
      </view>
    </view>
    <view class="cu-form-group">
      <view class="title">订单状态</view>
      <view class="title">{{ log.conditionTip }}</view>
    </view>
    <view class="cu-form-group" v-if="log.condition != 0" @click="call(log.user.phone)">
      <view class="title">校园大使</view>
      <view class="title">{{ log.user.name }}</view>
    </view>
    <view class="cu-form-group">
      <view class="title">收货人</view>
      <view class="title">{{ loc.name }}</view>
    </view>
    <view class="cu-form-group">
      <view class="title">取件地址</view>
      <view class="title">{{ log.from }}</view>
    </view>
    <view class="cu-form-group">
      <view class="title">收货地址</view>
      <view class="title">{{ loc.school }} {{ loc.dom }}</view>
    </view>
    <view class="cu-form-group">
      <view class="title">电话</view>
      <view class="title">{{ loc.phone }}</view>
    </view>
    <view class="cu-form-group">
      <view class="title">数量</view>
      <view class="title">{{ log.total }}</view>
    </view>
    <view class="cu-form-group">
      <view class="title">价格</view>
      <view class="title">￥{{ log.money }}</view>
    </view>
    <view class="cu-form-group align-start">
      <textarea maxlength="-1" disabled :placeholder="log.key"></textarea>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      basics: 3,
      basicsList: [
        { icon: 'usefullfill', name: '未领单' },
        { icon: 'radioboxfill', name: '已领单' },
        { icon: 'subscription', name: '已取件' },
        { icon: 'subscription', name: '待送达' },
        { icon: 'roundcheckfill', name: '已完成' }
      ],
      loc: {},
      log: {}
    };
  },
  onLoad(options) {
    console.log(options);
    this.loc = JSON.parse(options.loc);
    let log = JSON.parse(options.log);
    //添加不同状态下订单的表现形式
    this.log = Object.assign(log, this.orderConditionExp(log.condition));
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
          conditionTip = '待送达';
          break;
        case 4:
          conditionTip = '已完成';
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
