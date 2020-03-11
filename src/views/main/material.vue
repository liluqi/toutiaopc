<template>
  <el-card>
      <!-- 面包屑组件 -->
      <bread-crumb slot='header'>
      <!-- 具名插槽 -->
         <template slot="title">
             素材管理
         </template>
      </bread-crumb>
      <el-row type="flex" justify="end">
        <el-upload action="" :http-request="uploadImg" :show-file-list="false">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-row>
      <el-tabs type="card" v-model="activeName" @tab-click="changeTag">
        <el-tab-pane label="全部素材" name="all">
            <div class="img_list">
                <el-card class="img_card" v-for="(item,index) in list" :key="index">
                    <img :src="item.url" class="image" @click="openDilog(index)">
                    <el-row class="operate" type="flex" justify="space-around" align="middle">
                        <i @click="collectOrCanel(item)" :style="{color: item.is_collected?'red':'black'}" class="el-icon-star-on"></i>
                        <i @click="deleteImg(item)" class="el-icon-delete-solid"></i>
                    </el-row>
                </el-card>
            </div>
        </el-tab-pane>
        <el-tab-pane label="我的收藏" name="collect">
            <div class="img_list">
                <el-card class="img_card" v-for="item in list" :key="item.id">
                    <img :src="item.url" class="image">
                </el-card>
            </div>
        </el-tab-pane>
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
      </el-tabs>

      <!-- 走马灯--幻灯片播放 -->
      <el-dialog :visible="dialogVisible" @close="dialogVisible = false" @opened="openEnd" width="500px">
        <el-carousel height="400px" ref="carousel">
          <el-carousel-item v-for="item in list" :key="item.id">
            <img :src="item.url" alt="" width="100%" height="100%">
          </el-carousel-item>
        </el-carousel>
      </el-dialog>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      clickImgIndex: -1,
      activeName: 'all',
      list: [],
      page: {
        // 分页三要素
        total: 0, // 总数量,默认为0
        currentPage: 1, // 当前页码
        pageSize: 4 // 每页个数
      }
    }
  },
  methods: {
    // 获取后台图片数据
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then((res) => {
        console.log(res)
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    // 切换tag标签
    changeTag () {
      this.page.currentPage = 1
      this.getMaterial()
    },
    // 切换页面
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 上传图片函数
    uploadImg (params) {
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: 'user/images',
        method: 'post',
        data
      }).then(() => {
        this.$message.success('上传图片成功!')
        this.getMaterial()
      }).catch(() => {
        this.$message.error('上传图片失败!')
      })
    },
    // 收藏与取消收藏
    collectOrCanel (item) {
      this.$axios({
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        },
        method: 'put'
      }).then(() => {
        this.$message.success('收藏成功!')
        this.getMaterial()
      }).catch(() => {
        this.$message.error('收藏失败!')
      })
    },
    // 删除图片素材
    deleteImg (item) {
      this.$axios({
        url: `/user/images/${item.id}`,
        method: 'delete'
      }).then(() => {
        this.$confirm('确定要删除该图片吗?').then(() => {
          this.$message.success('删除成功!')
          this.getMaterial()
        })
      }).catch(() => {
        this.$message.error('删除失败!')
      })
    },
    // 打开弹出框
    openDilog (index) {
      // 把被点击图片的index赋值给走马灯的setActiveItem方法
      this.clickImgIndex = index
      this.dialogVisible = true// 设置弹出框的显示状态为true
    },
    // dialog懒加载,在没有弹出对话框之前,ref不存在
    openEnd () {
      // 在所有动画加载完之后,获取走马灯组件,这时可以获取到
      this.$refs.carousel.setActiveItem(this.clickImgIndex)
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.img_list {
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      position: relative;
      .upload-demo {
        position: absolute;
        right:50px;
      }
      .img_card {
          width: 220px;
          height: 240px;
          margin: 20px 40px;
          position: relative;
          img {
              width: 100%;
              height: 100%;
          }
          .operate {
              position: absolute;
              left:0;
              bottom:0;
              width: 100%;
              background: #f4f5f6;
              height: 30px;
              i  {
                  font-size:20px;
              }
          }
      }
  }
</style>
