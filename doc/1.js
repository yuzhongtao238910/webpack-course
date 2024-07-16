function a() {
	console.log('a')
	b()
	c()
}

function b() {
	console.log('b')
}

function c() {
	console.log('c')
}
// webpack在production的时候就会作用域提升
function aa() {
	console.log('a')
	console.log('b')
	console.log('c')
}
