/**
 * Created by Jepson on 2018/5/11.
 */

$(function() {
  // 当前页
  var currentPage = 1;
  // 每页多少条
  var pageSize = 5;



  // 1. 一进入页面渲染页面
  // 如果后台返回的响应头中, 设置了content-type 为 application/json
  // jquery 会自动按照 json 格式进行解析响应结果, 我们就可以不用配置 dataType了
  // 需要向后台请求 用户列表数据, 通过模板引擎, 进行页面渲染
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        // 将数据和模板相结合, 渲染到页面中
        // template("模板id", "数据对象")
        // 参数1: 模板 id
        // 参数2: 数据对象, 必须是一个对象
        // 在模板中, 可以任意使用对象中的属性
        var htmlStr = template("tpl", info);

        // 进行渲染
        $('.lt_content tbody').html( htmlStr );


        // 配置分页插件
        $('#paginator').bootstrapPaginator({
          // 配置 bootstrap 版本
          bootstrapMajorVersion: 3,
          // 总共多少页, 需要向上取整 Math.ceil
          totalPages: Math.ceil( info.total / info.size ),
          // 当前页
          currentPage: info.page,
          // 页码点击事件
          // type 可以标记按钮的功能类型
          // page 表示将要渲染的页码
          onPageClicked: function( a, b, c, page ) {
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        })

      }
    });
  }



  // 2. 点击启用禁用按钮, 显示模态框, 通过事件委托做
  $('.lt_content tbody').on("click", ".btn", function() {

    // 让模态框显示
    $('#userModal').modal("show");

    // 用户id, 以data- 开头的自定义属性, 可以直接 data("id") 就可以获取
    var id = $(this).parent().data("id");

    // 用户状态, 可以根据当前按钮的类名, 判断需要将用户置成什么状态
    // 1 正常  0 禁用
    var isDelete = $(this).hasClass("btn-success") ? 1 : 0;


    // 添加点击事件, 让某个用户启用禁用, 说白了, 就是重复注册了
    // 之前注册的还存在, 导致代码重复执行了
    // 通过 off() 可以将之前重复注册的事件移除, 再进行事件绑定, 可以保证只有一个事件绑定了
    $('#submitBtn').off().click(function() {

      // 发送请求, 需要知道, 用户 id 和 需要设置的状态
      $.ajax({
        type: "post",
        url: "/user/updateUser",
        data: {
          id: id,
          isDelete: isDelete
        },
        success: function( info ) {
          console.log( info );

          // 关闭模态框
          $('#userModal').modal("hide");

          // 重新渲染页面
          render();
        }
      })


    })

  });





})
