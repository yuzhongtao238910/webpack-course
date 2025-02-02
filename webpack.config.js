const path = require('path')
const notifier = require('node-notifier')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const ICON = path.join(__dirname, 'icon.jpg')
const smp = new SpeedMeasurePlugin()
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const loadersPath = path.resolve(__dirname, 'loggers')
const webpack = require('webpack')

const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const glob = require('glob')
const { DefinePlugin } = require('webpack')
const { EnvironmentPlugin } = require('webpack')
require('dotenv').config()
// 读取.env的文件
// global是一个文件的匹配器 匹配模式
const PATHS = {
	src: path.resolve(__dirname, 'src'),
}
/*
编译时间优化
    1- 减少要处理的文件
    2- 缩小查找的范围
*/
// 在命令行配置的mode的优先级别是最高的
// "build": "webpack --mode=development",
// "build": "webpack --env=development", 此时module.exports就是一个函数，函数的参数就是env
// "build": "cross-env NODE_ENV=development webpack", 设置node的环境变量 cross-env 跨平台的全局变量
console.log(process.env.NODE_ENV)
// npm i dotenv
// sideEffects: ["*.css"], 代表有副作用
module.exports = (env) => {
	console.log(env)
	// webpack5之中的tree shaking是加强优化的
	return smp.wrap({
		mode: 'development', // mode的默认值是 production
		// devtool: 'hidden-source-map',
		// 配置工作目录 上下文目录
		// context: process.cwd(),
		entry: {
			// 1- 每个入口是一个chunk
			// 2- 动态的import 分割代码块
			// 3- 代码分割 splitchunk
			// main: './src1/index.js',
			// mpa 多应用
			// page1: './src2/page1.js',
			// page2: './src2/page2.js',
			// page3: './src2/page3.js',
			entry1: './src3/entry1.js',
			entry2: './src3/entry2.js',
		},
		optimization: {
			splitChunks: {
				chunks: 'all', // async + initial = all
				minSize: 0, // 分割出去的代码块的最小体积 0表示不限制
				maxSize: 0, // 分割出去的代码块的最大体积 0表示不限制
				minRemainingSize: 0, // 分割出去剩下的体积，0表示不限制 webpack5新增的
				// minChunks: 1, // 如果此模块被多个入口引用几次会被分割
				// maxAsyncRequests: 30, // 异步请求最大分割出去几个代码块
				// maxInitialRequests: 30, // 同步的时候最大分割出去几个代码块
				// automaticNameDelimiter: '~', // 名称的分隔符号
				// enforceSizeThreshold: 50000, // 强制的阈值
				cacheGroups: {
					default: false, // 禁用默认缓存组
					commons: {
						minChunks: 1,
						reuseExistingChunk: true,
					},
					// 缓存组 配置如何对模块进行分组
					// defaultVendors: {
					// 	test: /[\\/]node_modules[\\/]/,
					// 	priority: -10, // 如果一个模块同属于多个缓存组，那么看谁的优先级别高
					// 	reuseExistingChunk: true, // 是否可以复用现有的代码块
					// },
					// default: {
					// 	minChunks: 2, // 被几个入口引用，此模块被几个入口引用过
					// 	priority: -20,
					// 	reuseExistingChunk: true,
					// },
				},
			},
			// minimize: true, // 开启最小化
			// minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
			// minimizer: [new CssMinimizerPlugin()],
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].js',
			clean: true, // 在生成文件之前清空 output 目录
		},
		resolve: {
			extensions: ['.js', '.jsx', 'json'], // 配置扩展名字
			alias: {
				// 指定查找别名
				// bootstrap默认引入的时候会去找package.json里面的main对应的入口文件，但其实我们就想要他的css文件就可以了
				bootstrap: path.resolve(
					__dirname,
					'./node_modules/bootstrap/dist/css/bootstrap.css'
				),
			},
			// 就直接指定模块的位置
			modules: ['node_modules'],
			// 默认情况下 package.json之中的文件按照main字段的文件名字来查找
			// target === 'web'的时候 或者是target === 'webworker'的时候
			// mainFields 的默认值是 : ["browser", "module", "main"]
			// 对于bootstrap的文件，我们可以在数组之前加上'style'
			mainFields: ['browser', 'module', 'main'],
			mainFiles: ['index'], // 如果找不到 mainFields 的话 会去着索引文件index.js
		},
		resolveLoader: {
			// 这个只对loader有用
			// 去寻找自定义的loader
			modules: [loadersPath, 'node_modules'],
		},
		externals: {
			// jquery: 'jQuery',
		},
		module: {
			// 如果模块的路径匹配此正则的话，那么就不需要查找里面的依赖项了 require import
			// 里面不能出现 import 或者 require 一些 lodash jquery没有依赖
			// noParse: /title.js/,
			rules: [
				// {
				// oneOf: [
				// {
				// 	test: /\.js$/,
				// 	include: path.resolve(__dirname, 'src'),
				// 	// exclude: /node_modules/, // exclude的优先级高一些
				// 	use: [
				// 		// {
				// 		// 	// 开启线程池 开启线程以及线程通信都需要时间的
				// 		// 	loader: 'thread-loader',
				// 		// 	options: { workers: 3 },
				// 		// },
				// 		{
				// 			loader: 'babel-loader',
				// 			options: {
				// 				cacheDirectory: true, // 开启babel缓存
				// 			},
				// 		},
				// 	],
				// },
				// 其他的可以安装cache-loader 但是我看已经是5年没有更新了
				{
					test: /\.css$/i,
					use: ['logger-loader', 'style-loader', 'css-loader'],
					// use: [MiniCssExtractPlugin.loader, 'css-loader'],
				},
				// {
				// 	test: /\.less$/,
				// 	// use: ['style-loader', 'css-loader', 'less-loader'],
				// 	use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
				// },
				{
					test: /\.(jpg|png|gif|bmp)$/,
					use: [
						{
							loader: 'image-webpack-loader',
							options: {
								mozjpeg: {
									progressive: true,
								},
								// optipng.enabled: false will disable optipng
								optipng: {
									enabled: false,
								},
								pngquant: {
									quality: [0.65, 0.9],
									speed: 4,
								},
								gifsicle: {
									interlaced: false,
								},
								// the webp option will enable WEBP
								webp: {
									quality: 75,
								},
							},
						},
					],
				},
				// ],
				// },
			],
		},
		plugins: [
			// new MiniCssExtractPlugin({
			// 	filename: '[name].css',
			// 	chunkFilename: '[id].css',
			// }),
			// new PurgeCSSPlugin({
			// 	//  ** 匹配任意字符 包括路径分割符号 * 配置任意字符，不包括路径分割
			// 	paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
			// }),
			new BundleAnalyzerPlugin({
				analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
				generateStatsFile: true, // 是否生成stats.json文件
			}),
			new HtmlWebpackPlugin({
				template: './src2/index.html',
				filename: 'page1.html',
				chunks: ['page1'], // 包含往html页面之中哪些的资源文件
				// minify: {
				// 	collapseWhitespace: true, // 去掉空格
				// 	removeComments: true, // 去掉注释
				// },
			}),
			new HtmlWebpackPlugin({
				template: './src2/index.html',
				filename: 'page2.html',
				chunks: ['page2'],
				// minify: {
				// 	collapseWhitespace: true, // 去掉空格
				// 	removeComments: true, // 去掉注释
				// },
			}),
			new HtmlWebpackPlugin({
				template: './src2/index.html',
				filename: 'page3.html',
				chunks: ['page3'],
				// minify: {
				// 	collapseWhitespace: true, // 去掉空格
				// 	removeComments: true, // 去掉注释
				// },
			}),
			// 就是忽略moment包文件夹里面的locale这个语言包 照样可以使用
			// 如果需要自己单独引入
			new webpack.IgnorePlugin({
				resourceRegExp: /^\.\/locale$/, // 资源正则
				contextRegExp: /moment$/, // 这个是上下文的目录
			}),
			// 定义全局变量
			new webpack.DefinePlugin({
				// 定义在编译阶段使用的全局变量，执行的时候已经是值了 必须用json包括以下，值是字符串
				ENVIRONMENT: JSON.stringify('development'),
			}),
		],
	})
}

// purgecss-webpack-plugin
