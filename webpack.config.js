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



    devServer: {
        contentBase: './dist/',
        hot: true,
        port: 8080
    },

    module: {
        loaders: [
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
                loader: 'babel',
                query: {
                    presets: [
                        'es2015',
                        'react'
                    ]
                }
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!postcss-loader!less-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader'
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url-loader'
            }
        ]
    }


}