/**
 * 自动加载
 */
window.onload = function(){

    // 获取标签
    acceptLabelList();
};

/**
 * 获取标签数据
 */
function acceptLabelList(){

    var data = {};

    // 测试信息展示
    $('#debug-info').append("<br><br> acceptLabelList() ");
    $('#debug-info').append("<br> 发送数据：" + JSON.stringify(data) );

    $.ajax({
        type: "POST",
        url: "/label/acceptLabelList",
        data: data,  //提交到后台的数据
        dataType: "json",   //回调函数接收数据的数据格式
        success: function(msg){

            // 测试信息展示
            $('#debug-info').append("<br> 返回数据：" + JSON.stringify(msg) );

            // 状态码，获取标签成功
            if(msg.status == 200){

                // DOM 展示标签列表
                showLabelList_DOM(msg.labelList);
            }else{
                // 模态框显示状态码、提示信息、跳转链接
                showInfoModal( msg.status, msg.info, msg.url);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // 模态框显示状态码、提示信息、跳转链接
            showInfoModal( '404', 'ajax 请求错误！', '#');
        },
    });
}


/**
 * DOM 展示标签列表
 * @param  {[type]} objList [description]
 * @return {[type]}         [description]
 */
function showLabelList_DOM(objList)
{
    // 测试信息展示
    $('#debug-info').append("<br><br> showLabelList_DOM() ");
    $('#debug-info').append("<br> DOM 数据：" + JSON.stringify(objList) );

    // 清空表格旧数据
    $("#label-manage-list tr:not(:first)").html("");
    // 根据id获取表格对象
    var table = document.getElementById("label-manage-list");

    for(var i=0; i<objList.length; ++i)
    {
        // 插入一行
        var row = table.insertRow(-1);
        // 一条数据记录对象
        var obj = objList[i];

        // 展示 obj 中所有数据
        // for(var key in obj){
        //     cell = row.insertCell(-1);
        //     cell.innerHTML=obj[key];
        // }

        // 标签编号
        row.insertCell(-1).innerText = obj.id ;

        // 标签按钮
        row.insertCell(-1).innerHTML = '<button disabled class="btn btn-block label-btn "' +
        ' style="color:white; background-color:'+ obj.tag_color +';">' + obj.tag_name + '</button>';

        // 标签颜色
        row.insertCell(-1).innerText = obj.tag_color ;

        // 删除按钮
        row.insertCell(-1).innerHTML = '<button class="btn btn-danger btn-block  "' +
        ' onclick="deleteLabel(' + obj.id +')" style="color:white; "> 删除 </button>';

        // row.insertCell(-1).innerHTML = '<button class="btn btn-danger btn-block btn-delete-label style="color:white; "> 删除 </button>';
    }
}


/**
 * 删除标签
 * @param  {[type]} tagId [description]
 * @return {[type]}       [description]
 */
function deleteLabel(tagId){

    var data = {};
    data.tagId = tagId;

    // 模态框显示状态码、提示信息、跳转链接
    showInfoModal( 600, '确认删除此标签？', '#');

    // 测试信息展示
    $('#debug-info').append("<br><br> deleteLabel(tagId)");
    $('#debug-info').append("<br> 发送数据 ：" + JSON.stringify(data) );

    // 监听模态框的确认按钮
    $("#error-modal-url").click(function(){
        $.ajax({
            type: "POST",
            url:  "/label/deleteLabel",
            data: data,  //提交到后台的数据
            dataType: "json",   //回调函数接收数据的数据格式
            success: function(msg){

                // 测试信息展示
                $('#debug-info').append("<br> 返回数据 ：" + JSON.stringify(msg) );

                // 状态码
                if(msg.status == 200){
                    // 删除成功,刷新当前页面
                    acceptLabelList();
                }else{
                    // 模态框显示状态码、提示信息、跳转链接
                    showInfoModal( msg.status, msg.info, msg.url);
                }
            },
            error:  function(XMLHttpRequest, textStatus, errorThrown) {
                // 模态框显示状态码、提示信息、跳转链接
                showInfoModal( '404', 'ajax 请求错误！', '#');
            },
        });
    });

    // 测试信息展示
    $('#debug-info').append("<br> 取消删除"  );
}

/**
 * 添加标签
 * @return {[type]}         [description]
 */
function sendLabel(){
    var data = {};
    data.tagName = $("#tagName").val();    //正在添加的标签名tagname
    data.tagColor = $("#tagColor").val(); //正在添加的标签颜色tagColor

    // $("#tagColor").css('background-color', blue);
    // $("#tagColor").css({"background-color": data.tagColor});

    // 测试信息展示
    $('#debug-info').append("<br><br> sendLabel() ");
    $('#debug-info').append("<br> 发送数据：" + JSON.stringify(data) );

    $.ajax({
        type: "POST",
        url: "/label/sendLabel",
        data: data,  //提交到后台的数据
        dataType: "json",   //回调函数接收数据的数据格式
        success: function(msg) {

            // 测试信息展示
            $('#debug-info').append("<br> 返回数据：" + JSON.stringify(msg) );

            // 状态码，获取块数据成功
            if(msg.status == 200) {
                // 添加成功模态框
                showInfoModal( msg.status, msg.info, msg.url);
            } else {
                // 模态框显示状态码和提示信息
                showInfoModal( msg.status, msg.info, msg.url);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // 模态框显示状态码、提示信息、跳转链接
            showInfoModal( '404', 'ajax 请求错误！', '#');
        },
    });
}
