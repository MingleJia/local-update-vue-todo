import Vue from 'vue';
import App from './app.vue';
import '../assets/styles/test.css';
import '../assets/images/bgblue.jpg';
import '../assets/styles/test-stylus.styl';

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
    render: (h) => h(App) // h是vue中createElement函数,是用来生成HTML DOM元素,这个函数的作用就是生成一个VNode节点，render函数得到这个VNode节点之后，返回给Vue.js 的 mount 函数，渲染成真实 DOM 节点，并挂载到根节点上。
}).$mount(root);