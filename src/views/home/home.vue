<template>
  <el-container>
    <!-- 左侧边栏 -->
    <el-aside width="230px" background="rgb(82, 113, 167)">
      <home-asider></home-asider>
    </el-aside>
    <!-- 右侧边栏 -->
    <el-container class="right">
      <!-- 上 -->
      <el-header>
        <home-header></home-header>
      </el-header>
      <!-- 下 -->
      <el-main style="padding: 0">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import HomeAsider from './../../components/home/home-asider'
// import HomeHeader from './home-header'
// export default {
//   components: {
//     'home-asider': HomeAsider,
//     'home-header': HomeHeader
//   }
// }
</script>

<style lang="less" scoped>
.right {
  height: 100vh;
  background-size: cover;
  background-image: url('./../../assets/img/sm.gif');
  .el-header {
    padding: 0;
    margin: 0;
  }
}
</style>
