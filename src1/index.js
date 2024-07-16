/*
1-mpa模式 大家都使用的模块会进行多次打包 无法动态拆分
entry: {
	// mpa 多应用
	page1: './src1/page1.js',
	page2: './src1/page2.js',
}

2- 懒加载
    import 语法 vue react angular的懒加载组件原理是一样的
    import语句是天然的代码分割点
    但是此文件特别的大，当点击播放的时候，比较慢
    类似的场景就是路由切换，首页 -》购物车
3- 使用prefetch 预先加载 浏览器空闲的时候再去加载
    <link rel="prefetch" as="script" href="http://localhost:8080/video.js">

    preload：预先加载  资源优先级高，需要提前获取，他需要慎用
    prefetch：预先获取 此资源在以后可能会用到，在浏览器空闲的时候加载 没有性能问题
*/
let play = document.getElementById('play')
/*
module：就是import require进来的语句

chunk：chunk就是webpack根据功能拆分出来的
    项目的入口
    通过import动态引入的代码
    通过splitChunks拆分出来的代码

bundle:bundle 就是webpack打包之后的各个文件，一般就是和chunk是一一对应的关系，bundle就是chunk进行编译打包压缩之后的产出
*/
play.addEventListener('click', () => {
	// import(/* webpackChunkName: 'video', webpackPrefetch: true*/ './video').then(
	// 	(res) => {
	// 		console.log(res)
	// 	}
	// )
	import('./video').then((res) => {
		console.log(res)
	})
})
