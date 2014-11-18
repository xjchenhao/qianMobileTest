/**
 * 钱庄网
 * @name user页面
 * @description 页面js
 * @date 2014-11-18
 * @version $V1.0$
 */
define(function (require, exports, module) {
    module.exports = function () {
        //--------------------------------------------------【初始化数据】
        $.ajax({
            url: "script/ajax/list.json",
            type: "post",
            dataType: "json",
            success: function (data) {
                require.async('handlebars', function () {
                    var tpl = require('ajax/list.tpl');
                    var myTemplate = Handlebars.compile(tpl);
                    document.querySelector('#pageUser .am-list').innerHTML = myTemplate(data);
                });
            }
        });
        //--------------------------------------------------【无限滚动】
        var Infinite = require('module/infinite');
        Infinite = new Infinite({
            box: document.getElementById('pageUser'),
            con: document.querySelector('#pageUser .am-list-news-bd'),
            callback: function () {
                $.ajax({
                    url: "script/ajax/list.json",
                    type: "post",
                    dataType: "json",
                    success: function (data) {
                        require.async('handlebars', function () {
                            setTimeout(function () {
                                var tpl = require('ajax/list.tpl');
                                var myTemplate = Handlebars.compile(tpl);
                                document.querySelector('#pageUser .am-list').innerHTML += myTemplate(data);
                            }, 500);
                        });
                    }
                });
            }
        });
        //--------------------------------------------------【返回内存释放接口】
        return function(){
            Infinite.destroy();
            Infinite=null;
        }
    };
});