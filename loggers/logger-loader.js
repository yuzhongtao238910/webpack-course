// loader 就是一个函数 接受一个内容，返回处理后的内容
function loader(source) {
	console.log('@@@@====@@@@')
	return source
}
module.exports = loader
