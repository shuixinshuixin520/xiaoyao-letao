
$(function (){

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
// 登录功能;

 $("#form").on('success.form.bv',function(e){
   e.preventDefault();
 $.ajax({
   type:'post',
   url :'/employee/employeeLogin',
   data: $("#form").serialize(),
   dateType:'json',
   success:function(info){
    console.log(info);
    // 登陆成功
    if(info.success){
      location.href="index.html";
    }
    //  用户名错误；
    if(info.error===1000){
      $('#form').data('bootstrapValidator').updateStatus("username", "INVALID", "callback")
      } 
        //密码错误  
     if(info.error==1001){
    $('#form').data('bootstrapValidator').updateStatus("password","INVALID","callback")

     }
 

   } 


 })
});
  // 3.解决表单bug\
  $('[type="reset"]').click(function() {
    // 需要调用插件方法, 进行重置表单校验状态
    // 不传 true, 只重置校验状态, 传 true, 文本内容和校验状态都进行重置
    $('#form').data("bootstrapValidator").resetForm();
  });





})