/* 雷达图图组件对象 */
var H5ComponentRadar = function (name, cfg) {
    var component = new H5ComponentBase(name, cfg);
    // 绘制网格线 - 背景层
    var w = cfg.width;
    var h = cfg.height;

    // 背景层的开发
    // 加入一个画布(背景层)
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    // 计算一个圆周上的坐标（计算多边形的顶点坐标）
    // 已知：圆心坐标（a，b）、半径 r；角度deg。
    // rad = (2*Math.PI / 360) * (360 / step) * i;
    // x = a + Math.sin(rad) * r;
    // y = b + Math.cos(rad) * r;
    var r = w / 2;
    var step = cfg.data.length;
    // 绘制网格背景（分面绘制，分为10份）
    var isBlue = false;
    for(var s = 10;s > 0;s -= 1) {
        ctx.beginPath();
        for(var i = 0;i < step;i += 1) {
            var rad = (2*Math.PI / 360) * (360 / step) * i;
            var x = r + Math.sin(rad) * r * (s/10);
            var y = r + Math.cos(rad) * r * (s/10);

            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = (isBlue = !isBlue) ? '#99c0ff' : '#f1f9ff';
        ctx.fill();
        ctx.stroke();
    }

    // 绘制伞骨
    ctx.beginPath();
    for(var i = 0;i < step;i += 1) {
        var rad = (2*Math.PI / 360) * (360 / step) * i;
        var x = r + Math.sin(rad) * r;
        var y = r + Math.cos(rad) * r;
        ctx.moveTo(r, r);
        ctx.lineTo(x, y);
        // 输出项目文字
        var text = $('<div class="text">');
        text.text(cfg.data[i][0]);
        text.css('transition','all .5s ' + i * 0.1 + 's');
        // 设置文字的位置。
        if (x > r) {
            text.css('left', x/2 + 5);
        }else {
            text.css('right',(w - x)/2 + 5);
        }
        if (y > r) {
            text.css('top', y/2 + 5);
        }else {
            text.css('bottom', (h - y)/2 + 5);
        }
        if (cfg.data[i][2]) {
            text.css('color', cfg.data[i][2]);
        }
        text.css('opacity',0); // 开始时隐藏项目文字，等加载完雷达动画再显示
        component.append(text);
        }

    ctx.strokeStyle = '#e0e0e0';
    ctx.stroke();


    // 数据层的开发
    // 加入一个画布(数据层)
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    ctx.strokeStyle = '#f00';
    var draw = function (per) {
        if (per >= 1) { //如果雷达动画加载完成，则显示项目文字
            component.find('.text').css('opacity',1);
        }
        if (per <= 1) {
            component.find('.text').css('opacity',0);
        }
        // 输出数据折线
        ctx.clearRect(0, 0, w, h);
        for(var i = 0;i < step;i += 1) {
            var rate = cfg.data[i][1] * per;
            var rad = (2*Math.PI / 360) * (360 / step) * i;
            var x = r + Math.sin(rad) * r * rate;
            var y = r + Math.cos(rad) * r * rate;
            ctx.lineTo(x, y);   
        }
        ctx.closePath();
        ctx.stroke();

        // 输出数据的点
        ctx.fillStyle = "#ff7676";
        for(var i = 0;i < step;i += 1) {
            var rate = cfg.data[i][1] * per;
            var rad = (2*Math.PI / 360) * (360 / step) * i;
            var x = r + Math.sin(rad) * r * rate;
            var y = r + Math.cos(rad) * r * rate;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
};

    component.on('onLoad', function() {
        // 雷达图生长动画
        var s = 0;
        for(var i = 0;i < 100;i += 1) {
            setTimeout(function () {
                s += 0.01;
                draw(s);
            }, i * 10 + 500);
        }
    });
    component.on('onLeave', function() {
        // 雷达图生长动画
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