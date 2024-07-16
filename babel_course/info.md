@babel/preset-env 可以试用.browserslistrc 文件来指定目标环境

last 2 Chrome versions

> 0.25%

@babel/preset-env 默认只会转换新的 js 语法，而不转换新的 api，比如 Iterator Generator Set Map Proxy 等等全局对象

polyfill 的中文意思是垫片，所谓垫片就是垫平不同浏览器或者不同环境下的差异，让新的内置函数，实例方法等在低版本的浏览器
也可以运行，但是会有全局污染的问题

官方给出@babel/polyfill babel-runtime 两种解决方案

babel-runtime 是为了解决全局空间污染的问题,是局部的，不会污染全局环境，比较适合开发一些库
更加像是一种按需加载的实现，比如哪里需要使用 Promise,就在这个文件的头部，引入
import Promise from "babel-runtime/core-js/promise"

但是需要手动引入

babel-plugin-transform-runtime 启用这个插件后，Babel 就会自动的使用 babel-runtime 下面的工具函数
