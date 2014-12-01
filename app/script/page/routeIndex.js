/**
 * 钱庄网
 * @name index文件
 * @description Mobilebone页面路由
 * @date 2014-11-18
 * @version $V1.0$
 */
define(function (require, exports, module) {
    require('zepto');
    var Mobilebone = require('mobilebone');
    //--------------------------------------------------【转场nav样式选中】
    //Mobilebone.callback = function (page_in, page_out) {
    //    var id_in = page_in.id,
    //        id_out = "";
    //    var ele_link_in = null,
    //        ele_link_out = null;
    //    if (ele_link_in = document.querySelector("nav a[href$=" + id_in + "]")) {
    //        ele_link_in.parentElement.classList.add("active");
    //    }
    //    if (page_out) {
    //        id_out = page_out.id;
    //        ele_link_out = id_out && document.querySelector("nav a[href$=" + id_out + "]");
    //        ele_link_out && ele_link_out.parentElement.classList.remove("active");
    //    }
    //};
    //Mobilebone.mergeCallback = true;
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
            Mobilebone.INTO=require('page/list');
            Mobilebone.OUT=Mobilebone.INTO();
        },
        listOut: function (pageInto, pageOut, response) {
            Mobilebone.OUT();
        },
        userInto: function (pageInto, pageOut, response) {
            Mobilebone.INTO=require('page/user');
            Mobilebone.OUT=Mobilebone.INTO();
        },
        userOut: function (pageInto, pageOut, response) {
            Mobilebone.OUT();
        },
        imgInto:function(pageInto, pageOut, response) {
            Mobilebone.INTO=require('page/imgload');
            Mobilebone.OUT=Mobilebone.INTO();
        },
        imgOut:function (pageInto, pageOut, response) {
            Mobilebone.OUT();
        }
    };
    $('body').css('background','inherit');
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