// 使用绝对路径
const path = require('path'); // path 是webpack基本包
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入插件
// https://blog.csdn.net/lqlqlq007/article/details/83865176
// https://blog.csdn.net/harsima/article/details/80819747
// https://www.imooc.com/qadetail/266655

// const ExtractPlugin = require('extract-text-webpack-plugin'); // 作用：非js代码的东西单独打包成静态资源文件（可单独用于浏览器缓存，或通过js将样式写入浏览器，提高效率）
const miniCssExtractPlugin = require('mini-css-extract-plugin'); // 作用：webpack4中：extract-text-webpack-plugin-->mini-css-extract-plugin

const isDev = process.env.NODE_ENV === 'development';

const config = {
    target:"web",
    // webpack负责打包前端资源
    entry:path.join(__dirname,'src/index.js'),
    output:{
        filename: 'bundle.[hash:8].js',
        path:path.join(__dirname, 'dist'), // __dirname表示当前文件所在路径c
    },
    mode: 'production',
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader',
            },
            {
                test:/\.jsx$/,
                loader:'babel-loader',
            },
            // {
            //     test:/\.css$/,
            //     use: [
            //         miniCssExtractPlugin.loader,
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 url: false
            //             }
            //         }
            //     ]
            // },
            {
                test:/\.css$/,
                use:['style-loader','css-loader'],
                // css-loader：读取css文件内容
                // style-loader：使用<style></style>将css-loader内部样式注入到我们的HTML页面
            },
            // {
            //     test: /\.styl(us)?$/, // 安装stylus-loader stylus
            //     use:[
            //         'style-loader',
            //         'css-loader',
            //         {
            //             loader:'postcss-loader', // 能够编译生成sourceMap 
            //             options: {
            //                 sourceMap:true, // 若stylus-loader已生成source-map，则postcss-loader就不再重新生成
            //             }
            //         },
            //         'stylus-loader' // 能够编译生成sourceMap
            //     ]
            // },
            {
                test:/\.(png|jpg|jpeg|gif|svg)/,
                use:[
                    {
                        loader:'url-loader',
                        // 将图片转化成base64 代码，直接写在js内容里面，而不用生成新的文件，对于小图片有用，可减少http请求
                        options:{
                            limit:1024,
                            name:'[name]-aaa.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // make sure to include the plugin for the magic
        new webpack.DefinePlugin({ // 使用vue框架时 必须要用这个插件
            'process.env': {
                NODE_ENV:isDev?'"development"':'"production"', // 注意单引号内的双引号 
            }
        }),// webpack 环境区分打包，选择不同的源代码进行打包 开发版本中用到错误提示 --加大文件大小，其次，降低代码运行效率
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin()
    ],
}

if(isDev) {
    config.module.rules.push({
        test: /\.styl(us)?$/, // 安装stylus-loader stylus
        use:[
            'style-loader',
            'css-loader',
            {
                loader:'postcss-loader', // 能够编译生成sourceMap 
                options: {
                    sourceMap:true, // 若stylus-loader已生成source-map，则postcss-loader就不再重新生成
                }
            },
            'stylus-loader' // 能够编译生成sourceMap
        ]
    })
    config.devtool = '#cheap-module-eval-source-map',
    config.devServer = { // 启动服务
        // 关于webpack devserver的东西都在此配置
        port:8000,
        host:'0.0.0.0',
        // 可以localhost 127.0.0.1 或者本机内网IP进行访问（可以再他人或者手机访问）如果设置成localhost，在别人电脑上是访问不了的
        overlay: {
            errors:true,// webpack编译错误显示在网页中
        },
        hot:true, // 页面不刷新 仅更新组件数据 webpack会自动添加 HMR 插件。所以模块热更新最终还是 HMR 这个插件起的作用。

        // open:true,
        // historyFallback: {
        //     // 设置默认入口地址
        // }
    },
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin() 
    )
} else {
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push({
        test: /\.styl(us)?$/, // 安装stylus-loader stylus
        // use:ExtractPlugin.extract({
        //     fallback:'style-loader',
        //     use: [
        //         'css-loader',
        //         {
        //             loader:'postcss-loader', // 能够编译生成sourceMap 
        //             options: {
        //                 sourceMap:true, // 若stylus-loader已生成source-map，则postcss-loader就不再重新生成
        //             }
        //         },
        //         'stylus-loader' // 能够编译生成sourceMap
        //     ]
        // })
        use:[
            miniCssExtractPlugin.loader,
            'css-loader',
            {
                loader:'postcss-loader', // 能够编译生成sourceMap 
                options: {
                    sourceMap:true, // 若stylus-loader已生成source-map，则postcss-loader就不再重新生成
                }
            },
            'stylus-loader'
        ]
    })
    config.plugins.push(
        // new ExtractPlugin('styles.[contentHash:8].css')
        new miniCssExtractPlugin({
            filename: "[name].[chunkhash:8].css",
     　　    chunkFilename: "[id].css"
        })
    )
}
module.exports = config;