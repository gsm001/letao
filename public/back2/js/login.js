/**
 * Created by Jepson on 2018/5/9.
 */

// 入口函数, 可以防止全局变量污染
$(function() {

  /*
   * 1. 表单校验功能, 在表单提交时,会进行校验, 所以一定要给表单设置 name 属性
   *    校验要求:
   *        (1) 用户名不能为空
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
          }
        }
      }
    }
  });

})