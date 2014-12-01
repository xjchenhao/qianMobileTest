/**
 * 钱庄网
 * @name list页面
 * @description 页面js
 * @date 2014-11-18
 * @version $V1.0$
 */
define(function (require, exports, module) {
    module.exports = function () {
        require('zepto');
        //--------------------------------------------------【初始化数据】
        $.ajax({
            url: "script/ajax/list.json",
            type: "post",
            dataType: "json",
            async:false,
            success: function (data) {
                require.async('handlebars', function () {
                    var tpl = require('ajax/list.tpl');
                    var myTemplate = Handlebars.compile(tpl);
                    document.querySelector('#pageList .am-list').innerHTML = myTemplate(data);
                });
            }
        });
        //--------------------------------------------------【文章标题绑定弹框事件】
        var Pop=require('module/pop');
        var alertPop=new Pop({
            type:'alert',
            content:'暂未添加链接'
        });
        $('.am-list').each(function(){
            $(this).on('click','.am-list-item-hd',function(){
                alertPop.pop($(this).text());
                alertPop.pop();
                alertPop.pop();
                alertPop.pop();
                alertPop.pop();
            });
        });
        //--------------------------------------------------【主体部分滚动条】
        require('iscroll-probe');
        var myScroll = new IScroll('#pageList', {
            scrollbars: true,
            mouseWheel: true,
            probeType: 2,
            startY: 70
        });
        var scrollY;    //记录Y轴变化
        myScroll.on('scroll', function () {
            var loadTop = this.wrapper.querySelector('.loading-top'),
                loadSpan = loadTop.getElementsByTagName('span')[0];
            scrollY = this.y;
            if (scrollY > 70) {
                loadSpan.innerHTML = '释放更新';
                loadTop.classList.add('on');
            } else {
                loadSpan.innerHTML = '下拉刷新';
                loadTop.classList.remove('on');
            }
        });
        myScroll.on('scrollEnd', function () {
            if (this.y >> 0 === 0 && scrollY > 70) {
                console.log('数据更新');
            }
            if (this.y <= -(this.scrollerHeight - this.wrapperHeight)) {
                $.ajax({
                    url: "script/ajax/list.json",
                    type: "post",
                    dataType: "json",
                    success: function (data) {
                        require.async('handlebars', function () {
                            var tpl = require('ajax/list.tpl');
                            var myTemplate = Handlebars.compile(tpl);
                            document.querySelector('#pageList .am-list').innerHTML += myTemplate(data);
                            myScroll.refresh();
                        });
                    }
                });
            }
        });
        setTimeout(function () {
            var loadTop = document.querySelector('.loading-top'),
                loadSpan = loadTop.getElementsByTagName('span')[0];
            loadSpan.innerHTML = '正在刷新';
            loadTop.classList.add('on');
            myScroll.refresh();
        }, 800);
        //--------------------------------------------------【返回内存释放接口】
        return function () {
            myScroll.destroy();
            myScroll = null;
        }
    };
});