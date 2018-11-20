const autoprefixer = require('autoprefixer')
// postcss后处理css文件。已经将stylus文件编译成css之后，再通过postcss去优化css代码（通过一系列的组件去实现，如autoPrefixer）
module.exports = {
    plugins:[
        autoprefixer() // 添加浏览器前缀
    ]
}