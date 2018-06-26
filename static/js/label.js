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
