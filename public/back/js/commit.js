// 判断用户是否登录实行登录拦截；
 
 if(location.href.indexOf('login.html')===-1){
  $.ajax({
    type:"get",
    url :"/employee/checkRootLogin",
    dataType:'json',
    success:function(info){
      console.log(info)
     if(info.error===400){
       location.href='login.html'
     }


    }




  })



 }
 



 




      //  在发送ajax请求时,关闭进度条;
    $(document).ajaxStart(function(){

        NProgress.start();
    })
      $(document).ajaxStop(function(){ 
     
         NProgress.done();
     

     });

$(function(){
 
  // 公共的功能实现
  // 1. 左侧二级菜单切换
  $(".category").click(function(){
  $(".child").slideToggle();
   
  })


   // 2. 点击切换侧边栏
  $('.icon_menu').click(function(){
   $(".banner").toggleClass('hidemenu');
   $(".t-banner").toggleClass('hidemenu')
   $(".l-banner").toggleClass('hidemenu')
 

  })


})




// 公共样式
  // 点击按钮弹出模态框；
$(function(){
  
  $(".icon_logout").click(function(){
  $('#mymodal').modal('show')
  })
 $('#logout').click(function(){
  $.ajax({
       type:'get',
       url :"/employee/employeeLogout",
      dataType:"json",
      success:function(){
        if(info.success){
          location.href='login.html';
        }

      }



  })
 


 })

 $(".logout").click(function(){
  // alert(111)
 $.ajax({

   type:'get',
   url:"/employee/employeeLogout",
   dataType:'json',
   success:function(info){

     if(info.success){

      location.href="login.html";
     }
   }


 })
 


 })









   


})
