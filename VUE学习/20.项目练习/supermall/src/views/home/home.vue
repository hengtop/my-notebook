<template>
  <div id="home">
    <!--在home这里设置一个单独的样式-->
    <navBar class="home-nav">
      <div slot="center">购物街</div>
    </navBar>
    <tabControl v-show="isTabControl" 
                 ref="tabControl1"
                :titles="['流行','新款','精选']" 
                @tabClick="tabClick"
                class="tabcontrol"
                ></tabControl>
    <betterScroll class="content" 
                  ref="scroll" 
                  :probeType="3" 
                  @scroll="contentScroll"
                  :pullUpLoad="true"
                  @pullingUp="contentPullingUpMore"
                  >
    <homeSwiper :banners="banners"
                @BaImgLoad="getTop"></homeSwiper>
    <homeRecommendView :recommends="recommends"
                       @reImgLoad="getTop"></homeRecommendView>
    <homeFeatureView></homeFeatureView>
    <tabControl 
                ref="tabControl2"
                :titles="['流行','新款','精选']" 
                @tabClick="tabClick"
                ></tabControl>
    <goodsList :goods="showGoods"></goodsList>
    </betterScroll>
    <backTop v-show="showBackTop" @click.native="backClick"></backTop>
  </div>
</template>

<script type="text/ecmascript-6">
import navBar from 'components/common/navBar/navBar'
import tabControl from 'components/content/tabControl/tabControl'
import goodsList from 'components/content/goods/goodsList'
import betterScroll from 'components/common/betterScroll/betterScroll'
import backTop from 'components/content/backTop/backTop'

import {getHomeMultidata,getHomeGoods} from 'network/home'

import homeSwiper from './childComps/homeSwiper'
import homeRecommendView from './childComps/homeRecommendView'
import homeFeatureView from './childComps/homeFeatureView'
import {debounce} from 'common/utils'
import {itemRefreshMixin} from 'common/mixin'
export default {
  name:'home',
  mixins:[itemRefreshMixin],//mounted中的代码就不用写了
  data() {
    return {
      //result:null//用来保存请求过来的数据
      //这里来细分传过来的数据
      banners:[],
      recommends:[],
      titles:[],
      //首页下方商品数据
      goods:{
        'pop':{
           page:0,
           list:[]
        },
        'new':{
           page:0,
           list:[]
        },
        'sell':{
           page:0,
           list:[]  
        },
      },
      //设置点击切换商品类别
      currentType:'pop',
      type:['pop','new','sell'],
      showBackTop:false,
      offSetTop:0,
      isTabControl:false,
      saveY:0,
      homeRefresh:null
      
    }
  },
  //在组建创建完时请求
  created() {
    this.getHomeMultidata();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted() {
     //直接用mixin中的代码
    /* const refresh = debounce(this.$refs.scroll.pullingRefresh,200);
    this.homeRefresh = () =>{refresh(); console.log('我是home中的函数哦！')}//将这个函数提出来好传入
     //接收事件总线传来的事件 
    this.$bus.$on('imgHasLoad', 
      //console.log('hasload');
      //这个方法要写到mounted中写在created中可能会因为找不到this.scroll而报错
      this.homeRefresh 
    ) */
  },
  activated() {
    console.log('active');
    this.$refs.scroll.pullingRefresh();//刷新一下
    this.$refs.scroll.scrollTo(0,this.saveY);
    
  },
  deactivated() {
    console.log('deactive');
    this.saveY = this.$refs.scroll.getScrollY();
    //console.log(this.saveY);
    //取消全局事件的监听，就避免了在detail中还触发了home中的imgLoad的事件了导致home刷新了（其实影响不大，主要是感觉不合理）
    //在goodsListItm中也可以使用判断路由的方式解决这个问题
    //但是这个取消也不能把所有地方的监听取消掉，所以这个方式还要传一个函数这个函数就是要取消事件对应的回调函数
    this.$bus.$off('imgHasLoad',this.homeRefresh);
  },
  methods: {
    /*事件监听相关方法*/
    //这个函数是防抖动的函数,函数被封装到了工具类中
    /* debounce(fun,delay){
      let timer = null;
      return function(...args){
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
          fun.apply(this,args);
        }, delay);
      }
      
    }, */
    
    //设置吸顶效果要先获取组件的offsetTop
    getTop(){
      this.offSetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log(this.offSetTop)
    },
    tabClick(index){
      //console.log(index); 
      this.$refs.tabControl1.nowIndex = index;
      this.$refs.tabControl2.nowIndex = index;
      return this.currentType = this.type[index];
      //同步两个相同组件的状态
     
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500);//第三个参数是返回完成的时间
    },
    contentScroll(position){
      this.showBackTop = position.y < -1000;//设置返回顶部图标何时显示
      this.isTabControl = position.y-44 < -this.offSetTop;//这里顺便设置下吸顶效果了
    },
    contentPullingUpMore(){
      console.log('小姐姐快出来呀！');
      this.getHomeGoods(this.currentType);
    },
   
    /*网络请求相关方法*/ 
    //将created中的函数封装到这里来
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        //console.log(res);y
        this.banners=res.data.data.banner.list;
        this.recommends=res.data.data.recommend.list;
      })
    },
    getHomeGoods(type){
       const page = this.goods[type].page + 1;
       getHomeGoods(type,page).then(res => {
          //console.log(res);
          //注意这里不能直接赋值，会覆盖之前的数据，使用push方法，这里有个新语法，就是把数组中的内容依次push到新数组中  
         this.goods[type].list.push(...res.data.data.list);
         this.goods[type].page += 1;
         this.$refs.scroll.loadFinish();//确保数据可连续加载(完成一次上拉加载)
         //this.$refs.scroll.pullingRefresh();//防止出现上拉卡顿问题(这个是请求完一组数据后再刷新)
         console.log(this.goods[type].list)
      })  
    }
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list;
    }
  },
  components: {
    navBar,
    homeSwiper,
    homeRecommendView,
    homeFeatureView,
    tabControl,
    goodsList,
    betterScroll,
    backTop
  }
}
</script>

<style scoped>
/*scoped作用域，只对当前组件内的元素其效果*/
#home{
  /*撑开由于上导航栏脱离文档流造成的高度塌陷*/
 padding-top: 44px;
 /*视口高度*/
 height: 100vh;

}

.home-nav{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
  background-color:var(--color-tint);
  color: white;
}
.tabcontrol{
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 9;
}
.content{ 
  
  height:calc(100% - 49px);
  overflow: hidden;

}
 .isactive{
  color: var(--color-tint);
  padding: 0 3px 5px 3px;
  border-bottom: 2px solid var(--color-tint);
  transition: all 0.2s;
}
</style>
