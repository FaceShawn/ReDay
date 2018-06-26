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
     * 添加标签页
     * @return [type] [description]
     */
    public function add()
    {
        $this->assign('title','添加标签');
        return $this->fetch('/label/add');
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
            $this->echoJsonMsg(400, "标签名为空", '/label/add');
        }

        //接收数据
         if( !empty($_POST['tagColor']) ) {
            $this->tagColor = $_POST['tagColor'];
        } else {
            $this->echoJsonMsg(400, "标签颜色为空", '/label/add');
        }

        // 设置事项
        if( $this->setTag() ) {
            $this->echoJsonMsg(200, "添加标签成功", '#');
        } else {
            $this->echoJsonMsg(400, "添加标签失败", '#');
        }
    }

    /**
     * 设置标签数据库表
     */
    public function setTag() {
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
