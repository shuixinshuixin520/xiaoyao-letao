
/**
 * Created by Jepson on 2018/8/7.
 */


$(function() {

  /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */

  // 检验插件初始化
  $('#form').bootstrapValidator({

 
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },



     fields:{
      /*非空校验*/  
      username:{
         validators:{
          notEmpty:{
            message:'用户名不能为空',
          
          },
       
          // 长度校验
          stringLength:{
            min:2,
            max:6,
            message:'用户名长度必须2到6位之间'

          },
          callback:{
            message:'用户名不存在',
          }

         
         }

      }, 
      password:{
        validators:{
          notEmpty:{
            message:'密码不能为空'

          },
         stringLength:{
          min:6,
          max:12,
          message:"用户密码必须6到16位"

         },
         callback:{
          message:'密码错误',
        }

        }
      }   
     }

  });

  // 组织表单默认行为;
  
  $('#form').on("success.form.bv",function(e){
    e.preventDefault();
   
    $.ajax({
    type:"POST",
    url :"/employee/employeeLogin",
    data:$('#form').serialize(),
    dataType:"json",
    success:function(info){
     if(info.error===1000){
     
     $('#form').data('bootstrapValidator').updateStatus('username','INVALID',"callback")     
     }
     if(info.success){
      location.href="index.html";
     }
     if(info.error===1001){
      // 参数1: 字段名称
          // 参数2: 校验状态, VALID成功的, INVALID失败的, NOT_VALIDATED未校验的
          // 参数3: 指定校验规则, 可以设置提示信息
          $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
     }
    }

  })
 }) 
    // 点击重置按钮,进行样式重置
   $('[type="reset"]').click(function(){
   
   $("#form").data('bootstrapValidator').resetForm();
   })
  

})




