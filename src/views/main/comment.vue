<template>
  <el-card>
      <!-- 面包屑组件 -->
      <bread-crumb slot='header'>
      <!-- 具名插槽 -->
         <template slot="title">
             评论列表
         </template>
      </bread-crumb>
      <!-- 表格组件 -->
      <el-table :data="list">
         <!-- 使用el-table-column作为列 -->
         <!-- prop 表示显示的字段 label表示表头 -->
         <el-table-column prop="title" width="600"  label="标题"></el-table-column>
         <el-table-column prop="comment_status" label="评论状态"></el-table-column>
         <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
         <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
         <el-table-column  label="操作">
           <el-button size="small" type='text'>修改</el-button>
           <el-button size="small" type='text'>关闭评论</el-button>
         </el-table-column>
      </el-table>
   </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    //   获取评论数据
    getComment () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(res => {
        console.log(res)
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
