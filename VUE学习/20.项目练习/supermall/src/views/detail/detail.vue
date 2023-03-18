<template>
  <div id="detail">
    <detailNavBar class="detail-nav" @titleClick="titleClick" ref="nav"></detailNavBar>
    <betterScroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detailSwiper :topImages="topImages" ref="top"></detailSwiper>
      <detailBaseInfo :goods="goods"></detailBaseInfo>
      <detailShopInfo :shop="shop"></detailShopInfo>
      <detailDesInfo :detailInfo="detailInfo" @desImgLoad="desImgLoad"></detailDesInfo>
      <detailSizeRule :sizeRule="sizeRule" ref="sizeRule"></detailSizeRule>
      <detailCommentInfo :commentsInfo="commentInfo" ref="comment"></detailCommentInfo>
      <goodsList :goods="recommend" ref="recommend"></goodsList>
    </betterScroll>
    <backTop class="back-top-position" v-show="showBackTop" @click.native="backClick"></backTop>
    <detailBottomBar @addToCart="addToCart"></detailBottomBar>
  </div>
</template>

<script type="text/ecmascript-6">
import detailNavBar from "./chileComps/detailNavBar";
import detailSwiper from "./chileComps/detailSwiper";
import detailBaseInfo from "./chileComps/detailBaseInfo";
import detailShopInfo from "./chileComps/detailShopInfo";
import detailDesInfo from "./chileComps/detailDesInfo";
import detailSizeRule from "./chileComps/detailSizeRule";
import detailCommentInfo from "./chileComps/detailCommentInfo";
import detailBottomBar from './chileComps/detailBottomBar'

import betterScroll from "components/common/betterScroll/betterScroll";
import backTop from "components/content/backTop/backTop";
import goodsList from "components/content/goods/goodsList";

import {
  getDetail,
  getRecommend,
  detailGoods,
  detailShop,
  itemParams
} from "network/detail";
import { debounce } from "common/utils";
import { itemRefreshMixin } from "common/mixin";
export default {
  name: "detail",
  mixins: [itemRefreshMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      sizeRule: {},
      commentInfo: [],
      recommend: [],
      detailY: [],
      showBackTop: false,
      detailRefresh: null,
      nowIndex: 0
    };
  },
  mounted() {
    /*  //防抖
      const refresh = debounce(this.$refs.scroll.pullingRefresh,200);
      this.detailRefresh = () =>{refresh(); console.log('我是detail中的函数哦！')}
     //接收事件总线传来的事件 
     this.$bus.$on('imgHasLoad', 
      //console.log('hasload');
      //这个方法要写到mounted中写在created中可能会因为找不到this.scroll而报错
      //防止出现上拉卡顿问题(这个每加载一张图片就执行刷新)
      this.detailRefresh
    ) */
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid;

    //网络请求
    getDetail(this.iid).then(res => {
      const data = res.data.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new detailGoods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new detailShop(data.shopInfo);
      this.detailInfo = data.detailInfo; //这里数据结构简单就没用构造函数
      this.sizeRule = new itemParams(
        data.itemParams.info,
        data.itemParams.rule
      );
      //取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list;
      }
      //console.log(res);
      //console.log(this.topImages);
      //console.log(this.sizeRule);
    });

    getRecommend().then(res => {
      //console.log(res.data.data.list);
      this.recommend = res.data.data.list;
    });
  },
  destroyed() {
    this.$bus.$off("imgHasLoad", this.detailRefresh);
  },

  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 200); //第三个参数是返回完成的时间
    },
    contentScroll(position) {
      this.showBackTop = position.y < -1000; //设置返回顶部图标何时显示

      //设置标题样式和位置同步
      for (let i = 0; i < this.detailY.length - 1; i++) {
        if (
          this.nowIndex != i &&
          this.detailY[i] <= -position.y && -position.y < this.detailY[i + 1]
        ) {
          this.nowIndex = i;
          console.log(this.nowIndex);
          this.$refs.nav.nowIndex = this.nowIndex;
        }
      }
    },
    titleClick(index) {
      this.nowIndex = index;
      this.$refs.scroll.scrollTo(0, -this.detailY[index], 200);
      console.log(-this.detailY[index]);
    },
    //获取每个位置的高度来定位
    desImgLoad() {
      this.detailY = [];
      this.detailY.push(this.$refs.top.$el.offsetTop);
      this.detailY.push(this.$refs.sizeRule.$el.offsetTop);
      this.detailY.push(this.$refs.comment.$el.offsetTop);
      this.detailY.push(this.$refs.recommend.$el.offsetTop);
      this.detailY.push(Number.MAX_VALUE);
    },
    //获取到商品的信息
    addToCart(){
      const product = {};
      product.img = this.topImages[0];
      product.title = this.goods.title;
      product.des = this.detailInfo.desc;
      product.price = this.goods.nowPrice;
      product.iid = this.iid
      //保存到vuex中.不能直接加入到state中
      this.$store.dispatch('addCart',product).then(res =>{
        console.log(res);//这里调用了resolve来返回添加商品提示
        this.$toast.show('添加购物车成功',2000);//这样实现了一行代码调用弹窗
      });
    }
  },
  components: {
    detailNavBar,
    detailSwiper,
    detailBaseInfo,
    detailShopInfo,
    detailDesInfo,
    detailSizeRule,
    detailCommentInfo,
    detailBottomBar,
    betterScroll,
    backTop,
    goodsList
  }
};
</script>

<style scoped>
#detail {
  /*盖住下面的导航栏*/
  position: relative;
  z-index: 99999;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 99999;
  background-color: #fff;
}
.content {
  height: calc(100% - 93px);
  overflow: hidden;
  position: absolute;
  top: 44px; /*这里终于解决了点击第一次时定位不准确的问题而第二次点击就跳转到正常的位置了，但不知道为啥加上这个top就解决了*/
  
}
.back-top-position{
  position: absolute;
  bottom: 118px;
}
</style>
