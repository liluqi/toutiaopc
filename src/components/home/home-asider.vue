<template>
<div class="home-asider">

    <!-- 头部图片 -->
    <div class="title">
          <img src="./../../assets/img/logo_admin.png" alt="">
    </div>

    <el-menu router background-color="rgb(82, 113, 167)" text-color="#adafb5">
        <!-- 普通导航-首页 -->
        <el-menu-item index="/home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
        </el-menu-item>

        <!-- 伸缩导航-内容管理 -->
        <el-submenu index="2">
          <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/articles">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
        </el-submenu>

        <!-- 伸缩导航-粉丝管理 -->
        <el-submenu index="3">
          <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index='/home/picture'>图文数据</el-menu-item>
        <el-menu-item index='/home/fansinfo'>粉丝概况</el-menu-item>
        <el-menu-item index='/home/fansphoto'>粉丝画像</el-menu-item>
        <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>
        </el-submenu>

        <!-- 普通导航-账户信息 -->
        <el-menu-item index="/home/account">
            <i class="el-icon-user-solid"></i>
            <span slot="title">账户信息</span>
        </el-menu-item>
    </el-menu>
</div>

</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.home-asider {
    background-color: rgb(82, 113, 167);
    width: 230px;
    height: 100vh;
    .title {
        background-color: rgb(82, 113, 167);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
    }
    .el-menu {
        border-right: none;
        .el-submenu {
            .el-menu-item{
                color: #adafb5;
            }
        }
    }
}

</style>
