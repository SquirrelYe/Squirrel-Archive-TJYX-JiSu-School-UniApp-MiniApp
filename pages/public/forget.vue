<template>
  <view class="container">
    <view class="left-bottom-sign"></view>
    <view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
    <view class="right-top-sign"></view>
    <!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
    <view class="wrapper">
      <view class="left-top-sign">FORGET</view>
      <view class="welcome"> 修改密码！ </view>
      <view class="input-content">
        <view class="input-item">
          <text class="tit">手机号码</text>
          <input type="number" placeholder="请输入手机号码" maxlength="11" v-model="mobile" @input="phoneChange()" />
        </view>
        <!-- 输入验证码 -->
        <view class="input-item" v-show="judgeCode && !judgePhone">
          <text class="tit">验证码</text>
          <input type="text" placeholder="请输入收到的手机验证码" placeholder-class="input-empty" v-model="virifycode" />
        </view>
        <!-- 短信验证成功 -->
        <view v-show="judgePhone">
          <view class="input-item">
            <text class="tit">密码</text>
            <input type="text" placeholder="6-16位不含特殊字符的数字、字母组合" placeholder-class="input-empty" maxlength="20" password v-model="password" />
          </view>
          <view class="input-item">
            <text class="tit">确认</text>
            <input type="text" placeholder="再输一次" placeholder-class="input-empty" maxlength="20" password v-model="checkpass" />
          </view>
        </view>
      </view>
      <button class="confirm-btn" :disabled="coding" v-if="!judgeCode" @click="toCode">发送验证码</button>
      <button class="confirm-btn" :disabled="coding" v-if="judgeCode && !judgePhone" @click="toVerify">验证验证码</button>
      <button class="confirm-btn" :disabled="logining" v-if="judgePhone" @click="toForget">确认</button>
    </view>
  </view>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import apis from '../../utils/apis.js';
import wx_api from '../../utils/wx_api.js';
import conf from '../../utils/config.js';

export default {
  data() {
    return {
      code: '', // 验证码

      judgeCode: false, // 判断短信发送状态
      judgePhone: false, // 判断验证码状态

      mobile: '',
      virifycode: '',
      password: '',
      checkpass: ''
    };
  },
  computed: { ...mapState(['userInfo']) },
  onLoad() {},
  methods: {
    ...mapMutations(['getInfo']),
    navBack() {
      uni.navigateBack();
    },
    // 电话号码更改
    phoneChange() {
      this.password = '';
      this.checkpass = '';
      this.virifycode = '';
      this.judgeCode = false;
      this.judgePhone = false;
    },
    // 发送验证码
    async toCode() {
      if (!this.mobile) {
        this.$api.msg('不能输入空哦~');
        return;
      }
      var code = '';
      for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10);
      }
      this.code = code;
      console.log('发送验证码', this.code);
      uni.showLoading({ title: '发送中，请稍等哈~' });
      // 调用短信接口
      let msg = await this.$msg_api.sendRegisterCode(this.mobile, this.code);
      console.log('调用短信接口--->', msg.data);
      if (msg.data.code != 0) {
        this.$api.msg('验证码发送失败~');
        return;
      }
      this.$api.msg('验证信息发送成功！');

      this.judgeCode = true;
    },
    // 验证验证码
    toVerify() {
      console.log(this.virifycode);
      if (this.code != this.virifycode) {
        this.$api.msg('验证输入有误喔~');
        return;
      }
      this.judgePhone = true;
    },
    // 修改密码
    async toForget() {
      const { mobile, password, checkpass } = this;
      if (password !== checkpass) {
        this.$api.msg('两次密码不一样喔');
        return;
      }
      uni.showLoading({ title: '正在提交请求，请稍等~', mask: true });
      // 提交修改密码
      let forget = await this.$apis.user.forgetPass(mobile, password).catch(err => {
        this.$api.msg('修改失败');
        uni.hideLoading();
      });
      console.log(forget.data);
      if (forget.statusCode === 200 && forget.data.upd[0] === 1) {
        this.$api.msg('修改成功');
        uni.hideLoading();
        uni.navigateBack();
      } else {
        this.$api.msg('修改失败');
        uni.hideLoading();
      }
    }
  }
};
</script>

<style lang="scss">
page {
  background: #fff;
}
.container {
  padding-top: 115px;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #fff;
}
.wrapper {
  position: relative;
  z-index: 90;
  background: #fff;
  padding-bottom: 40upx;
}
.back-btn {
  position: absolute;
  left: 40upx;
  z-index: 9999;
  padding-top: var(--status-bar-height);
  top: 40upx;
  font-size: 40upx;
  color: $font-color-dark;
}
.left-top-sign {
  font-size: 120upx;
  color: $page-color-base;
  position: relative;
  left: -16upx;
}
.right-top-sign {
  position: absolute;
  top: 80upx;
  right: -30upx;
  z-index: 95;
  &:before,
  &:after {
    display: block;
    content: '';
    width: 400upx;
    height: 80upx;
    background: #b4f3e2;
  }
  &:before {
    transform: rotate(50deg);
    border-radius: 0 50px 0 0;
  }
  &:after {
    position: absolute;
    right: -198upx;
    top: 0;
    transform: rotate(-50deg);
    border-radius: 50px 0 0 0;
    /* background: pink; */
  }
}
.left-bottom-sign {
  position: absolute;
  left: -270upx;
  bottom: -320upx;
  border: 100upx solid #d0d1fd;
  border-radius: 50%;
  padding: 180upx;
}
.welcome {
  position: relative;
  left: 50upx;
  top: -90upx;
  font-size: 46upx;
  color: #555;
  text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
}
.input-content {
  padding: 0 60upx;
}
.input-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 30upx;
  background: $page-color-light;
  height: 120upx;
  border-radius: 4px;
  margin-bottom: 50upx;
  &:last-child {
    margin-bottom: 0;
  }
  .tit {
    height: 50upx;
    line-height: 56upx;
    font-size: $font-sm + 2upx;
    color: $font-color-base;
  }
  input {
    height: 60upx;
    font-size: $font-base + 2upx;
    color: $font-color-dark;
    width: 100%;
  }
}

.confirm-btn {
  width: 630upx;
  height: 76upx;
  line-height: 76upx;
  border-radius: 50px;
  margin-top: 70upx;
  background: $uni-color-primary;
  color: #fff;
  font-size: $font-lg;
  &:after {
    border-radius: 100px;
  }
}
.forget-section {
  font-size: $font-sm + 2upx;
  color: $font-color-spec;
  text-align: center;
  margin-top: 40upx;
}
.register-section {
  position: absolute;
  left: 0;
  bottom: 50upx;
  width: 100%;
  font-size: $font-sm + 2upx;
  color: $font-color-base;
  text-align: center;
  text {
    color: $font-color-spec;
    margin-left: 10upx;
  }
}
</style>
