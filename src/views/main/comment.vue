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
      <el-table :data="list" v-loading="loading">
         <!-- 使用el-table-column作为列 -->
         <!-- prop 表示显示的字段 label表示表头 -->
         <el-table-column prop="title" width="600"  label="标题"></el-table-column>
         <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
         <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
         <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
         <el-table-column  label="操作">
           <template slot-scope="obj">
             <el-button size="small" type='text'>修改</el-button>
             <el-button @click="openOrClose(obj.row)" size="small" type='text'>{{obj.row.comment_status?"关闭":"打开"}}评论</el-button>
           </template>

         </el-table-column>
      </el-table>
      <el-row justify="center" type="flex">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          @current-change="changePage">
        </el-pagination>
      </el-row>

   </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        // 分页三要素
        total: 0, // 总数量,默认为0
        currentPage: 1, // 当前页码
        pageSize: 10 // 每页个数
      },
      loading: false
    }
  },
  methods: {
    //   获取评论数据
    getComment () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: {
          page: this.page.currentPage,
          per_page: this.page.pageSize,
          response_type: 'comment'
        }
      }).then(res => {
        console.log(res)
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.loading = false
      })
    },
    // 定义一个格式化函数
    // el-table不显示布尔值
    formatterBool (row, column, cellValue, index) {
      return cellValue ? '打开' : '关闭'
    },
    // 页码发生改变时触发
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    openOrClose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${mess}评论吗?`).then(() => {
        // 点击确定按钮
        // 发送axios请求
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: {
            article_id: row.id.toString()// 这里的row.id是大数据类型,传给后台数据的必须是是字符串
          },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(() => { // 当请求成功时,弹出成功打开/关闭评论提示框
          this.$message.success(`${mess}评论成功!`)
          this.getComment()
        }).catch(() => {
          this.$message.error(`${mess}评论失败!`)
        })
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
