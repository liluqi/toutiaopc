<template>
  <div class="login">
      <!-- 表单 -->
    <el-card class="login-card">
        <!-- 表单logo -->
        <div class="title">
            <img src="./../../assets/img/logo_admin.png" alt="">
        </div>
        <!-- 输入框 -->
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
            <el-form-item  prop="mobile">
                <i class="el-icon-phone-outline"></i>
                <el-input style="width: 95%;float: right" v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <i class="el-icon-chat-line-square"></i>
                <el-input v-model="loginForm.code" style="width: 65%;" placeholder="验证码"></el-input>
                <el-button style="float: right">发送验证码</el-button>
            </el-form-item>
            <el-form-item prop="checked">
                <el-checkbox v-model="loginForm.checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button class="btn" @click="login" style="width: 100%" type="primary">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      // 表单元素
      loginForm: {
        mobile: '',
        code: '',
        checked: ''
      },
      // 表单自动验证规则
      loginRules: {
        mobile: [
          { required: true, message: '您的手机号不能为空' },
          { pattern: /^1[3-9]\d{9}$/, message: '您的手机号格式不正确' }
        ],
        code: [
          { required: true, message: '您的验证码不能为空' },
          { pattern: /^\d{6}$/, message: '您的验证码格式不正确' }
        ],
        checked: [
          {
            validator: function (rules, value, callback) {
              // rules是验证规则
              // value是checked当前值
              value ? callback() : callback(new Error('您必须同意该用户协议'))
            }
          }
        ]
      }
    }
  },
  // 表单手动校验
  methods: {
    login () {
    //   this.$refs.loginForm.validate(function (isOK) {
    //     if (isOK) {
    //       console.log('验证成功')
    //     } else {
    //       console.log('验证失败!')
    //     }
    //   })
      this.$refs.loginForm.validate().then(() => {
        console.log('验证成功')
        // 验证成功,发送请求
        this.$axios({
          url: '/authorizations',
          data: this.loginForm,
          method: 'post'
        }).then(res => {
        //   console.log(res)
          window.localStorage.setItem('user-login', res.data.token)
          this.$router.push('/home')
        }).catch(() => {
          this.$message({
            message: '手机号或者验证码错误',
            type: 'warning'
          })
        })
      }).catch(() => {
        console.log('验证失败!')
      })
    }
  }
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
         background-color: rgba(0,0,0,0);
         width: 467px;
         height:358px;
         border: none;
         .title {
             text-align: center;
             margin-bottom: 40px;
             img {
                 height: 45px;
             }
          }
          i{
            color: #ccc;
            font-size: 16px;
          }
          .el-input {
            border-bottom: 1px solid #fff;
            height: 40px;
            /deep/.el-input__inner {
              background-color: rgba(0,0,0,0);
              border: none;
              font-size: 16px;
              color: #ccc;
            }
          }
          .el-button {
            background: rgba(0,0,0,0);
            border: 1px solid #ccc;
            color: #606266;
          }
          .btn {
            background-color: #fff;
            border-radius: 20px;
          }

     }
 }
</style>
