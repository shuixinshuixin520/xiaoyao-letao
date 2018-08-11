$(function(){
 var current=1;
  var pageSize=5;
 
  var picArr=[];
 render();
  function render(){    
 $.ajax({
   type:"get",
   url :"/product/queryProductDetailList",
   data:{
     page:current,
     pageSize:pageSize,
   },
   dataType:"json",
   success:function(info){
   console.log(info);
   var htmlstr=template('product',info);
   $("tbody").html(htmlstr); 
    
  //  分页插件;
  $("#pagintor").bootstrapPaginator({
    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
    currentPage:info.page,//当前页
    totalPages:Math.ceil(info.total/info.size),//总页数
  
    onPageClicked:function(a,b, c,page){
     current=page;
      render();
     }
   });
  }
 })  
}  

  $(".t-product").click(function(){
   
    $("#t-moban").modal("show");
    
    $.ajax({
       type:"get",
       url :"/category/querySecondCategoryPaging",
       data:{
         page:1,
         pageSize:100,
         },
        dataType:"json",
       success:function(info){
      //  console.log(info);
      var htmlstr=template("fenlei",info)
        $(".dropdown .yiji").html(htmlstr);

    $(".yiji").on("click","a",function(){
      
       var txt=$(this).text();
       $("#dropdownText").text(txt);
  
       var id=$(this).data("id");
        $("[name='brandId']").val(id);
        $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");

        
         })
        }
       }) 
      })
  
     $("#fileupload").fileupload({
       dataType:"json",
       done:function(e,data){
      //   console.log("图片上完成")
      //  console.log(data.result.picAddr)
      picArr.unshift(data.result);
   
      var picurl=data.result.picAddr;
        
      $("#imgBox").prepend('<img src="'+picurl+'" width="100" alt="">' ) 
            //  如果图片超过三张;
        if(picArr.length>3){
         picArr.pop();
         $("#imgBox img:last-of-type").remove();
        }    
      
        
      if ( picArr.length === 3 ) {
        // 说明上传 3 张图片了, 将picStatus校验状态置成 VALID
        $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
      }

       }
     });
   
   $("#form").bootstrapValidator({

      excluded:[],
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',     // 校验成功
        invalid: 'glyphicon glyphicon-remove',  // 校验失败
        validating: 'glyphicon glyphicon-refresh'  // 校验中
      },
  fields:{
     brandId:{
       validators:{
        notEmpty:{
           message:"请输入二级分类"
        }
       }
     },
   proName:{

    validators:{
      notEmpty:{
         message:"请输入二级分类"
      }
     }

   },
   
   proDesc: {
    validators: {
      notEmpty: {
        message: "请输入商品描述"
      }
    }
  },
   
  // 正则
  num: {
    validators: {
      notEmpty: {
        message: "请输入商品库存"
      },
      //正则校验
      regexp: {
        regexp: /^[1-9]\d*$/,
        message: '商品库存必须是非零开头的数字'
      }
    }
  },
  // 尺码要求: 必须 xx-xx 格式, x 表示数字
  size: {
    validators: {
      notEmpty: {
        message: "请输入商品库存"
      },
      //正则校验
      regexp: {
        regexp: /^\d{2}-\d{2}$/,
        message: '商品尺码必须是 xx-xx 的格式, 例如 32-40'
      }
    }
  },

  // 原价
  oldPrice: {
    validators: {
      notEmpty: {
        message: "请输入商品原价"
      }
    }
  },
  // 现价
  price: {
    validators: {
      notEmpty: {
        message: "请输入商品现价"
      }
    }
  },
  // 标记当前图片是否上传满三张
  picStatus: {
    validators: {
      notEmpty: {
        message: "请上传3张图片"
       }
     }
    }

    }

   });
  
  //  6.注册表单校验时间;
 $("#form").on("success.form.bv",function(e){
     console.log(1111)
  
   e.preventDefault();

   var paramsStr=$("#form").serialize();
  
   paramsStr += "&picAddr1=" + picArr[0].picAddr + "&picName1=" + picArr[0].picName;
   paramsStr += "&picAddr2=" + picArr[1].picAddr + "&picName2=" + picArr[1].picName;
   paramsStr += "&picAddr3=" + picArr[2].picAddr + "&picName3=" + picArr[2].picName;

     $.ajax({
        type:"post",
        url :"/product/addProduct",
        data:paramsStr,
         dataType:"json",
         success:function(info){
           if(info.success){
        $("#t-moban").modal("hide");
          currentPage=1;
          render();
          $("#form").data("bootstrapValidator").resetForm(true);
          $('#dropdownText').text("请输入二级分类");
          // 以及图片重置(将所有图片移除)
          $('#imgBox img').remove();
         
          picArr = [];
           }
              

 



         }
 



   })


 }) 
    
    













})