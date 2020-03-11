<template>
<div class="article-list">
<el-card>
    <!-- 面包屑组件 -->
  <bread-crumb slot='header'>
     <template slot="title">
       内容列表
     </template>
  </bread-crumb>
  <el-form class="form">
      <el-form-item label="文章状态:">
          <el-radio-group v-model="form.status">
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表:">
          <el-select v-model="form.channel_id" placeholder="请选择活动区域">
            <el-option :label="item.name" :value="item.id" v-for="(item,index) in Channels" :key="index"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="时间选择:">
          <el-date-picker v-model="form.daterange" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
  </el-form>
</el-card>
<el-card class="contanier">
    <div slot='header'>共找到{{totalCount}}条符合条件的内容</div>
    <div v-for="(item,index) in list" :key="index" class="article">
        <div class="left">
            <img :src="item.cover.images.length ? item.cover.images[0]:defaultImg" alt="">
            <div class='article-info'>
                <p>{{item.title}}</p>
                <el-tag :type="item.status | filterType">{{item.status | filterStatus}}</el-tag>
                <!-- <el-button type="primary" plain></el-button> -->
                <p class="time">{{item.pubdate}}</p>
            </div>
        </div>
        <div class="right">
            <i class="el-icon-edit" @click="$router.push(`/home/publish/${item.id.toString()}`)">修改</i>
            <i class="el-icon-delete" @click="delArticle(item.id)">删除</i>
        </div>
    </div>
    <el-row type="flex" justify="center">
        <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change="currentChange">
        </el-pagination>
    </el-row>
</el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        status: 5,
        channel_id: 4,
        daterange: []
      },
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      Channels: [],
      list: [],
      totalCount: '',
      defaultImg: require('./../../assets/img/2.jpg')
    }
  },
  methods: {
    // changeForm () {
    // },
    delArticle (id) {
      this.$confirm('您确定要删除该文章数据吗?').then(() => {
        this.$axios({
          url: `/articles/${id}`,
          method: 'delete'
        }).then(() => {
          this.$message.success('删除成功!')
          this.getArticle()
        }).catch(() => {
          this.$message.error('删除失败!')
        })
      })
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        console.log(res)
        this.Channels = res.data.channels
      })
    },
    getArticle () {
      this.$axios({
        url: '/articles',
        params: {
          status: this.form.status === 5 ? null : this.form.status,
          channel_id: this.form.channel_id,
          begin_pubdate: this.form.daterange && this.form.daterange.length ? this.form.daterange[0] : null,
          end_pubdate: this.form.daterange && this.form.daterange.length > 1 ? this.form.daterange[1] : null,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        console.log(res)
        this.list = res.data.results
        this.totalCount = res.data.total_count
      })
    },
    currentChange (newPage) {
      this.page.currentPage = newPage
      this.getArticle()
    }
  },
  created () {
    this.getArticle()
    this.getChannels()
  },
  watch: {
    form: {
      deep: true,
      handler () {
        this.getArticle()
      }
    }
  },
  filters: {
    filterStatus: function (value) {
      switch (value) {
        case 0: return '草稿'
        case 2: return '已发表'
        default: break
      }
    },
    filterType: function (value) {
      switch (value) {
        case 0: return 'warning'
        case 2: return ''
        default: break
      }
    }
  }

}
</script>

<style lang="less" scoped>
.el-card {
    margin-top: 10px;
    border-radius: 10px;
    .form {
        margin-left: 50px;
    }
}
.contanier {
    .article {
        height: 130px;
        display: flex;
        align-items: center;
        .left{
            width: 85%;
            height: 100px;
            img {
                float: left;
                width: 150px;
                height: 100%;
            }
            .article-info {
                float: left;
                margin-left: 10px;
                p {
                    padding: 5px 0;
                }
            }
        }
        .right {
            width: 150px;
            height: 100px;
            i {
                margin-left: 15px;
                cursor: pointer;
            }
        }
    }
}
</style>
