// 环图组件对象

var H5ComponentRing = function (name, cfg) {

  // 一个环图应该只能有一个数据
  if (cfg.data.length > 1) {
    cfg.data = [cfg.data[0]];
  }

  // 重设配置中的 type 参数，利用 H5ComponentPie构建Ring(环图)
  cfg.type = 'pie';
  var component = new H5ComponentPie(name, cfg);

  // 修正组件的样式，以支持在样式文件中组件的样式定义 .h5_component_ring 相关样式能生效
  component.addClass('h5-component-ring');

  // 创建遮罩，并添加到组件中
  var mask = $('<div class="mask">');
  component.append(mask);

  // 设置text文本颜色
  var text = component.find('.text');
  text.attr('style','');
  if (cfg.data[0][2]) {
    text.css('color',cfg.data[0][2]);
  }

  // 在遮罩元素中(.mask)添加文本信息
  mask.append(text);

  return component;
};