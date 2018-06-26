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
        $this->msg['labelList'] = $this->selectTagList();
        // 判断事件列表是否为空
        if( empty($this->msg['labelList']) ) {
            $this->echoJsonMsg(400, TAG_LIST_IS_NULL, '#');
        } else {
            // 成功获取事件列表
            $this->echoJsonMsg(200, '获取标签列表成功', '#');
        }
    }


    /**
     * 删除标签
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
     * 添加标签
     * @return [type] [description]
     */
    public function sendLabel()
    {
        // 验证用户是否已登录
        if( !$this->isLogin() ) {
            $this->echoJsonMsg(400, USER_IS_NOT_LOGIN, '/account/login');
        }

        // 接收数据
        if( !empty($_POST['tagName']) ) {
            $this->tagName = $_POST['tagName'];
        } else {
            $this->echoJsonMsg(400, "标签名为空", '#');
        }

        //接收数据
         if( !empty($_POST['tagColor']) ) {
            $this->tagColor = $_POST['tagColor'];
        } else {
            $this->echoJsonMsg(400, "标签颜色为空", '#');
        }

        // 设置事项
        if( $this->insertTag() ) {
            $this->echoJsonMsg(200, "添加标签成功", '/label/index');
        } else {
            $this->echoJsonMsg(400, "添加标签失败", '#');
        }
    }

    /**
     * 从数据库表中获取标签并组装
     *
     * @param $this->getUserId() 当前用户编号
     */
    private function selectTagList() {
        // 获取标签源数据
        $tagList = (new Tag())->selectAll();
        return  $tagList;
    }


    /**
     * 从数据库表中删除标签
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
     * 在数据库表中添加标签
     */
    private function insertTag() {
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
