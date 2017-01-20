var H5Loading = function (imgs, page) {

    var id = this.id;

    if (this._images === undefined) { //第一次进入
        this._images = (imgs || []).length;
        this._loaded = 0;

        
        window[id] = this; //把当前对象存储在全局对象window中，用来在某个图片加载完成之后的回调。

        for(var i = 0;i < imgs.length;i += 1) {
            var item = imgs[i];
            var img = new Image;
            img.onload = function () {
                window[id].loader();
            };
            img.src = item;
        }
        $('#rate').text('0%');
        return this;
    }else {
        this._loaded ++;
        $('#rate').text(((this._loaded / this._images * 100) >> 0) + '%');
        if (this._loaded < this._images) {
            return this;
        }
    }
    window[id] = null;

    this.el.fullpage({
            onLeave: function (index, nextIndex, direction) {
                $(this).find('.h5-component').trigger('onLeave');
            },
            afterLoad: function (anchorLink, index) {
                $(this).find('.h5-component').trigger('onLoad');
            }
        });
        this.page[0].find('.h5-component').trigger('onLoad');
        this.el.show();

        if (page) {
            $.fn.fullpage.moveTo(page);
        }
};