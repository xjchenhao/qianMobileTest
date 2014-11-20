/**
 * 钱庄网
 * @name user页面
 * @description 页面js
 * @date 2014-11-18
 * @version $V1.0$
 */
define(function (require, exports, module) {
    module.exports = function () {
        var ImgLoad = require('module/scroll-imgload');
        ImgLoad=new ImgLoad({
            ele:document.querySelectorAll("#pageImgLoad img"),
            attr:'data-src',
            container:document.getElementById('pageImgLoad'),
            callback:''
        });
        //--------------------------------------------------【返回内存释放接口】
        return function(){
            ImgLoad.destroy();
            ImgLoad=null;
        }
    };
});