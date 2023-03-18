export default{
  template:`
  <div @click="btnClick">
    <h2>{{message}}</h2>
  </div>
  `,
  data(){
    return {
      message:"zhangheng"
    }
  },
  methods: {
    btnClick(){
      console.log("new的写法");
    }
  },
 };