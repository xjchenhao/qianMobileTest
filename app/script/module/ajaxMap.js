/**
 * 钱庄网
 * @name 基础js
 * @description ajax映射表
 * @date 2015-02-27
 */
define(function (require, exports, module) {
    require('mock');
    /*产品列表页*/
    Mock.mock('listPageDate.html', {
        'list|20': [{
            'title': '@title',
            'href': '#',
            'time': '@date("yyyy-mm-dd")'
        }]
    });
});