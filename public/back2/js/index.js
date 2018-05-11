/**
 * Created by Jepson on 2018/5/11.
 */

$(function() {

  // 1. 实现柱状图
  // 基于准备好的dom，初始化echarts实例
  var echarts_1 = echarts.init(document.querySelector(".echarts_1"));

  // 指定图表的配置项和数据
  var option1 = {
    // 大标题
    title: {
      // 标题文本
      text: '2017年注册人数'
    },
    // 提示框组件
    tooltip: {},
    // 图例
    legend: {
      // 图例中的数据要和 series 系列中的 name 对应起来
      data:['人数']
    },
    // x轴的数据
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    // y轴的数据, 不需要设置, 最好根据series里面的数据动态生成
    yAxis: {},
    series: [{
      name: '人数',
      // bar 柱状图, line 折线图, pie 饼状图
      type: 'bar',
      data: [1000, 1500, 1800, 2000, 2500, 1300]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_1.setOption(option1);


  // 2. 实现饼状图
  var echarts_2 = echarts.init(document.querySelector(".echarts_2"));

  // 指定图表的配置项和数据
  var option2 = {
    title : {
      text: '热门品牌销售',
      // 子标题
      subtext: '2017年6月',
      // 控制大标题的位置
      x:'center'
    },
    // 提示框组件
    tooltip : {
      trigger: 'item',
      // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 图例
    legend: {
      // 设置图例的排列方式
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪王','新百伦','李宁','阿迪']
    },
    series : [
      {
        name: '品牌',
        type: 'pie',
        // 设置圆的直径所占百分比
        radius : '70%',
        // 圆心点的坐标
        center: ['50%', '60%'],
        data:[
          {value:335, name:'耐克'},
          {value:310, name:'阿迪王'},
          {value:234, name:'新百伦'},
          {value:135, name:'李宁'},
          {value:1548, name:'阿迪'}
        ],
        itemStyle: {
          // 阴影效果
          emphasis: {
            shadowBlur: 100,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_2.setOption(option2);

})
