import module1 from './module1'

import module2 from './module2'
import $ from 'jquery'
console.log(module1, module2, $)
import('./asyncModule1').then((res) => {
	console.log(res)
})
// 每个入口是一个chunk
