const path = require("path");
const HtmlWepackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpack = require("copy-webpack-plugin");
const DotEnv = require("dotenv-webpack");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        assetModuleFilename: "assets/images/[hash][ext][query]"
    },
    mode: "development",
    resolve: {
        extensions: [".js"],
        alias: {
            "@utils": path.resolve(__dirname, "src/utils/"),
            "@templates": path.resolve(__dirname, "src/templates/"),
            "@images": path.resolve(__dirname, "src/assets/images/"),
            "@styles": path.resolve(__dirname, "src/styles/"),
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimeType: "application/font-woof",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        exModule: false
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWepackPlugin({
            inject: true,
            template: "./public/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "assets/[name].[contenthash].css"
        }),
        new CopyWebpack({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new DotEnv()
    ],
}