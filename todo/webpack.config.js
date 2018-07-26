const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
		main: ["./src/js/main.js"]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/js'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use:  ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../css/style.css',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: '../index.html'
        })
    ],
    mode: 'development',
    devtool: 'inline-source-map',
    watch: true,
    devServer: {
        stats: 'errors-only',
        contentBase: path.join(__dirname, 'dist'),
        port: 9000,
        open: true
    }
};
