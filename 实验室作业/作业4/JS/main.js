
const app= new Vue({
  el:'#app',
  data:{
    //商品列表
    goodsList:[
      {
        id:'乐视TV-40英寸X40C',
        price:2099.00,
        counter:1,
        img:'./img/lsdianshi.jpg',
        isActive:false,
        
      },
      {
        id:'小米电视2 55寸',
        price:1999.00,
        counter:1,
        img:'./img/xiaomidianshi.jpg',
        isActive:false
      },
      {
        id:'飞利浦 (PHILIPS) 55UFED',
        price:5299.00,
        counter:1,
        img:'./img/feilipudianshi.jpg_220x220.jpg',
        isActive:false
      },
      {
        id:'飞利浦 (PHILIPS) 55UFED',
        price:5299.00,
        counter:1,
        img:'./img/feilipudianshi.jpg_220x220.jpg',
        isActive:false
      },
      {
        id:'飞利浦 (PHILIPS) 55UFED',
        price:5299.00,
        counter:1,
        img:'./img/feilipudianshi.jpg_220x220.jpg',
        isActive:false
      }
    ],
    //为全选按钮设置样式添加判断
    isActive:false,
    //打印金额
    printPrice:0,
    change:true
  },
  methods: {
    //增加数量
    add(index){
      this.goodsList[index].counter++;
    },
    //减少数量
    sub(index){
      this.goodsList[index].counter--;
    },
    //点击改变选中按钮样式
    checked(index){
      this.goodsList[index].isActive=!this.goodsList[index].isActive;
      //console.log(this.goodsList[index].isActive);
    },
    //全选按钮点击改变样式
    allChecked(){
      this.isActive=!this.isActive;
      for(let item of this.goodsList){
        //其他选项和全选按钮状态一样
        item.isActive=this.isActive;
      }
    },
    //打印样式
    totalMoney(){
      alert( '你一共需要支付'+'￥'+this.printPrice.toFixed(2));
    },
    //设置样式切换
    set(){
      this.change=!this.change;
    },
     //删除商品
     removeGoods(){
       //过滤掉被选中的商品
      this.goodsList= this.goodsList.filter(function (n) {
           return !n.isActive
         })
    }
  },
  //计算属性
  computed: {
    //总价计算
    totalPrice(){
        let totalPrice=0;
        for(let item of this.goodsList){
          if(item.isActive){
            totalPrice+=item.price*item.counter;
          }
      }
      this.printPrice=totalPrice;
      return totalPrice;
    },
    //商品种类数量计算
    totalNumber(){
      let totalNumber=0;
      for(let item of this.goodsList){
        if(item.isActive){
          totalNumber++;
        }
      }
      return totalNumber
    }
  },
  //过滤器，设置价格显示格式
  filters:{
    showPrice(price){
      return '￥'+price.toFixed(2);
    }
  }

});

