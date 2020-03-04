<template>
  <el-container>
    <!-- 左侧边栏 -->
    <el-aside width="230px">
      <home-asider></home-asider>
    </el-aside>
    <!-- 右侧边栏 -->
    <el-container>
      <!-- 上 -->
      <el-header>
        <home-header></home-header>
      </el-header>
      <!-- 下 -->
      <el-main>
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

<style>

</style>
