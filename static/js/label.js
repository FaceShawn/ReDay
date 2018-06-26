/**
 * 自动加载
 */
window.onload = function(){

    // 获取事件
    acceptLabelList();
};

/**
 * 获取事件数据
 */
function acceptLabelList(){

    // 获取开始日期，默认当前日期前一周
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

            // 状态码，获取事件成功
            if(msg.status == 200){

                // DOM 展示事件列表
                showLabelList_DOM(msg.labelList);

                // bootstrap table  展示事件列表
                // showEventList_bootstrap(eventList);

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
 * DOM 展示列表
 * @param  {[type]} objList [description]
 * @return {[type]}         [description]
 */
function showLabelList_DOM(objList)
{
    // 测试信息展示
    $('#debug-info').append("<br><br> showLabelList_DOM() ");
    $('#debug-info').append("<br> 数据：" + JSON.stringify(objList) );

    // 清空表格旧数据
    $("#label-manage-list tr:not(:first)").html("");
    // 获取表格 id
    var table = document.getElementById("label-manage-list");

    for(var i=0; i<objList.length; ++i)
    {

        var row = table.insertRow(-1);
        var obj = objList[i];

        // 标签对象
        var tagId   = obj.id;
        var tagName = obj.tag_name;
        var ownerId = obj.owner_id;
        var tagColor = obj.tag_color;

        for(var key in obj){
            var cell = row.insertCell(-1);
            cell.innerHTML=obj[key];
        }
        var cellDelete=row.insertCell(-1);
        // 插入按钮
        cellDelete.innerHTML = '<button class="btn btn-block label-btn "' +
        ' onclick="deleteLabel(' + tagId +')"' +
        // 设置文本为白色，按钮颜色
        ' style="background-color:'+ tagColor +';"' +
        '>' + tagName + '</button>';
    }
}


function deleteLabel(tagId){

    var data = {};
    data.tagId = tagId;

    // 测试信息展示
    $('#debug-info').append("<br><br> deleteLabel(tagId)");
    $('#debug-info').append("<br> 发送数据 ：" + JSON.stringify(data) );

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
                // 添加成功,刷新当前页面
                acceptBlockAndTag();
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
