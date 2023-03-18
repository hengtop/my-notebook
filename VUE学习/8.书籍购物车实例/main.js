
const app = new Vue({
  el:'#app',
  data:{
    list:[
      {
        id:1,
        name:'空之境界',
        date:'2016-1',
        price:108.00,
        count:1
      },
      {
        id:2,
        name:'秒速五厘米',
        date:'2014-5',
        price:54.00,
        count:1
      },
      {
        id:3,
        name:'你的名字',
        date:'2016-5',
        price:39.00,
        count:1
      },
      {
        id:1,
        name:'FATEHF',
        date:'2019-1',
        price:299.00,
        count:1
      }
    ]
    
  },
  methods: {
    add(index){
      this.list[index].count++;
    },
    sub(index){
      this.list[index].count--;
    
    },
    removeClick(index){
      this.list.splice(index,1);
    }
  },
  computed: {
    totalPrice(){
      //let totalPrice=0;

      /* //1.普通的for方法
      for(let i=0;i<this.list.length;i++){
        totalPrice += this.list[i].price*this.list[i].count;
      }
      //2.for in方法，这个i还是拿到的数组的索引值
      for(let i in this.list){
        totalPrice+=this.list[i].price*this.list[i].count; 
      } */
      //3.for of 方法，这个item就是直接拿到的数组里的对象了（在这里更推荐这样的方法）
     /*  for(let item of this.list){
        totalPrice+=item.price*item.count;
      }

        return totalPrice; */
      //4.这里就活学活用，使用高阶函数来实现
      return this.list.reduce(((preValue, item ) => preValue+item.price*item.count),0);
     
      
      
    }
  },
 
  //过滤器，就像是一个工具，写在变量后面用 | 隔开，将变量传进去做处理
  filters:{
    showPrice(price){
      return '￥'+price.toFixed(2);
    }
  }

});