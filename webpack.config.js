const path = require('path')
const notifier = require('node-notifier')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const ICON = path.join(__dirname, 'icon.jpg')
const smp = new SpeedMeasurePlugin()
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = smp.wrap({
	mode: 'development',
	devtool: 'source-map',
	// 配置工作目录 上下文目录
	context: process.cwd(),
	entry: {
		main: './src/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[name].js',
	},
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
			generateStatsFile: true, // 是否生成stats.json文件
		}),
	],
})
