(function (root, factory) {
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function (exports) {
            return factory(root, exports);
        });
    } else {
        root.Slider = factory(root, {});
    }
})(this, function (root, slider) {
    var ImgLoad = function (opts) {
        this._opts = opts;
        this._setting();
        this._bindHandler();
    };
    ImgLoad.prototype._setting = function () {
        var opts = this._opts;

        /*初始化user data*/
        this.ele = opts.ele;
        this.attr = opts.attr;
        this.container = opts.container;
        this.callback = opts.callback;

        /*数据存储*/
        ImgLoad.cache = [];
        for (var i = 0, l = this.ele.length; i < l; i++) {
            var oThis = this.ele[i],
                node = oThis.nodeName.toLowerCase(),
                url = oThis.getAttribute(this.attr);
            var data = {
                node: oThis,
                tag: node,
                url: url
            };
            ImgLoad.cache.push(data);
        }
        this.boxHeight = this.container.clientHeight;
    };
    ImgLoad.prototype._bindHandler = function () {
        var self = this,
            post = posb = 0;
        this.event = {
            scroll: function (e) {
                ImgLoad.cache.forEach(function (data) {
                    if (data.node) {
                        post = data.node.offsetTop-self.container.scrollTop;
                        posb = post + data.node.clientHeight;
                        //console.log(post);
                        if (post >= 0 && post < self.boxHeight || posb > 0 && posb <= self.boxHeight) {
                            if (data.tag === 'img') {
                                data.node.setAttribute('src', data.url);
                            }
                            data.node = null;
                        }
                    }
                });
            }
        };
        self.container.addEventListener('scroll', self.event.scroll, false);
        self.event.scroll();
    };
    ImgLoad.prototype.destroy = function () {
        var self = this;
        self.container.removeEventListener('scroll', self.event.scroll, false);
    };
    return ImgLoad;
});