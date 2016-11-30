'use strict'

var webpack = require('webpack');
var path = require('path');

module.exports = {

    resolve: {
        alias: {
            'normalize' : path.join(__dirname, "/bower_components/normalize-css/normalize.css")
        }
    },

    entry: {
        index : './src/js/index.jsx'
    },

    output: {
        path: './dist/js',
        filename: 'bundle.js'
    },

    devtool: "#source-map",

    devServer: {
        contentBase: './dist/',
        hot: true,
        port: 8080
    },

    module: {
        loaders: [
            {
                test: /\.ts/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.jsx/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'es2015',
                        'react'
                    ]
                }
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!postcss-loader!less-loader?sourceMap'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader'
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    }


}