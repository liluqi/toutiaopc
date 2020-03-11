<template>
  <el-card>
      <bread-crumb slot='header'>
     <template slot="title">
       发布文章
     </template>
  </bread-crumb>
  <el-form :rules="rules" ref="form" :model="form" style="margin-left: 50px;">
      <!-- title -->
      <el-form-item label="标题" prop="title">
        <el-input placeholder="文章名称" style="width: 30%" v-model="form.title"></el-input>
      </el-form-item>
      <!-- 富文本编辑器 -->
      <el-form-item label="内容" prop="content">
        <quill-editor v-model="form.content" style="margin-left: 50px; width: 90%;height: 400px;margin-bottom: 100px;"></quill-editor>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="form.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select placeholder="请选择" v-model="form.channel_id" >
        <el-option :label="item.name" :value="item.id" v-for="(item,index) in Channels" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addArticle(false)">发表</el-button>
        <el-button type="warning" plain @click="addArticle(true)">存入草稿</el-button>
        <el-button>重置</el-button>
      </el-form-item>
  </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      form: {
        content: '',
        title: '',
        channel_id: null,
        cover: {
          type: 0,
          images: []
        }
      },
      rules: {
        title: [{ required: true, message: '文章标题不能为空', trigger: 'blur' },
          { min: 5, max: 30, message: '必须在5-50个字符之间', trigger: 'blur' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道内容不能为空' }]
      },
      Channels: []
    }
  },
  methods: {
    // 获取文章频道信息
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.Channels = res.data.channels
      })
    },
    // 发布文章
    addArticle (draft) {
      // 手动校验
      this.$refs.form.validate().then(() => {
        console.log('验证成功')
        const { articleid } = this.$route.params // 获取动态路由参数
        this.$axios({
          url: articleid ? `/articles/${articleid}` : '/articles',
          params: { draft },
          data: this.form,
          method: articleid ? 'put' : 'post'
        }).then(res => {
          this.$message.success('发布成功!')
          this.$router.push('/home/articles')
        }).catch(() => {
          this.$message.error('发布失败!')
        })
      }).catch(() => {
        console.log('验证失败')
      })
    },
    // 获取文章
    getArticleById (id) {
      // var id = this.$router.params ? { target } : {}
      this.$axios({
        url: `/articles/${id}`
      }).then(res => {
        this.form = res.data
      })
    }
  },
  created () {
    this.getChannels()
    const { articleid } = this.$route.params // 获取动态路由参数
    if (articleid) this.getArticleById(articleid)
  },
  watch: {
    // 两个页面公用一个组件,通过检测路由的变化,判断页面状态.页面加载完成之后,$route会存在data里面
    $route: function (to, from) {
      if (to.params.articleid) {
        // 是修改
      } else {
        // 是新增
        this.form = {
          content: '',
          title: '',
          channel_id: null,
          cover: {
            type: 0,
            images: []
          }
        }
      }
    }
  }

}
</script>

<style>

</style>
