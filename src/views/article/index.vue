<template>
  <div class='container-article'>
    <!-- 筛选条件区域 -->
    <el-card class="box-card">
      <div slot="header">
        <!-- 使用自己面包屑组件 -->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 内容区域表单 -->
      <el-form lable-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="filterParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- <my-channel :value="filterParams.channel_id" @input="filterParams.channel_id=$event"></my-channel> -->
          <my-channel v-model="filterParams.channel_id"></my-channel>
          <!-- <el-select v-model="filterParams.channel_id"
          @change="changeChannel"
          clearable
          placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果区域 -->
    <el-card>
      <div slot="header">
        根据筛选条件供查询到{{total}}条结果：
      </div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!-- 图片组件 -->
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <div slot="error">
                <img src="../../assets/error.gif" style="width:150px;height:100px" >
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag  v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag  v-if="scope.row.status===1">待审核</el-tag>
            <el-tag  v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag  v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag  v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button @click="toEdit(scope.row.id)" plain type="primary" icon="el-icon-edit" circle></el-button>
            <el-button @click="delArticle(scope.row.id)" plain type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px;text-align:right"
        background
        layout="prev, pager, next"
        @current-change="changePager"
        :total="total"
        :current-page="filterParams.page"
        :page-size="filterParams.per_page"
      ></el-pagination>
    </el-card>

  </div>
</template>

<script>
export default {
  data () {
    return {
      // 筛选条件对象
      filterParams: {
        // 如果不传  值为null
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
        // 频道选项
      },
      // channelOptions: [],
      // 日期选择后得数组[其实日期，结束日期]
      dateArr: [],
      articles: [],
      total: 0
    }
  },
  created () {
    // this.getChannelOptions()
    this.getArticles()
  },
  methods: {
    // 编辑文章
    toEdit (articleId) {
      this.$router.push(`/publish?id=${articleId}`)
    },
    // 删除文章
    async delArticle (articleId) {
      // 删除请求
      try {
        await this.$http.delete(`articles/${articleId}`)
        this.$message.success('删除成功')
        this.getArticles()
      } catch (e) {
        this.$message.error('删除失败')
      }
    },
    // // 获取频道的选项数据
    // async getChannelOptions () {
    //   // 原始数据 res = {data: {message:'',data: {channels:[]}}}
    //   // 按照 结构 去解构赋值。
    //   // await this.$http.get('channels')  返回值  res
    //   const { data: { data } } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    //   // console.log(this.channelOptions)
    // },
    // 获取文章列表数据
    async getArticles () {
      // 如果是post传参  放到请求主体提交body  axios.post(url, 请求体传参)
      // 如果是get传参  放到请求的地址？后面   axios.get(url, {params: 传参对象})
      const { data: { data } } = await this.$http.get('articles', { params: this.filterParams })
      this.articles = data.results
      // 测试id是否转换成功
      // console.log(this.articles[0].id.toString())
      // 总条数
      this.total = data.total_count
    },
    // 改变分页
    changePager (newPage) {
      this.filterParams.page = newPage
      this.getArticles()
    },
    // 搜索
    search () {
      // 每次进行搜索的时候 页码应该改成1
      this.filterParams.page = 1
      this.getArticles()
    },
    // 处理日期函数
    changeDate (value) {
      // value  和  this.dateArr 的值一致的
      // if (!value) value = [null, null]
      if (value) {
        this.filterParams.begin_pubdate = value[0]
        this.filterParams.end_pubdate = value[1]
      } else {
        this.filterParams.begin_pubdate = null
        this.filterParams.end_pubdate = null
      }
    }
    // changeChannel () {
    //   if (this.filterParams.channel_id === '') this.filterParams.channel_id = null
    // }
  }
}
</script>

<style lang="less" scoped>
</style>
