/**
 * Created by Jepson on 2018/5/9.
 */


// 5. 登录拦截分析, 现在注意: 我们是前后端分离的, 前端并不知道当前用户有没有登录
//    不知道, 问呗, 需要一进入页面, 就调用接口, 来判断当前用户有没有登录
//    (1) 如果没有登陆, 不需要下面的操作了, 直接拦截到登录页面即可
//    (2) 如果当前用户登录, 啥都不用干, 让用户继续访问即可
//    (3) 我们需要将不需要用户登录的页面 (登录页, 进行排除)

if ( location.href.indexOf("login.html") === -1 ) {
  // 如果当前地址栏中没有 login.html, 需要判断当前用户状态
  $.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    dataType: "json",
    success: function( info ) {
      if ( info.error === 400 ) {
        location.href = "login.html";
      }
    }
  })
}






// 禁用进度条
NProgress.configure({ showSpinner: false });

// 希望效果是, 每次ajax提交, 产生进度条, ajax完成, 结束进度条
/*
* ajax 全局事件
*   ajaxComplete 只要请求完成就调用 (不管成功或者失败)
*   ajaxError 请求失败时调用
*   ajaxSuccess 请求成功时调用
*
*   ajaxSend  请求发送时调用
*
*   ajaxStart  第一个ajax开始发送的时候调用
*   ajaxStop   最后一个ajax结束时调用
* */

$(document).ajaxStart(function() {
  // 开启进度条
  NProgress.start();
});

$(document).ajaxStop(function() {
  // 模拟网络环境
  setTimeout(function() {
    // 结束进度条
    NProgress.done();
  }, 500);
});


$(function() {

  // 1. 公共的二级菜单切换功能
  $('.category').click(function() {
    $('.lt_aside .child').stop().slideToggle();
  });


  // 2. 点击菜单按钮, 进行切换菜单
  $('.icon_menu').click(function() {
    $('.lt_aside').toggleClass("hidemenu");
    // 当菜单隐藏时, lt_topbar, lt_main 都不需要 padding-left 了
    $('.lt_topbar').toggleClass("hidemenu");
    $('.lt_main').toggleClass("hidemenu");
  });


  // 3. 点击 icon_logout 应该显示模态框
  $('.icon_logout').click(function() {
    // 通过 id 找到模态框, 通过 modal ("show") 显示模态框
    $('#logoutModal').modal("show");
  });


  // 4. 点击模态框退出按钮, 实现退出
  $('#logoutBtn').click(function() {
    // 退出, 不能直接跳到登录页, 需要调用退出接口, 销毁登录状态
    //location.href = "login.html";
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 退出成功, 退出成功, 跳回登录页
          location.href = "login.html";
        }
      }
    })
  });


})







