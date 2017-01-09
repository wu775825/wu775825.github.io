/* 折线图组件对象 */
var H5ComponentPolyline = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);
    // 绘制网格线
    var w = cfg.width;
    var h = cfg.height;

    // 加入一个画布(网格线背景层)
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    // 水平网格线 100份-> 10份
    var step = 10;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#775825';
    window.ctx = ctx;
    for (var i = 0; i < (step + 1); i++) {
        var y = (h/step) * i;

        ctx.moveTo(0,y);
        ctx.lineTo(w,y);
    }
    // 垂直网格线（根据项目的个数去分）
    step = cfg.data.length + 1;
    var text_w = Math.floor(w/step);
    for(var t = 0;t < step + 1;t += 1) {
        var x = (w/step) * t;

        ctx.moveTo(x,0);
        ctx.lineTo(x, h);
        if (cfg.data[t]) {
            var text = $('<div class="text">');
            text.text(cfg.data[t][0]);
            text.css('width', text_w/2).css('left',(x/2 + text_w/4));
            component.append(text);
        }
    }

    ctx.stroke();

    // 加入画布 - 数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    // 绘制折线以及对应的数据和阴影(实现折线、阴影动画)
    // @param {floot} per 0到1之间的数据，会根据此值绘制最终数据对应的中间状态
    // @return {DOM} Component元素
    var draw = function (per) {
        ctx.clearRect(0, 0, w, h);
        // 绘制折线数据
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#ff8878";
        var x = 0;
        var y = 0;

        // 画点
        var row_w = (w/(cfg.data.length + 1));
        for(var i = 0;i < cfg.data.length;i += 1) {
            var item = cfg.data[i];
            x = row_w * i + row_w;
            y = h * (1 - (item[1] * per));

            ctx.moveTo(x,y);
            // 设置数据的样式
            ctx.fillStyle = item[2] ? item[2] : '#595959';
            // 写每个点上的百分比数据
            ctx.fillText((item[1] * 100) + '%', x - 10, y - 10);

            ctx.arc(x, y, 5, 0, 2 * Math.PI);
        }
        // 连线
        // 将画笔移动到第一个数据点的位置
        ctx.moveTo(row_w, h * (1 - cfg.data[0][1] * per));
        for(var i = 0;i < cfg.data.length;i += 1) {
            var item = cfg.data[i];
            x = row_w * i + row_w;
            y = h * (1 - (item[1] * per));
            ctx.lineTo(x,y);
        }
        ctx.stroke();
        // 隐藏画阴影遗留的线条
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0)';

        // 绘制阴影
        ctx.lineTo(x,h);
        ctx.lineTo(row_w,h);
        ctx.fillStyle = 'rgba(255,118,118,0.2)';
        ctx.fill();

        ctx.stroke();
};

    component.on('onLoad', function() {
        // 折线图生长动画
        var s = 0;
        for(var i = 0;i < 100;i += 1) {
            setTimeout(function () {
                s += 0.01;
                draw(s);
            }, i * 10 + 500);
        }
    });
    component.on('onLeave', function() {
        // 折线图生长动画
        var s = 1;
        for(var i = 100;i > 0;i -= 1) {
            setTimeout(function () {
                s -= 0.01;
                draw(s);
            }, i * 10);
        }
    });
    return component;
};