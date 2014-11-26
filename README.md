#qianMobileTest

mobileWeb测试

##在线地址
[http://qiantest.sinaapp.com/#&pageHome](http://qiantest.sinaapp.com/#&pageHome)


##测试项

1. [mobilebone](http://www.zhangxinxu.com/wordpress/2014/10/mobilebone-js-mobile-web-app-core/)做spa页面，并结合[seajs](seajs.org)做了路由表
2. 数据通过json传递，[handlebars](http://handlebarsjs.com/) DOM拼接
3. pageHome页面使用了[amazeui](http://amazeui.org/)的组件
4. pageList页面用了[iscroll](http://cubiq.org/iscroll-5)做 *视图滚动* ，基于它写了下拉刷新和无限加载
5. pageUser页面利用css3原生的`overflow-scrolling: touch;`写了原生的 *视图滚动* ，基于`infinite.js`模块写了无限下拉加载
6. imgload页面基于`scroll-imgload.js`模块写了图片的懒加载（只加载当前看到的视图上的图片），在快速滚动屏幕的情况下不触发加载
7. 用css3写了侧栏导航功能
8. [fis](http://fis.baidu.com/)工程化发布

##经验和思考

1. 做为mobileWeb并不适合用app的hander和tab底部，太占屏幕了（如果把网页添加到桌面用户体验还不错）
2. 还有侧栏导航，这些是在原生app上的东西 感觉没必要模仿到mobileWeb中
3. 模块化开发的时候需要提供额内存销毁功能，在转出页面后应当回收相关的内存
4. amazeui大而全且没有内存回收api不是很适合spa页面，但是其中很多东西值得学习借鉴
5. 网络上移动端相关的功能组件太少了，所以维护了一个组件库[mobileModule](https://github.com/xjchenhao/mobileModule)