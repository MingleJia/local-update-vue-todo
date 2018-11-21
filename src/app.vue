<template>
    <div id="app">
        <div id="cover"></div>
        <HeaderCom></HeaderCom>
        <Todo></Todo>
        <FooterCom></FooterCom>
    </div>
</template>
<script>
import HeaderCom from './todo/header.vue';
import FooterCom from './todo/footer.jsx';
import Todo from './todo/todo.vue';

export default {
    data(){
        return {
            text:'abc',
        }
    },
    components: {
        HeaderCom,
        FooterCom,
        Todo,
    }
    // render() { // template
    //     createElement(); // 一层层遍历template中的标签、上面的属性、内部的值，最终得到整个组件的所有节点的树
    // }
}
</script>
<style lang="stylus" scoped>
    #app
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    #cover
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color #555
        opacity 0.5
        z-index -1
</style>

