'use strict'

var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer')
var stylelint = require('stylelint')

module.exports = {

    resolve: {
        alias: {
            'normalize' : path.join(__dirname, "/bower_components/normalize-css/normalize.css")
        }
    },

    entry: {
        index : './src/js/blog/indexblog.jsx'
    },

    output: {
        path: './dist/blog/js',
        filename: 'bundle.js'
    },

    devtool: "#source-map",

    devServer: {
        contentBase: './dist/blog/',
        historyApiFallback: true,
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
                test: /\.tsx/,
                loader: 'ts-loader'
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
    },
    postcss: function() {
        return [
            autoprefixer ({ browsers: ['last 2 versions'] })
        ]
    }


}