<template>
  <view class="content">
    <text style="display: block; padding: 16upx 30upx 10upx; lihe-height: 1.6; color: #fa436a; font-size: 24upx">选择你的收货地址，校园大使会将包裹送至此地址。</text>
    <!-- 地址 -->
    <navigator url="/pages/address/address?source=1" class="address-section">
      <view class="order-content">
        <text class="yticon icon-shouhuodizhi"></text>
        <view class="cen">
          <view class="top">
            <text class="name">{{ addressData.name }}</text>
            <text class="mobile">{{ addressData.phone }}</text>
          </view>
          <text class="address">{{ addressData.school }} {{ addressData.dom }}</text>
        </view>
        <text class="yticon icon-you"></text>
      </view>
      <image
        class="a-bg"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvVHce/1/deXzuJHSdOM+fhpKMllI2SkTZpV6ULYrCHQGwrf41p/LENVk3QTipSWujKoyot1aQN0FYQQxtsMCS2SVuqsfFYHxBKYQNGV9ouZdA8nDipH4mT+HFf+51rO0pN0japrw9HreLe3Pqc3/me3+f3uFdIvfVuDIAPix1C9oceicFRVQWlvRWCkL1omqb1Of9z9rXZY65rhcO6x5ove19oWkX/RAaSMLOEkg+2Zt0wEcvoWOZzYZnXeWEbzmP7XPs11//LnOiDEY9DkGRwGw5a59QUTM2As+1qiD5v0TUvvC9Bc52KpmDSnju4ic7+CIinNVQoElYtcUM8jx2L1bzwPn14DOrHZ0hzEdxOPJtW16FH45CvuBzyZU22aH7Od9LnU/E0xpMqJG6iZ309qeqYNoA1gTJ4ZdF2zY2pJNSTfYCmkb85+GnO1hIbh+DzQVndaiHYTs3ZGJpifE/DyVnzi+X7pWqen8/i+8kPYUSjEORPCd9XtUKs9Fi+KMxjVzE0n9ZNnIgkYXwK+B5LafC4JKyudcMxD2+LqblGfNcY30VxJsfhcOCJ7xr02ATkluXE96DtmrPvPxFLIUH7zY3vOc0Z39O0oGtqy1DlFIuu+Zx8P/Ffa8/hEBey4rh0uuPWS6S6CRUhyGjG0hcfOWex+c9zXSsE5HmFzseP3H294Sl847VBRGJJQHTwy9wJNKAE7otLfXi2K3hRgeB81+bar8IDEPvFMxi6cxebnMx2cjrnDmiIwUAGDTvugX9de9E1L7R9NK1jc+8gnj8dy2rOKY/JRhgV8Cr405ea0HEBOxajeaHtySPvYvD2bUgdP0lmuzkl7oLl6Wn0wX/Dd1D/xG5bNc/f+7NjY9jyzghlM5QxS/ySOGt+Wlt3WwDXBz22a86gHrqjG7Hnekhz5uciN9NVDEBxXYng87vgEoqveZ7y+XsPE99vOTyAs1SkU+bOT3NKIJHUsIb4/rsL8L0YmrMRffQ3GNn8c6L7BOnu4pW10/xR4nsK9T+5FzWda2fXcEXTfLbtYUrc7joSwguno9kilZfsLNmgtaBcxv7rmudN2i9Fc8YRlsvkr6aOvoeBHxDf//MBzVfGke9p8vVhVN2wAQ1P7rFdczYeO34Wm4+Gsr4mcqzWMqQ5IX5rex3W1pUXX/PCRlwkjpEtDyLy9B8sPxcgLWzFpy7rWlTH3eq66AbUj0fh7lyJhn27oFzVck41mTdgdnU5+3fzbczsqqVwQ14aSuCrhwZoo3UEqCLW6biZJZZZom0e0UhlSiY3rvBjd0cdfLJjTrsXYvN8e5TvPEZ2PYbw9l9CrKqAWFNB+2+W/oiTc2l9BFefC/WPdqPyuxts1/zMlIrbqVB7OZSgaSWrC2eUWHUGcLa2MVrLyho3ftvVhNYq1ye6J8XUnI3JFw8idNdOaB+GIS+vsZhf6gMvsP1OJKGFx1H9o1sQeOSBXOcfc9pQDM3Z2PGvEeykxJ0l7AGaTyux4YKVLpOvs0BO/v0UQf17LdUzwdcskuaFHRo1NIrQxq1I9ByEc2kj+ZwDZsk1z/H9I+L7us+j4fHdUFa2FF3zQtv3DyTwrTcGoVFxXOeWKZEoPeNm+E66b7zSj71r6+ERHXN21C5V85nPmo7I3scRvncfxOoyiP7y0vNdyMZ17X9xmGR+43MPwvvtm23XnPH9h68P4u8U2yuJ7wonvmu0pigValf73XhmfRCt1S5bNbd6QK/0ov+2bhjDE8T3aj58p5hujCehjsZQs+lWLNl5N0RvuS2a5z/T8cLOd8K4/72wxdaAXHq+syGT7sOM7xLxvaOe+F5lu+bqYBjDd25H4s+vQ26ugSBL1lsEC+m4C8fQvMhXZXTa/CR8N96MekrapWCdvc1t+rvn32PY3juYrc7cEjjonFuMYQm97QsBPLSq1v7pKJAPbbwHZ3ueoqCyhJIJStqto8/BdMTh8q1A8PcPo+xrXbbP97ehSXydFWpjU0CZzO8xInM+CqSdTV688OVmBBT7O6DRh/dhYOt20nqSdK+f1RIqdRMqRXgrR90Dm+Dfsdn2+QYpeH7/8CBe+mAsq7nIsevKEjivgv1dQdzYUGH7dMlXe3FmwxZMTRyFgiZkW48mF0/XMYWqm75JfH8IUmPA1tlUMnHv+8T3N3J8d3Hkey6I3re6Djvaam1v/urhswjdsQ2jf/kVJRI1xHdPrh1lltzTWUxXai5H07N74P7KettnPDQyjWtf/ohglyJfl7jz/drP+vDrzgYsLZdtP2PRnz6B/u4t9I+U9cYCH81hddoFuBG4bxNq7v9xSfh+G/H9wKkIwF5JkR38fF3VLb73dDXhpsYS8P0Vxve7MZ14E04EkX2SumDj40Lkjz2LS9x1nZVqcK1rh1L/GaiZDB1GYwGPRi9+sA4r63odGEjAoKTZS0mTwUtoS2sTPioc1jd64KJqNZXRP9EtLFrLT5KQOd6H1JtvQ/SUQ1CUC1Z/tjp5MgXn51bAfc1VpAUVb6pqi+bsqRlrOB0ITSI0kUa1IvF7JcribPbxZnt9BYIeBZm0ap1BO2yHLMOIxjH111chmDocXg9XzZFR4fD74e5cA9GtQEulbLGbfaNMvv4+BfG3hiet9wxlUeDGdDPn68uqXVgVKKezbiBN/HHYoTnrqlORkDx0BHr/ABzVVbknbZysZ3wnRVyda6HU1UIjvpt28p2C+T+GEtYeeEh3jqcdKjl2BcWY65q9UAQb+c6+k3iePnaS+P5Pq8spOJ38fJ09RVI1OFuWo6xtJXSD+J6xh++OHN8PEt8HxtNY4pbAczC+m2Rnh8V3J9Q0Fa4LeG97YQdehj4aoSL9NZiZNMTKStp6g5/x5NsW37vWQaS1WXzPHvjihzYS/lgshbeJ75WySHm7wNXXk8SbK/xutOX4ntHtYRxE0eJn6uARaGf6ie++7GPNxVkf/78AAwCn1+RYqusbZQAAAABJRU5ErkJggg=="
      ></image>
    </navigator>

    <view class="row b-b">
      <text class="tit">佣金</text>
      <input class="input" type="digit" v-model="address.price" placeholder="一公斤以内1.5元,1-2公斤2.5元,2-4公斤4元,其他自定" placeholder-class="placeholder text-sm" />
    </view>
    <view class="row b-b">
      <text class="tit">地址</text>
      <input class="input" v-model="address.from" placeholder="简要描述取件地址" placeholder-class="placeholder text-sm" />
    </view>
    <view class="cu-bar bg-white"><view class="action">身份认证</view></view>
    <view class="cu-form-group">
      <view class="grid col-4 grid-square flex-sub">
        <view
          class="padding-xs bg-img"
          :style="[{ backgroundImage: 'url(' + host + '/' + imgList[index] + ')' }]"
          v-for="(item, index) in imgList"
          :key="index"
          @tap="ViewImage"
          :data-url="host + '/' + imgList[index]"
        >
          <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index"><text class="cuIcon-close"></text></view>
        </view>
        <view class="padding-xs solids" @tap="ChooseImage" v-if="imgList.length == 0"><text class="cuIcon-cameraadd"></text></view>
        <text class="text-sm placeholder" v-if="imgList.length == 0">请提交一卡通信息</text>
      </view>
    </view>
    <view class="cu-bar bg-white"><view class="action">快递短信</view></view>
    <view class="cu-form-group"><textarea maxlength="-1" v-model="address.msg" :placeholder="msg" placeholder-class="placeholder text-sm"></textarea></view>
    <button class="add-btn" @click="confirm">提交</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      host: '',
      address: {
        price: '',
        from: '',
        msg: ''
      },
      addressData: {
        name: '点击选择收货地址',
        phone: '',
        school: '',
        dom: ''
      },
      msg: '请将快递短信粘贴在这里^_^',
      imgList: []
    };
  },
  onLoad(option) {
    this.host = this.$host;
  },
  methods: {
    ChooseImage() {
      if (this.imgList.length === 1) {
        uni.showToast({
          title: '只能添加一张图片',
          icon: 'none'
        });
      } else {
        uni.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: res => {
            uni.uploadFile({
              url: `${this.host}/upload`,
              filePath: res.tempFilePaths[0],
              name: 'file',
              formData: {},
              success: file => {
                let data = JSON.parse(file.data);
                console.log(data);
                // let img = `${this.$host}/${data.info}`;
                if (data.status === 1) {
                  this.imgList.push(data.info);
                } else this.$api.msg('照片上传错误');
              }
            });
          }
        });
      }
    },
    ViewImage(e) {
      let arr = [];
      for (let img in this.imgList) {
        arr.push(`${this.host}/${this.imgList[img]}`);
      }
      uni.previewImage({
        urls: arr,
        current: e.currentTarget.dataset.url
      });
    },
    DelImg(e) {
      uni.showModal({
        title: '确认删除',
        content: '确定要删除这张照片么？',
        cancelText: '取消',
        confirmText: '确定',
        success: res => {
          if (res.confirm) {
            this.imgList.splice(e.currentTarget.dataset.index, 1);
          }
        }
      });
    },
    //提交
    confirm() {
      const { price, from, msg } = this.address;
      if (this.addressData.name == '点击选择收货地址') {
        this.$api.msg('请选择收货位置');
        return;
      }
      if (!price || price < 1.5) {
        this.$api.msg('请填写正确佣金');
        return;
      }
      if (!from) {
        this.$api.msg('请填写正确取件地址');
        return;
      }
      if (this.imgList.length < 1) {
        this.$api.msg('请上传一卡通身份信息');
        return;
      }
      if (!msg) {
        this.$api.msg('请填写取件信息');
        return;
      }

      console.log(price, from, msg, this.imgList, this.addressData);
      // 封装传递数据 类别*（-4、账户充值，-3、开卡，-2、代发，-1、代取，0.考试，1.旅游，2.水果）
      let obj = JSON.stringify({ from: from, location_id: this.addressData.id, total: 1, money: price, img: this.imgList[0], key: msg, type: -1 });
      // 提交支付信息
      // 支付类别 0、资金充值、1、发布代取快递，2、快递代发、3、考试下单、旅游下单，水果下单
      uni.navigateTo({ url: `../money/pay?kind=0&type=1&order=${obj}` });
    }
  }
};
</script>

