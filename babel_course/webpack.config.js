const path = require('path')
const plugin1 = path.resolve(__dirname, 'plugins', 'plugin1.js')
const plugin2 = path.resolve(__dirname, 'plugins', 'plugin2.js')
const plugin3 = path.resolve(__dirname, 'plugins', 'plugin3.js')
const plugin4 = path.resolve(__dirname, 'plugins', 'plugin4.js')
const plugin5 = path.resolve(__dirname, 'plugins', 'plugin5.js')
const plugin6 = path.resolve(__dirname, 'plugins', 'plugin6.js')

// 预设是插件的集合
function preset1() {
	return {
		plugins: [plugin5, plugin6],
	}
}
function preset2() {
	return {
		plugins: [plugin3, plugin4],
	}
}

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		clean: true,
	},
	module: {
		// 执行顺序：插件在presets之前运行
		// 插件顺序是从前往后排列
		// presets顺序是从后往前
		// 插件从前往后 预设从后往前
		// 执行顺序就是：1 2 3 4 5 6
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: [plugin1, plugin2],
						presets: [preset1, preset2],
					},
					// options: {
					// 	presets: [
					// 		[
					// 			'@babel/preset-env',
					// 			{
					// 				targets: '> 0.25%',
					// 			},
					// 			// {
					// 			// 	// useBuiltIns: false,
					// 			// 	// false 不对polyfill做操作，如果引入了@babel/polyfill,那么就会无视配置的浏览器兼容，引入所有的polyfill
					// 			// 	// 需要在入口文件引入 import "@babel/polyfill"
					// 			// 	// -----------------
					// 			// 	// entry 根据配置浏览器的兼容性，
					// 			// 	// 手动引入：import 'core-js/stable' import 'regenerator-runtime/runtime'
					// 			// 	// useBuiltIns: 'entry',
					// 			// 	// corejs: 3,
					// 			// 	// targets: 'last 2 Chrome versions',
					// 			// 	// -----------------
					// 			// 	// usage 会根据配置的浏览器兼容 以及代码之中用到的api来进行polyfill，来实现按需添加
					// 			// 	// 什么都不需要引入了
					// 			// 	useBuiltIns: 'usage',
					// 			// 	corejs: '3.37.1',
					// 			// 	// targets: 'last 2 Chrome versions',
					// 			// 	targets: '> 0.25%, not dead',
					// 			// },
					// 		],
					// 	],
					// 	plugins: [
					// 		[
					// 			'@babel/plugin-transform-runtime',
					// 			{
					// 				corejs: 3, // 如果用到了Promise 会自动的引入对应的polyfill
					// 				// 那之前重复使用的es高阶版本的方法 单独实现，不需要在每次都重新写了
					// 				helpers: true, // 移除内联的babel helpers 并且自动的引入babel-runtime/helpers
					// 				regenerator: true, // 生成器
					// 				// 是否开启gen函数转换成使用re regenerator runtime 来避免污染全局作用域 用模块包裹
					// 				// 不转换的话，会污染全局作用域
					// 			},
					// 		],
					// 	],
					// },
				},
			},
		],
	},
}
