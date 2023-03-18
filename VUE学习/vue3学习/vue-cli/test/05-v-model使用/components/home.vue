<template>
    <div class="">
    我是home组件
    <br>
    <button @click="changeClick">点击</button>
    <input type="text" v-model="value">
     <br>
    input:{{value}}
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name:'',
    emits:['update:modelValue', 'update:age'],
    props:{
      modelValue:{
        type:String,
        default:""
      },
      age:{
        type:Number,
        default:20
      }
    },
    //使用计算属性来保证父子组件数据双向绑定
    computed:{
      value:{
        set(value) {
          this.$emit("update:modelValue", value)
        },
        get() {
          return this.modelValue  
        }
      }
    },
    data () {
        return {}
    },
    created () { },
    mounted () { },
    methods: {
      changeClick() {
        this.$emit('update:modelValue', 'lisi');
        this.$emit('pdate:age', 123);
      }
    },
    components: {}
}
</script>

<style lang="less" scoped>
</style>
