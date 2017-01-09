/* 内容管理对象 */
var H5 = function () {
    this.id = ('h5-' + Math.random()).replace('.','-');
    this.el = $('<div class="h5" id="' + this.id + '">').hide();
    this.page = [];
    $('body').append(this.el);

    // 新增一个页
    // @param {string} name 组件的名称，会加入到className中
    // @param {string} text 页内文本
    // @return {H5} H5对象，可以重复使用H5对象支持的方法
    this.addPage = function (name, text) {
        var page = $('<div class="h5-page section">');

        if (name !== undefined) {
            page.addClass('h5-page-' + name);
        }
        if (text !== undefined) {
            page.text(text);
        }
        this.el.append(page);
        this.page.push(page);

        if (typeof this.whenAddPage === 'function') {
            this.whenAddPage();
        }

        return this;
    };
    // 新建一个组件
    this.addComponent = function (name, cfg) {
        cfg = cfg || {};
        cfg = $.extend({
            type: 'base'
        },cfg);

        var component; // 定义一个变量，存储组件元素
        var page = this.page.slice(-1)[0];
        switch(cfg.type) {
            case 'base':
                component = new H5ComponentBase(name,cfg);
            break;
            
            case 'polyline':
                component = new H5ComponentPolyline(name,cfg);
            break;
            
            case 'pie':
                component = new H5ComponentPie(name,cfg);
            break;
            
            case 'bar':
                component = new H5ComponentBar(name,cfg);
            break;
            
            case 'bar-v':
                component = new H5ComponentBarV(name,cfg);
            break;
            
            case 'radar':
                component = new H5ComponentRadar(name,cfg);
            break;

            case 'ring':
                component = new H5ComponentRing(name,cfg);
            break;
            case 'point':
                component = new H5ComponentPoint(name,cfg);
            break;
                default:
        }
        page.append(component);
        return this;
    };
    // H5对象初始化呈现
    this.loader = function (page) {
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
    this.loader = typeof H5Loading == 'function' ? H5Loading : this.loader;
    return this;
};




