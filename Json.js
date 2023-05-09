/* 用户 */
const userInfo = {
  status: 1,
  data: {
    id: 1,
    mobile: 18888888888,
    nickname: '风继续吹',
    portrait: 'https://img3.duitang.com/uploads/item/201606/25/20160625110434_JwB3G.thumb.700_0.jpeg'
  },
  msg: '提示'
};
/* 首页轮播图 */
const carouselList = [
  {
    src: '/static/temp/banner2.jpg',
    background: 'rgb(205, 215, 218)'
  },
  {
    src: '/static/temp/banner3.jpg',
    background: 'rgb(203, 87, 60)'
  },
  {
    src: '/static/temp/banner4.jpg',
    background: 'rgb(183, 73, 69)'
  }
];
/* 商品列表 */
const goodsList = [
  {
    image:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg',
    image2: 'http://pic.rmb.bdstatic.com/819a044daa66718c2c40a48c1ba971e6.jpeg',
    image3: 'http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg',
    title: '古黛妃 短袖t恤女夏装2019新款韩版宽松',
    price: 179,
    sales: 61
  }
];

/* 购物车 */
const cartList = [
  {
    id: 1,
    image: 'https://img3.duitang.com/uploads/item/201606/25/20160625110434_JwB3G.thumb.700_0.jpeg',
    attr_val: '特级吾皇',
    stock: 7,
    title: '抱朕 还等朕翻你牌子吗',
    price: 58.8,
    number: 10
  }
];
//详情展示页面
const detailData = {
  title: '纯种金毛幼犬活体有血统证书',
  title2: '拆家小能手 你值得拥有',
  favorite: true,
  imgList: [
    {
      src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg'
    },
    {
      src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg'
    },
    {
      src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg'
    },
    {
      src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg'
    }
  ],
  episodeList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  guessList: [
    {
      src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg',
      title: '猫眼指甲油',
      title2: '独树一帜的免照灯猫眼指甲'
    }
  ],
  evaList: [
    {
      src: 'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg',
      nickname: 'Ranth Allngal',
      time: '09-20 12:54',
      zan: '54',
      content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。'
    }
  ]
};
const shareList = [
  { type: 1, icon: '/static/temp/share_wechat.png', text: '微信好友' },
  { type: 2, icon: '/static/temp/share_moment.png', text: '朋友圈' },
  { type: 3, icon: '/static/temp/share_qq.png', text: 'QQ好友' },
  { type: 4, icon: '/static/temp/share_qqzone.png', text: 'QQ空间' }
];
const lazyLoadList = [
  {
    src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg'
  }
];

const orderList = [
  {
    time: '2019-04-06 11:37',
    state: 1,
    goodsList: [
      {
        title: '古黛妃 短袖t恤女 春夏装2019新款韩版宽松',
        price: 179.5,
        image: 'https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg',
        number: 1,
        attr: '珊瑚粉 M'
      }
    ]
  }
];
const cateList = [
  {
    id: 1,
    name: '手机数码'
  },
  {
    id: 25,
    pid: 3,
    name: '男装'
  },
  {
    id: 27,
    pid: 25,
    name: '男士T恤',
    picture: '/static/temp/cate13.jpg'
  }
];

export default {
  carouselList,
  cartList,
  detailData,
  lazyLoadList,
  userInfo,
  shareList,
  goodsList,
  orderList,
  cateList
};
