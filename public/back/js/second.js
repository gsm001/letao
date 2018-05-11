$(function(){
  var currentPage = 1;
  var pageSize = 5;
  
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        // console.log(info);
        var htmlStr = template("secTpl", info);
        $('.lt_content tbody').html(htmlStr);
        
        //分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total / info.size),
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render();
          }
          
        })
      }
    })
  }
  
  // 2. 点击添加按钮, 显示添加模态框
  $('#addBtn').click(function(){
    $('#addModal').modal("show");
  })
})
