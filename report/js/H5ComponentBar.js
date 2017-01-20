/* 柱状图组件对象 */
var H5ComponentBar = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);

    $.each(cfg.data, function (index, item) {
        
        var line = $('<div class="line">');
        var name = $('<div class="name">');
        var rate = $('<div class="rate">');
        var per = $('<div class="per">');

        var width = item[1]*100 + '%';
        // 定义自定义颜色（bar条的颜色）
        var bgStyle = '';
        if (item[3]) {
            bgStyle = 'style="background-color: ' + item[3] + '"';
        }
        rate.html('<div class="bg" ' + bgStyle + '></div>');
        rate.css('width',width);

        name.text(item[0]);
        per.text(item[2]);

        line.append(name,rate,per);
        component.append(line);
    });
    return component;
};