$(function(){
 
  var current=1;
  var  pageSize=5;
  
    render();
 function render(){      
   $.ajax({
       type:"get",
        url:"/category/querySecondCategoryPaging",
       data:{
           page:current,
           pageSize:pageSize,
       },
       dataType:'json',
      success:function(info){
      console.log(info);
      var htmlshl=template('tmp',info);
       $("tbody").html(htmlshl);

      //  $('#paginator').bootstrapPaginator({
      //   bootstrapMajorVersion: 3,
      //   // 总页数
      //   totalPages: Math.ceil( info.total / info.size ),
      //   // 当前页
      //   currentPage: info.page,
      //   // 添加页码点击事件
      //   onPageClicked: function( a, b, c, page ) {
      //     // 更新当前页
      //     currentPage = page;
      //     // 重新渲染
      //     render();
     
   $("#paginator").bootstrapPaginator({
       bootstrapMajorVersion:3,
      //  总页数;
      totalPages:Math.ceil(info.total/info.size),
      // 当前页
      current:info.page,
      // 添加页码点击事件
       onPageClicked:function(a,b,c,page){
          // 更新当前页
          current=page;
          // 重新渲染;
          render()
       }
     })
     } 
   })
   }
   
 
  $(".twojia").click(function(){

   $("#twomodal").modal("show");  
    //  发送请求.获取一级分类;
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:100,
      },
      dataType:"json",
      success:function(info){
         
        var htmlstr=template("pla",info);

        $(".modal-body .yiji").html(htmlstr);
      } 
    })
  });

  // 3.通过事件给
   $('.dropdown-menu').on('click',"a",function(){

     var txt=$(this).text();

     $("#dropdownText").text(txt);
    //  获取选中id;
    var id=$(this).data('id');
    // 设置给input;
    $('[name="categoryId"]').val(id);
  
    // 将隐藏教研状,设置成教研状态 updateStatus(字段名,教研状态,教研状态)
   
   $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID")   

   });
    
  //  进行文件上传文件初始化;
    $("#fileupplaod").fileupload({
      
      dataType:"json",
      done:function(e,data){
         console.log(data);      
     var imgUrl=data.result.picAddr;
      $("#imgBox img").attr("src",imgUrl);
      //  将图片地址,设置给input.
      $('[name="brandLogo"]').val(imgUrl);
   
       $("#form").data("bootstrapValidator").updateStatus("brandLogo", "VALID")
      }
    });

   $("#form").bootstrapValidator({
  
     excluded:[],
    
     feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',     // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    fields: {
      // categoryId 分类id
      // brandName 二级分类名称
      // brandLogo 图片地址
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }
    }
  });
   
  $("#form").on("success.form.bv", function( e ) {
      alert(111)
      e.preventDefault();

    //  通过ajax提交;
    $.ajax({
      type:'post',
      url :"/category/addSecondCategory",
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
        if(info.success){
          // 关闭模态框;
         $("#twomodal").modal("hide");
            //  重新渲染去第一页面
            currentPage=1;
            render();
          $("#form").data("bootstrapValidator").resetForm(true);  
          // 手动重置文本内容.和图片路径;

          $('#dropdownText').text("请选择一级分类");
          $('#imgBox img').attr("src", "images/none.png");





  

        }
      }

    })

    })


   })

















 





