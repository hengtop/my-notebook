<template>
    <div class="">
      <h2 :class="$attrs.class" @click="handel">头部</h2>
      {{name}}--{{length.value}}
    </div>
</template>

<script type="text/ecmascript-6">
import emitter from "@/eventBus.js"
export default {
    inheritAttrs:false,
    name:'',
    props:{
    },
    //vue3新增的写法，注册需要传给父组件的事件名，也可以使用对象写法(可以对传入的额参数进行一些验证)
    //emits:["add"],
    emit:{
        add:null,
        someE: (age) => {
            if(age > 10) {
                return true
            }
            return false
        }
    },
    inject:['name', 'length'],
    data () {
        return {}
    },
    created () { 
        emitter.on('zhang', (e) => {
            console.log(e);
        })
        //监听所有事件
        emitter.on('*', (type, info) => {
            console.log(type, info);
        })
        //取消事件监听
        
    },
    mounted () { },
    methods: {
        handel() {
            this.$emit("add");
        }
    },
    components: {}
}
</script>

<style lang="less" scoped>
</style>
