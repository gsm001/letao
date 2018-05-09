// 禁用进度条
NProgress.configure({showSpinner: false});

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
$(document).ajaxStart(function(){
  // 开启进度条
  NProgress.start();
});
$(document).ajaxStop(function(){
  // 模拟网络环境
  setTimeout(function(){
    // 结束进度条
    NProgress.done();
  },500)
  
})