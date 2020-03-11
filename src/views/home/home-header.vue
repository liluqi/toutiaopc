<template>
  <el-row align="middle" justify="start" type="flex" class='home-header'>
      <!-- 左边栏 -->
    <el-col :span="12" class='left'>
        <i class="el-icon-s-fold"></i>
        <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <!-- 右边栏 -->
    <el-col :span="12" class="right">
        <el-row align="middle" justify="end" type="flex">
            <!-- 头像 -->
            <img :src="userInfo.photo" alt="">
            <!-- 下拉菜单 -->
            <el-dropdown trigger="click" @command="clickMenu">
                <span class="el-dropdown-link">
                    {{userInfo.mobile}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="info">个人信息</el-dropdown-item>
                    <el-dropdown-item command="git">git地址</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  //   组件实例化完成之后,发送请求,获取用户信息
  created () {
    // const token = window.localStorage.getItem('user-login')
    this.$axios({
      url: '/user/profile'
      // headers: { Authorization: `Bearer ${token}` }
      //   method: 'get'
    }).then(res => {
      console.log(res)
      this.userInfo = res.data
    })
  },
  methods: {
    clickMenu (command) {
      if (command === 'info') {
        alert('您访问的页面暂时不存在')
      } else if (command === 'git') {
        window.location.href = 'http://github.com/liluqi/'
      } else {
        // 清除token缓存
        window.localStorage.removeItem('user-login')
        // 跳转到登录页面
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-header {
      padding: 0;
      margin: 0;
      background-color: rgba(0,0,0, .2);
      height: 60px;
      .left {
          i {
              margin-right: 10px;
              font-size:20px;
          }
      }
      .right {
        margin-right: 20px;
          img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 10px;
          }
      }
}
</style>
