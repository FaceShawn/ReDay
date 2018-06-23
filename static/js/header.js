/**
 * 自动加载
 */
window.onload = function(){


}

/**
 * 模态框显示提示信息
 */
function showInfoModal(info){
    $('#error-modal').modal('show');
    $('#error-modal').on('shown.bs.modal', function() {
        $('#error-modal-body').text("");    // 清空数据
        $('#error-modal-body').append(info);    // 显示信息
    });
}

/**
 * 设置块背景颜色和文本
 * @param  blockList 块颜色对象数组
 */
function showBlock(blockList){

    // 还原所有块的背景颜色
    for (var i = 0; i < 24; i++) {
        for (var j = 1; j < 5; j++) {
            var blockCode = 'block-'+i+'-'+j;
            // 块 Dom 对象
            var block = document.getElementById(blockCode);
            // $(block).addClass('quarter-block');
            $(block).css("background-color", "#eeeeee");
            block.innerText = "";
         }
    }

    // 设置传入的块背景颜色和文本
    for (var i = 0; i < blockList.length; i++) {
        // 块号
        var blockCode = blockList[i]['block_code'];
        // 块背景颜色
        var blockColor = blockList[i]['block_color'];
        // 块文本
        var blockText = blockList[i]['block_text'];
        // 块 Dom 对象
        var block = document.getElementById(blockCode);
        $(block).css("background-color", blockColor);

        // 设置文本内容
        block.innerText = blockText;

        // 文本垂直居中？

        // 文本颜色为白色
        $(block).css("color", "#ffffff");
    }
}


/**
 * 展示标签按钮
 */
function showTag(objList)
{
    // 清空表格旧数据
    $("#tag-button-table tr:not(:first)").html("");
    // 获取标签表格 DOM 对象
    var table = document.getElementById("tag-button-table");
    // 显示标签列表
    for(var i=0; i<objList.length; ++i)
    {
        // 标签对象
        var obj     = objList[i];
        var tagId   = obj['id'];
        var tagName = obj['tag_name'];
        var ownerId = obj['owner_id'];
        var tagColor = obj['tag_color'];

        // 在表格当前行（第一行）前插入一行
        var row = table.insertRow(-1);
        // 在此行当前列（第一列）前插入一列
        var cell = row.insertCell(-1);
        // 插入按钮
        cell.innerHTML = '<button class="btn btn-block"'
        + ' onclick="sendItem(' + tagId +')"'
        // 设置文本为白色，按钮颜色
        + ' style="color:white; background-color:'+ tagColor +';"'
        + '>' + tagName + '</button>';
    }
}


/**
 * 获取点击的事项块
 * 新添加事项需要点击两次才能选中
 */
$(function(){
    $(".quarter-block").each(function(k,v){
        $(v).click(function(e){

            // 获取点击的事项块号
            var blockCode = $(e.target).attr('id');
            // 测试信息展示
            $('#debug-info').append("选中块号：" + blockCode + "<br></br>");

            // 选中块
            if(!$(v).is(".selected")){
                // 改变样式
                // $(this).css("background-color", "#BBFFFF");
                $(this).addClass("selected");
                // 选中的块号加入数组
                blockCodeArray.push(blockCode);
            // 重复选中
            }else{
                // 移除样式
                $(this).removeClass("selected");

                // // 测试信息展示
                // $('#debug-info').append("返回块数据：" + JSON.stringify(returnBlockList) + "<br></br>");

                // var blockColor;
                // for (var i = 0; i < returnBlockList.length; i++) {
                //     if(blockCode == returnBlockList[i]['block_code']) {
                //         blockColor = returnBlockList[i]['block_color'];
                //         break;
                //     }
                // }

                // // 若原先已有颜色，即在对象数组 returnBlockList 中找到 blockCode
                // // 则变回标签的颜色
                // // 否则变为初始化颜色
                // if (i < returnBlockList.length) {
                //     $(this).css("background-color", blockColor);
                // } else {
                //     $(this).css("background-color", "#eeeeee");
                // }

                // 若数组中已有则根据值删除元素
                blockCodeArray.splice($.inArray(blockCode, blockCodeArray), 1);
            }
        });
    });
});



/**
 * DOM 展示标签列表
 * @param  {[type]} objList [description]
 * @return {[type]}         [description]
 */
function showTagList_DOM(objList)
{
    // 空参数为测试
    if(objList === undefined){
        alert("table展示测试");
        var objList = [{"id":"4","tag_name":"数学","owner_id":"1","color":"red"},{"id":"2","tag_name":"英语","owner_id":"1","color":"yellow"},{"id":"3","tag_name":"政治","owner_id":"1","color":"green"}];
    }
    // parse 解析
    var objList = JSON.parse(objList);

    // 获取表格 id
    var table = document.getElementById("tag-list-table-1");
    for(var i=0; i<objList.length; ++i)
    {
        var row = table.insertRow(-1);
        var obj = objList[i];
        // alert(obj["id"]);
        for(var key in obj){
            var cell = row.insertCell(-1);
            cell.innerHTML=obj[key];
        }
        var cell=row.insertCell(-1);
        cell.innerHTML="<a href=\"#\" onclick=\"fooddelete(this)\">删除</a> ";
    }
}


/**
 * bootstrap table  展示标签列表
 * @param  {[type]} objList [description]
 * @return {[type]}         [description]
 */
function showTagList_bootstrap(objList)
{
    $('#tag-list-table-2').bootstrapTable({
        url: '/schedule/getTagList',
        columns: [{
            field: 'statebox',
            checkbox: true
        },{
            field: 'id',
            title: '编号'
        }, {
            field: 'tag_name',
            title: '标签名'
        }, {
            field: 'owner_id',
            title: '用户编号'
        }, {
            field: 'tag_color',
            title: '颜色'
        }],
        striped:true,
        // 行操作
        // onClickRow: function(row, $element,field){
        //     var i = $element.data('index');//可通过此参数获取当前行号
        //     alert(i+"，"+row.owner_id+"，"+field);
        // }

        onClickCell: function(field, value, row, $element){
            // field：点击列的 field 名称
            // value：点击列的 value 值; 当前点击列所在行的内容，可以直接理解为单元格的内容
            // row：点击列的整行数据; 当前点击列所在行的所有数据
            // $element：td 元素
            // 测试信息展示
            if(DEBUG){
                $('#debug-info').append("field="+ field +"，");
                $('#debug-info').append("value="+ value +"，");
                $('#debug-info').append("row.id="+ row.id +"，");
                $('#debug-info').append("$element="+ $element);
                $('#debug-info').append("<br></br>");
            }
        }
    });
}