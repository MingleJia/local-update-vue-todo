<template>
    <div class="helper">
        <span class="left">{{unfinishedTodoLength}} items left</span>
        <span class="tabs">
            <!-- v-for  map foreach 耗时耗资源，下次循环时 如果key相同 会复用原有的节点，不需重新生成新节点 -->
            <span
              v-for="state in states"
              :key="state"
              :class="['state',filter === state ? 'actived' :'']"
              @click="toggleFilter(state)"
            >{{state}}</span>
        </span>
        <span class="clear" @click="clearAllCompleted">clear Completed</span>
    </div>
</template>
<script>
export default {
    props:{
        filter:{
            type:String,
            required:true,
        },
        todos: {
            type:Array,
            required:true,
        }
    },
    data() {
        return {
            states:['all','active','completed']
        }
    },
    computed: {
        unfinishedTodoLength(){
            return this.todos.filter(todo => !todo.completed).length;
        }
    },
    methods:{
        toggleFilter(state){
            this.$emit('toggle',state)
        },
        clearAllCompleted(){
            this.$emit('clearAllCompleted')
        },
    }
}
</script>
<style lang="stylus" scoped>
.helper 
    font-weight 100
    display flex
    justify-content space-between
    padding 5px 0
    line-height 30px
    background-color #ffffff
    font-size 14px
    font-smoothing: antialiased;
.left, .clear, .tabs
    padding 0 10px
    box-sizing border-box
    font-weight bold
.left, .clear
    width 150px
.left
    text-align left
.clear 
    text-align: right
    cursor pointer
.tabs
    width 200px
    display flex
    justify-content space-around
    *
        display inline-block
        padding 0 10px
        cursor pointer
        border 1px solid rgba(175, 47, 47, 0)
        &.actived 
            border-color rgba(175, 47, 47, 0.4)
            border-radius 5px
</style>

