<?php
namespace app\controllers;

use fastphp\base\Controller;
use app\controllers\Account;
use app\models\User;

class Admin extends Account
{
    protected $msg = Array();
    /**
     * 用户管理页
     * @return [type] [description]
     */
    public function index()
    {
        // 验证用户是否为管理员
        if( !$this->isAdmin() ) {
            return $this->success("您没有管理权限", '/account/login');
        }

        $this->assign('title','用户管理');
        return $this->fetch('/admin/index');
    }

    public function acceptUserList()
    {
        // 验证用户是否已登录
        if( !$this->isLogin() ) {
            $this->echoJsonMsg(400, USER_IS_NOT_LOGIN, '/account/login');
        }

        // 获取用户列表
        $this->msg['userList'] = $this->getUserList();
        // 判断用户列表是否为空
        if( empty($this->msg['userList']) ) {
            $this->echoJsonMsg(200, "用户列表为空", '#');
        } else {
            // 成功获取用户列表
            $this->echoJsonMsg(200, "获取用户列表成功", '#');
        }

    }

    private function getUserList()
    {
        // 读取用户信息
        $result= Array();
        $userList = (new User())->where()->order(['id DESC'])->selectAll();
        // return $userList;
        // 遍历用户
        for ($i=0; $i < count($userList); $i++) {
            // 取出 user_id
            $userId = $userList[$i]['id'];
            $userName = $userList[$i]['user_name'];
            $Email = $userList[$i]['email'];
            $user = array(
                'email' => $Email,
                'user_name' => $userName,
                'id' => $userId,
            );
                array_push($result,$user);
            // }
        }
        return $result;
    }

    /**
     * 删除用户
     * @return [type] [description]
     */
    public function deleteAdmin()
    {
        // 验证用户是否已登录
        if( !$this->isLogin() ) {
            $this->echoJsonMsg(400, USER_IS_NOT_LOGIN, '/account/login');
        }

        // 接收数据
        if( !empty($_POST['userId']) ) {
            $this->userId = $_POST['userId'];
        } else {
            $this->echoJsonMsg(400, "用户id为空", '#');
        }

        // 设置事项
        if( $this->deleteUser() ) {
            $this->echoJsonMsg(200, "删除用户成功", '#');
        } else {
            $this->echoJsonMsg(400, "删除用户失败", '#');
        }
    }
    /**
     * 从数据库表中删除用户
     */
    private function deleteUser() {
        $count = (new User())->delete($this->userId);

        // 删除用户的条数
        if( $count == 0) {
            return false;
        } else {
            return true;
        }
    }

}
