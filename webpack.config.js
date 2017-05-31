// 這邊使用 HtmlWebpackPlugin，將 bundle 好的 <script> 插入到 body。${__dirname} 為 ES6 語法對應到 __dirname  
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules = path.resolve(__dirname, "node_modules");
const extractCss = new ExtractTextPlugin('app/css/[name].css');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const sourcePlugin = new HtmlWebpackInlineSourcePlugin();
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${__dirname}/app/index.html`,
    filename: 'index.html',
    inject: 'body',
});

module.exports = {
    // 檔案起始點從 entry 進入，因為是陣列所以也可以是多個檔案
    entry: {
        index:'./app/index.js',
    }
        
    ,
    // output 是放入產生出來的結果的相關參數
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].js',
    },
    module: {
        // loaders 則是放欲使用的 loaders，在這邊是使用 babel-loader 將所有 .js（這邊用到正則式）相關檔案（排除了 npm 安裝的套件位置 node_modules）轉譯成瀏覽器可以閱讀的 JavaScript。preset 則是使用的 babel 轉譯規則，這邊使用 react、es2015。若是已經單獨使用 .babelrc 作為 presets 設定的話，則可以省略 query
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react'],
            },
        },
        {
            test: /\.css$/,
            use: [{

                loader: 'style-loader'

            }, {

                loader: 'css-loader?importLoaders=1'

            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: function () {
                        //自動加前綴
                        return [require('autoprefixer')

                        ];
                    }
                }
            }]
            },
            {
                test: /\.scss$/,
                use: extractCss.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary 
                    use: [{
                        loader: 'css-loader'
                    }, {
                        //讓sass加入前缀詞
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [require('autoprefixer')

                                ];
                            }
                        }
                    }, {
                        loader: 'sass-loader'
                    }]
                })
            }, {
            test: /\.(svg|png|jpg|gif)$/,
            use: [
                //limit可以限制檔案大小到多大的時候啟用
                { loader: 'url-loader?limit=500&mimetype=images/jpg&name=images/[name].[ext]' }
            ]
        } ],
    },
    // devServer 則是 webpack-dev-server 設定
    devServer: {
        contentBase: "./dist",
        inline: true,
        port: 8008,
    },
    // plugins 放置所使用的外掛
    plugins: [HTMLWebpackPluginConfig, extractCss, sourcePlugin],
};