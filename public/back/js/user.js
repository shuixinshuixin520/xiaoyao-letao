$(function(){
 var current=1;
 var pageSize=5;

 var currentid;
 var deleteid;

   rander();
 function rander(){ 
  $.ajax({
    type:"get",
    url :"/user/queryUser",
    data:{
      page:current,
      pageSize:pageSize,
    }, 
    dataType:"json",
   success:function(info){
      console.log(info);
   var user=template("tmp",info) 
   $('tbody').html(user); 
  



  $('.pagination').bootstrapPaginator({
    bootstrapMajorVersion:3,
    totalPages:Math.ceil(info.total/info.size ),//当前页
    currentPage:info.page,//总页数
   
    onPageClicked:function(a,b,c,page){
      //为按钮绑定点击事件 page:当前点击的按钮值
       current=page;
       rander();
     }
   });
  }
 });
}

 
 $("tbody").on("click",".btn",function(){

  $("#usermodal").modal('show');
  
  // currentid= $(this).parent().data('id');
  // deleteid = $(this).hasClass('btn-danger')?0:1;
  currentid=$(this).parent().data('id');
  deleteid = $(this).hasClass('btn-danger')?0:1; 

 });
  
 $("#queding").click(function(){   
 
    console.log(currentid)
    console.log(deleteid)

 $.ajax({
   type:"post",
   url :"/user/updateUser",
   data:{
    id:currentid,  
    isDelete:deleteid
   },
   dataType:"json",
   success:function(info){
     console.log(info);    
     $("#usermodal").modal('hide');
    rander();    
   }
  })


 })


















});