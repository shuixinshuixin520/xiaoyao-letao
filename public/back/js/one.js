$(function(){
  var current=1;
  var currentPage=5;
  render();
  function render(){ 
  $.ajax({
   type:"get",
   url :"/category/queryTopCategoryPaging",
   data:{
     page:current,
     pageSize:currentPage
   },
   dataType:"json",
   success:function(info){
    
   console.log(info)
    var shuju=template("tmp",info);
    $('tbody').html(shuju);
     
   
    // $('.pagination').bootstrapPaginator({
    //   bootstrapMajorVersion:3,
    //   totalPages:Math.ceil(info.total/info.size ),//当前页
    //   currentPage:info.page,//总页数
     
    //   onPageClicked:function(a,b,c,page){
    //     //为按钮绑定点击事件 page:当前点击的按钮值
    //      current=page;
    //      rander();
    //    }
    //  });
  
     $(".pagination").bootstrapPaginator({
       bootstrapMajorVersion:3,
       totalPages:Math.ceil(info.total/info.size ),//当前页
       currentPage:info.page,//总页数 
 
       onPageClicked:function(a,b,c,page){
             //为按钮绑定点击事件 page:当前点击的按钮值
              current=page;
              render();
           }  



     })


    }
  

  })
}


  // 3. 使用表单校验插件, 实现表单校验
  $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',     // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置字段
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "一级分类不能为空"
          }
        }
      }
    }
  });



  $(".tianjia").click(function(){
     
      $("#onemodal").modal("show");

   });

   console.log(1111)
 
  $('#t-jia').click(function(){
 
      $.ajax({
       type:"post",
       url :"/category/addTopCategory",
       data:$("#form").serialize(),
       dataType:"json",
      success:function(info){
       console.log(info);
       $("#onemodal").modal("hide");
      
       render();
      //  $("#form").data("bootstrapValidator").resetForm(true);
       $('#form').data("bootstrapValidator").resetForm(true);
      }


    })

  })
 



})