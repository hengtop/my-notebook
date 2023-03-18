import {debounce} from './utils'
import { POP, NEW, SELL } from "./const";
//这个混入的作用是为了减少代码的复用
export const itemRefreshMixin = {
  mounted() {
     //防抖
      const refresh = debounce(this.$refs.scroll.pullingRefresh,200);
      this.detailRefresh = () =>{refresh(); console.log('我是mixin中的函数哦！')}
     //接收事件总线传来的事件
     this.$bus.$on('imgHasLoad',
      //console.log('hasload');
      //这个方法要写到mounted中写在created中可能会因为找不到this.scroll而报错
      //防止出现上拉卡顿问题(这个每加载一张图片就执行刷新)
      this.detailRefresh
    )
  },
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
