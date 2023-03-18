<template>
  <div id="category">
    <navBar class="nav-bar">
      <div slot="center">商品分类</div>
    </navBar>
    <div class="content">
<leftBar :categories="categories" @selectItem="selectItem"></leftBar>
    <betterScroll class="goods-item" :data="[categoryData]" ref="scroll">
      <div>
        <goodsItemList :subcategories="showSubcategory"></goodsItemList>
        <tabControl :titles="['综合', '新品', '销量']" @itemClick="tabClick"></tabControl>
        <goodsList :goods="showCategoryDetail"></goodsList>
      </div>
    </betterScroll>
    </div>
    
  </div>
</template>

<script type="text/ecmascript-6">
import navBar from "components/common/navBar/navBar";
import leftBar from "./childComps/leftBar";
import goodsItemList from "./childComps/goodsItemList";
import tabControl from "components/content/tabControl/tabControl";
import goodsList from "components/content/goods/goodsList";

import betterScroll from "components/common/betterScroll/betterScroll";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";
import { POP, SELL, NEW } from "common/const";
import { tabControlMixin } from "common/mixin";

export default {
  name: "category",
  mixins: [tabControlMixin],
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      saveY:0,
      categoryRefresh:null,
    };
  },
  created() {
    this._getCategory();
    // 2.监听图片加载完成
    this.$bus.$on("imgHasLoad", () => {
      this.$refs.scroll.pullingRefresh();
    });
  },
  activated() {
    console.log('active');
    this.$refs.scroll.pullingRefresh();//刷新一下
    this.$refs.scroll.scrollTo(0,this.saveY);
  },
  deactivated() {
    console.log('deactive');
    this.saveY = this.$refs.scroll.getScrollY();//保证从detail切换回来高度仍在原来的位置
    this.$bus.$off('imgHasLoad',this.categoryRefresh);
  },
  destroyed() {
    this.$bus.$off("imgHasLoad", this.detailRefresh);
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },
  methods: {
		  _getCategory() {
		    getCategory().then(res => {
		      // 1.获取分类数据
		      this.categories = res.data.data.category.list
			    console.log(res);
			    // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
		    const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data.data;
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
        })
      },
      _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res.data;
          this.categoryData = {...this.categoryData}
        })
      },
      /**
       * 事件响应相关的方法
       */
      selectItem(index) {
        this._getSubcategories(index)
      }
    },
  components: {
    navBar,
    leftBar,
    goodsItemList,
    betterScroll,
    tabControl,
    goodsList,
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.goods-item {
  height:calc(100vh - 93px);
   overflow: hidden;
  flex: 1;
}
.content{
  display: flex;
}
</style>
