<?php
namespace app\controllers;

use fastphp\base\Controller;
use app\controllers\Account;
use app\models\Tag;

class Label extends Account
{
    protected $tagName;
    protected $tagColor;
    protected $msg = Array();


    /**
     * 展示管理标签主页
     * @return [type] [description]
     */
    public function index()
    {
        return $this->fetch('/label/index');
    }


    /**
     * 获取事件统计信息
     *
     * @param $_POST['belongDate'] 前端传来的所属日期
     * @param $this->getUserId() 当前用户编号
     *
     * @return $this->msg['status'] 状态码
     * @return $this->msg['info'] 提示信息
     * @return $this->msg['url'] 跳转链接
     * @return $this->msg['labelList'] 事件列表
     */
    public function acceptLabelList()
    {
        // 验证用户是否已登录
        if( !$this->isLogin() ) {
            $this->echoJsonMsg(400, USER_IS_NOT_LOGIN, '/account/login');
        }

        // 获取事件信息
        $this->msg['labelList'] = $this->getLabelList();
        // 判断事件列表是否为空
        if( empty($this->msg['labelList']) ) {
            $this->echoJsonMsg(400, EVENT_LIST_IS_NULL, '#');
        } else {
            // 成功获取事件列表
            $this->echoJsonMsg(200, GET_EVENT_LIST_SUCCESS, '#');
        }
    }


    /**
     * 添加标签
     * @return [type] [description]
     */
    public function deleteLabel()
    {
        // 验证用户是否已登录
        if( !$this->isLogin() ) {
            $this->echoJsonMsg(400, USER_IS_NOT_LOGIN, '/account/login');
        }

        // 接收数据
        if( !empty($_POST['tagId']) ) {
            $this->tagId = $_POST['tagId'];
        } else {
            $this->echoJsonMsg(400, "标签编号为空", '#');
        }

        // 设置事项
        if( $this->deleteTag() ) {
            $this->echoJsonMsg(200, "删除标签成功", '#');
        } else {
            $this->echoJsonMsg(400, "删除标签失败", '#');
        }
    }


    /**
     * 设置标签数据库表
     */
    private function deleteTag() {
        $count = (new Tag())->delete($this->tagId);

        // 写入标签
        if( $count == 0) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 组装事件
     *
     * @param $this->getUserId() 当前用户编号
     * @param $this->startDate 开始日期
     * @param $this->endData 结束日期
     *
     * @return $labelList 事件列表，包括：
     * @return $labelList['tag_name'] 标签名
     * @return $labelList['time_length'] 标签总计时长
     * @return $labelList['date_length'] 时间跨度
     * @return $labelList['time_length_per_day'] 每天标签时长
     */
    private function getLabelList() {
        // 重新组装事件
        // tag_id 和 时长（取决于记录数量）
        $labelList = (new Tag())->selectAll();
        return  $labelList;
    }


    /**
     * 设置标签数据库表
     */
    private function setTag() {
        // 组装标签
        $data=[
            'tag_name' => $this->tagName,
            'tag_color' => $this->tagColor,
            'owner_id' => $this->getUserId()  //获取用户ID，user继承自Account
        ];

        // 写入标签
        $count = (new Tag())->insert($data); //写入数据库条数

        if( $count == 0) {
            // 插入失败
            return false;
        } else {
            return true;
        }
    }



}
