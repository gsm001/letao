/**
 * Created by Jepson on 2018/5/9.
 */

// 入口函数, 可以防止全局变量污染
$(function() {

  /*
   * 1. 表单校验功能, 在表单提交时,会进行校验, 所以一定要给表单设置 name 属性
   *    校验要求:
   *        (1) 用户名不能为空, 长度2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */
  $('#form').bootstrapValidator({

    // 指定校验时的图标显示
    feedbackIcons: {
      // 校验成功的
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 配置字段
    fields: {
      // 配置对应字段名
      username: {
        // 配置校验规则
        validators: {
          // 非空校验
          notEmpty: {
            // 提示信息
            message: "用户名不能为空"
          },
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名必须是2-6位"
          },
          callback: {
            message: "用户名不存在"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          // 长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须在6-12位"
          },
          // 专门用来配置回调校验提示信息
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  });


  /*
  * 2 基本登录功能
  * (1) 我们想要通过 ajax 进行登录请求, 这样如果密码错误, 可以很友好的提示
  * (2) 我们又想要使用表单校验插件, 会在表单提交的时候, 进行校验
  *
  * 表单校验插件,
  * 如果在提交时校验成功了, 会自动继续提交, 需要阻止这次提交, 通过 ajax 请求
  * 如果校验失败了, 直接提示用户输入有误, 不会提交
  * */

  // 校验成功时, 调用
  $('#form').on("success.form.bv", function( e ) {

    // 阻止默认的提交
    e.preventDefault();

    console.log($('#form').serialize());

    // 通过 ajax 进行提交
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      dataType: "json",
      data: $('#form').serialize(),
      success: function( info ) {
        // 根据响应回来的数据, 进行判断
        console.log( info );
        if ( info.success ) {
          //alert("登录成功")
          location.href = "index.html";
        }

        if ( info.error === 1001 ) {
          //alert("密码错误");
          // 将密码框, 校验状态改成 错误状态 INVALID
          // updateStatus 三个参数
          // 参数1: 字段名称
          // 参数2: 校验状态  VALID成功  INVALID失败
          // 参数3: 校验规则(主要是用来设置, 提示信息的)
          $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");

        }

        if ( info.error === 1000 ) {
          //alert("用户名不存在");

          $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
      }
    })

  });


  /*
  * 3. 实现重置功能
  * */
  $('[type="reset"]').click(function() {

    // 不仅内容要重置, 校验状态也要重置
    // resetForm 不传 true, 只重置校验状态
    // 传 true, 不仅重置校验状态, 而且重置 内容
    $('#form').data("bootstrapValidator").resetForm( true );
  })

  /*
  * git add .
  * git commit -m "登录完成"
  *
  * git checkout master
  * git merge login
  * git branch -d login
  * */

})