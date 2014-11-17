/**
 * 钱庄网
 * @name index页面
 * @description Mobilebone页面路由
 * @date 2014-11-04
 * @version $V1.0$
 */
define(function (require, exports, module) {
    require('zepto');
    var Mobilebone = require('mobilebone');
    var myScroll,                   //用于存储iscroll的对象
        Infinite;
    //--------------------------------------------------【转场nav样式选中】
    Mobilebone.callback = function (page_in, page_out) {
        var id_in = page_in.id,
            id_out = "";
        var ele_link_in = null,
            ele_link_out = null;
        if (ele_link_in = document.querySelector("nav a[href$=" + id_in + "]")) {
            ele_link_in.parentElement.classList.add("active");
        }
        if (page_out) {
            id_out = page_out.id;
            ele_link_out = id_out && document.querySelector("nav a[href$=" + id_out + "]");
            ele_link_out && ele_link_out.parentElement.classList.remove("active");
        }
    };
    Mobilebone.mergeCallback = true;
    //--------------------------------------------------【路由】
    Mobilebone.rootTransition = {
        homInit: function () {
            $('.am-slider').flexslider();
            //console.log('首页初始化');
        },
        homeInto: function (pageInto, pageOut, response) {
            //console.log('入首页');
        },
        homeOut: function (pageInto, pageOut, response) {
            //console.log('出首页');
        },
        listInto: function (pageInto, pageOut, response) {
            //--------------------------------------------------【初始化数据】
            $.ajax({
                url: "script/ajax/list.json",
                type: "post",
                dataType: "json",
                success: function (data) {
                    require.async('handlebars', function () {
                        var tpl = require('ajax/list.tpl');
                        var myTemplate = Handlebars.compile(tpl);
                        document.querySelector('#pageList .am-list').innerHTML = myTemplate(data);
                    });
                }
            });
            //--------------------------------------------------【主体部分滚动条】
            myScroll = require('iscroll-probe');
            myScroll = new IScroll('#pageList', {
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
                //if (this.y <= -(this.scrollerHeight - this.wrapperHeight)) {
                //    $.ajax({
                //        url: "script/ajax/list.json",
                //        type: "post",
                //        dataType: "json",
                //        success: function (data) {
                //            require.async('handlebars', function () {
                //                setTimeout(function () {
                //                    var tpl = require('ajax/list.tpl');
                //                    var myTemplate = Handlebars.compile(tpl);
                //                    document.querySelector('#pageList .am-list').innerHTML += myTemplate(data);
                //                    myScroll.refresh();
                //                }, 500);
                //            });
                //        }
                //    });
                //}
            });
            setTimeout(function () {
                var loadTop = document.querySelector('.loading-top'),
                    loadSpan = loadTop.getElementsByTagName('span')[0];
                loadSpan.innerHTML = '正在刷新';
                loadTop.classList.add('on');
                myScroll.refresh();
            }, 800);
        },
        listOut: function (pageInto, pageOut, response) {
            //console.log('出列表页');
            myScroll.destroy();
            //myScroll = null;
        },
        userInto: function (pageInto, pageOut, response) {
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
            Infinite = require('module/infinite');
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
        },
        userOut: function (pageInto, pageOut, response) {
            Infinite.destroy();
            //Infinite = null;
        }
    };
    Mobilebone.init();
    //--------------------------------------------------【滑动转场】
    //var currentIndex = 0, startX, startY;
    //document.addEventListener('touchstart', function (e) {
    //    var touch = e.touches[0];       //获取第一个触点
    //    var x = Number(touch.pageX);    //页面触点X坐标
    //    var y = Number(touch.pageY);    //页面触点Y坐标
    //    //记录触点初始位置
    //    startX = x;
    //    startY = y;
    //}, false);
    //document.addEventListener('touchend', function (e) {
    //    var touch = e.changedTouches[0];    //获取第一个触点
    //    var x = Number(touch.pageX);        //页面触点X坐标
    //    var y = Number(touch.pageY);        //页面触点Y坐标
    //    if (x - startX > '100') {
    //        if(currentIndex<=0) return;
    //        currentIndex--;
    //    } else if (x - startX < '-100') {
    //        if(currentIndex>=2) return;
    //        currentIndex++;
    //    } else {
    //        return false;
    //    }
    //    console.log(currentIndex);
    //    var navbarLi = document.querySelector('#navbar
    // ul').getElementsByTagName('li')[currentIndex].getElementsByTagName('a')[0]; location.href=navbarLi.href; },
    // false);
});