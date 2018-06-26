/**
 * 自动加载
 * @return {[type]} [description]
 */
window.onload = function(){

    acceptUserList();

}

/**
 * 获取用户数据
 * @return {[type]} [description]
 */
function acceptUserList(){
    var data = {};

    // 测试信息展示
    $('#debug-info').append("<br><br> acceptUserList() ");
    $('#debug-info').append("<br> 发送数据：" + JSON.stringify(data) );

    $.ajax({
        type: "POST",
        url: "/admin/acceptUserList",
        // contentType: "application/json;charset=utf-8",    //发送数据类型
        data: data,  //提交到后台的数据
        dataType: "json",   //回调函数接收数据的数据格式
        success: function(msg){

            // 测试信息展示
            $('#debug-info').append("<br> 返回数据：" + JSON.stringify(msg) );

            // 获取返回数据
            returnUserList = msg.userList;

            // 状态码，获取用户数据成功
            if(msg.status == 200) {

                //加载展示用户列表
                showUserList_DOM(returnUserList);
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


/**
 * 展示用户列表
 * @param  {[type]} userList [description]
 * @return {[type]}         [description]
 */

function showUserList_DOM(userList)
{
    // 测试信息展示
    $('#debug-info').append("<br><br> showAdminList_DOM() ");
    $('#debug-info').append("<br> DOM 数据：" + JSON.stringify(userList) );

    // 清空表格旧数据
    $("#userList_table tr:not(:first)").html("");
    // 根据id获取用户表格对象
    var table = document.getElementById("userList_table");

    for(var i=0; i<userList.length; ++i)
    {
        // 在表格当前行（第一行）前插入一行
        var row = table.insertRow(-1);

        // 一条数据记录对象
        var user = userList[i];

        // 用户编号
        row.insertCell(-1).innerText = user.id ;

        // 用户邮箱
        row.insertCell(-1).innerText = user.email ;

        // 用户编号
        row.insertCell(-1).innerText = user.user_name ;

        // 删除按钮
        row.insertCell(-1).innerHTML = '<button class="btn btn-danger btn-block "' +
        ' onclick="deleteAdmin(' + user.id +')" style="color:white; "> 删除 </button>';
    }
}


/**
 * 删除用户
 * @param  {[type]} userId [description]
 * @return {[type]}       [description]
 */
function deleteAdmin(userId){

    var data = {};
    data.userId = userId;

    // 模态框显示状态码、提示信息、跳转链接
    showInfoModal( 600, '确认删除此用户 ？', '#');

    // 测试信息展示
    $('#debug-info').append("<br><br> deleteAdmin(userId)");
    $('#debug-info').append("<br> 发送数据 ：" + JSON.stringify(data) );

    // 监听模态框的确认按钮
    $("#error-modal-url").click(function(){
        $.ajax({
            type: "POST",
            url:  "/admin/deleteAdmin",
            data: data,  //提交到后台的数据
            dataType: "json",   //回调函数接收数据的数据格式
            success: function(msg){

                // 测试信息展示
                $('#debug-info').append("<br> 返回数据 ：" + JSON.stringify(msg) );

                // 状态码
                if(msg.status == 200){
                    // 删除成功,刷新当前页面
                    acceptUserList();
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