<style lang="scss">
/* 分类 */
.cate-section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  padding: 30upx 22upx;
  background: #fff;
  .cate-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: $font-sm + 2upx;
    color: $font-color-dark;
  }
  /* 原图标颜色太深,不想改图了,所以加了透明度 */
  image {
    width: 80upx;
    height: 80upx;
    margin-bottom: 14upx;
    border-radius: 50%;
    opacity: 1;
    box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.1);
  }
}
page {
  background: $page-color-base;
  padding-top: 16upx;
}

.address-section {
  padding: 30upx 0;
  background: #fff;
  position: relative;

  .order-content {
    display: flex;
    align-items: center;
  }

  .icon-shouhuodizhi {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90upx;
    color: #888;
    font-size: 44upx;
  }

  .cen {
    display: flex;
    flex-direction: column;
    flex: 1;
    font-size: 28upx;
    color: $font-color-dark;
  }

  .name {
    font-size: 34upx;
    margin-right: 24upx;
  }

  .address {
    margin-top: 16upx;
    margin-right: 20upx;
    color: $font-color-light;
  }

  .icon-you {
    font-size: 32upx;
    color: $font-color-light;
    margin-right: 30upx;
  }

  .a-bg {
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 5upx;
  }
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
.default-row {
  margin-top: 16upx;
  .tit {
    flex: 1;
  }
  switch {
    transform: translateX(16upx) scale(0.9);
  }
}
.add-btn {
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
