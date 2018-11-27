/**
 * @file
 * @summary Base configuration from file for web pack
 */

const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

const BUILD_DIR = path.resolve(__dirname, '../build/')
const APP_DIR = path.resolve(__dirname, '../app/')

const config = {
    entry: [APP_DIR + '/index.js', APP_DIR + '/index.scss'],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        pathinfo: false,
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-react',
                    '@babel/preset-env'
                ]
            }
        },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader"
            ]
        },
        {
            test: /\.(sass|scss)$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"
            ]
        },
        {
            test: /-spec\.js$/,
            loader: 'ignore-loader'
        },
        {
            test: /\.js/,
            include: [
                APP_DIR,
            ],
        },
        {
            test: /\.(svg|woff2|eot|ttf|otf|woff)$/,
            use: ['file-loader']
        },
        {
            test: /\.(jpe?g|png|gif)$/i,
            loader: "file-loader?[name].[ext]"
        }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new HtmlWebpackPlugin({
            title: 'A Bugs Life G6',
            filename: 'index.html',
            cache: true,
            template: path.resolve(APP_DIR, 'index.html')
        })
    ]
};

module.exports = config
