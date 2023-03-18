<template>
    <div class="">
      <h2>脚部</h2>
      <button @click="handelEvent">点击</button>
    </div>
</template>

<script type="text/ecmascript-6">
import emitter from "@/eventBus.js"
export default {
    name:'',
    data () {
        return {}
    },
    created () { },
    mounted () { },
    methods: {
        handelEvent() {
            console.log("按钮点击")
            emitter.emit('zhang', {name:'san', age:'18'});
        }
    },
    components: {}
}
</script>

<style lang="less" scoped>
</style>
