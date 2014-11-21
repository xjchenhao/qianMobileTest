/**
 * 钱庄网
 * @name 基础js
 * @description 整站基础js模块
 * @date 2014-10-30
 * @version $V1.0$
 */
define(function (require, exports, module) {
    //--------------------------------------------------【引入依赖函数】
    require('zepto');
    require('amazeui');
    //--------------------------------------------------【侧栏导航】
    //console.dir($('#asideNav'));
    $('#asideBtn').click(function(){
        $('body').addClass('am-offcanvas-page').css({
            '-webkit-transform':'translateZ(0) translateX(-200px)',
            'transform':'translateZ(0) translateX(-200px)'
        });
        $('#asideNav').show();
    });
    $("#asideNav").click(function(){
        $('body').removeClass('am-offcanvas-page').css({
            '-webkit-transform':'translateZ(0) translateX(0)',
            'transform':'translateZ(0) translateX(0)'
        });
        $('#asideNav').hide();
    });
});