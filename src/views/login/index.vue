<template>
  <div class="login">
      <!-- 表单 -->
    <el-card class="login-card">
        <!-- 表单logo -->
        <div class="title">
            <img src="./../../assets/img/logo_index.png" alt="">
        </div>
        <!-- 输入框 -->
        <el-form>
            <el-form-item>
                <el-input placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input style="width: 65%;" placeholder="验证码"></el-input>
                <el-button style="float: right">发送验证码</el-button>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <router-link></router-link>
                <el-button style="width: 100%" type="primary">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
 .login{
     background-image: url('./../../assets/img/login_bg.jpg');
     background-size: cover;
     height: 100vh;
     display: flex;
     justify-content: center;
     align-items: center;
     .login-card {
         width: 467px;
         height:358px;
         .title {
             text-align: center;
             margin-bottom: 30px;
             img {
                 height: 45px;
             }
         }
     }
 }
</style>
