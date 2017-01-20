/* 散点图表组件对象 */
var H5ComponentPoint = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);
    var base = cfg.data[0][1]; //以第一个数据的大小为比例，100%

    // 输出每个Point
    $.each(cfg.data, function (indx, item) {
        var point = $('<div class="point point-' + indx + '">');

        var name = $('<div class="name">' + item[0] + '</div>');
        var rate = $('<div class="per">' + item[5] + '</div>');
        name.append(rate);
        point.append(name);

        var per = (item[1]/base * 100) + '%';
        point.width(per).height(per);
        if (item[2]) {
            point.css('backgroundColor',item[2]);
        }
        if (item[3] !== undefined && item[4] !== undefined) {
            point.css({
                'left': item[3],
                'top': item[4]
            });
            point.data('left',item[3]).data('top',item[4]); //暂存left、top到元素上
        }
        // 设置zIndex、重设位置
        point.css('zIndex', 100 - indx);
        point.css('left', 0).css('top', 0);

        point.css('transition','all 1s ' + indx * 0.5 + 's');
        component.append(point);
    });

    // onLoad之后取出暂存的left、top 并且附加到 CSS 中
    component.on('onLoad', function () {
        component.find('.point').each(function (idx, item) {
            $(item).css('left', $(item).data('left')).css('top', $(item).data('top'));
        });
    });
    // onLeave之后，还原初始的位置
    // component.on('onLeave', function () {
    //     component.find('.point').each(function (idx, item) {
    //         $(item).css('left', 0).css('top', 0);
    //     });
    // });

    component.find('.point').on('click', function () {
        component.find('.point').removeClass('point-focus');
        $(this).addClass('point-focus');
        return false;
    }).eq(0).addClass('point-focus');

    return component;
};