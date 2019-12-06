// Webpack uses this to work with directories
require("babel-register");

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = {

    // Path to your entry point. From this file Webpack will begin his work
    entry: ['./src/index.js', './sass/index.scss'],

    // Path and filename of your result bundle.
    // Webpack will bundle all JavaScript into this file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'javascript/bundle.js'
    },
    // This means that after the initial build, webpack will continue to watch for changes in any of the resolved files.
    watch: false,

    // rules
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        interpolate: true
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'css/index.css',
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },

    // Default mode for Webpack is production.
    // Depending on mode Webpack will apply different things
    // on final bundle. For now we don't need production's JavaScript
    // minifying and other thing so let's set mode to development
    mode: 'production',

    // This plugin uses uglify-js to minify your JavaScript.
    optimization: {
        minimizer: [new UglifyJsPlugin({
            // Compression specific options
            uglifyOptions: {
                compress: {
                    drop_console: true,
                }
            },
        })],
    },

    // plugins
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Schiphol',
            template: './src/html/index.html'
        }),
        new CopyPlugin([
            {
                from: './src/data/*.json',
                to: 'data/',
                flatten: true,
            },
            {
                from: './src/static/*.css',
                to: 'css/',
                flatten: true,
            },
        ]),]
};
