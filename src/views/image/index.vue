<template>
  <div class="container-image">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮区域 -->
      <div class="btn_box">
        <el-radio-group @change="changeCollect" v-model="filterParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="openDialog" style="float:right" type="success" size="small">添加素材</el-button>
      </div>
      <!-- 图片列表 -->
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt="">
          <div class="option" v-if="!filterParams.collect">
            <span @click="toggleStatus(item)" class="el-icon-star-off" :class="{red:item.is_collected}"></span>
            <span @click="delImage(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
      style="margin-top:20px;text-align:right"
        background
        layout="prev, pager, next"
        @current-change="changePager"
        :total="total"
        :current-page="filterParams.page"
        :page-size="filterParams.per_page"
        :hide-on-single-page="true"
      ></el-pagination>
    </el-card>
    <!-- 对话框  -->
    <el-dialog
      title="上传素材"
      :visible.sync="dialogVisible"
      width="300px">
      <!-- <span>上传组件</span> -->
      <!-- 上传组件 action="完整上传地址" 上传地址  组件自己来发送上传请求 -->
      <!-- 不使用axios 需要在地址种携带tokenvv在headers 属性追加token -->
      <!-- on-success上传成功的回调函数 -->
      <!-- i是加号上传按钮 img是图片预览图  -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="uploadSuccess"
        :headers="headers"
        name="image">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>

  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      // 筛选参数
      filterParams: {
        // false 全部  true  收藏
        collect: false,
        page: 1,
        per_page: 10
      },
      // 图片列表数据
      images: [],
      // 一共多少条
      total: 0,
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 预览图
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 上传成功回调函数
    uploadSuccess (res) {
      // console.log(res)     //输出 {data:{url:'图片地址'}}
      this.imageUrl = res.data.url
      // 成功提示
      this.$message.success('上传成功')
      // 2s关闭对话框 更新列表
      window.setTimeout(() => {
        // 关闭对话框
        this.dialogVisible = false
        // 更新列表
        this.getImages()
        this.imageUrl = null
      }, 2000)
    },
    openDialog () {
      this.dialogVisible = true
    },
    // 删除图片
    async delImage (id) {
      try {
        await this.$http.delete(`user/images/${id}`)
        this.$message.success('删除图片成功')
        this.getImages()
      } catch (e) {
        this.$message.error('删除图片失败')
      }
    },
    // 添加收藏 取消收藏
    async toggleStatus (item) {
      try {
        const { data: { data } } = await this.$http.put(`user/images/${item.id}`, {
          collect: !item.is_collected
        })
        this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
        // 修改星星样式

        item.is_collected = data.collect
      } catch (e) {
        this.$message.error('操作失败')
      }
    },
    // 出来切换 全部与收藏
    changeCollect () {
      this.filterParams.page = 1
      this.getImages()
    },
    // 处理页码
    changePager (newPage) {
      this.filterParams.page = newPage
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.filterParams })
      this.images = data.results
      this.total = data.total_count
      console.log(this.images)
    }
  }
}
</script>

<style lang="less" scoped>
.btn_box{
  margin-bottom: 20px;
}
.img_list{
  .img_item{
    width: 180px;
    height: 180px;
    border: 1px solid #ddd;
    position: relative;
    display: inline-block;
    margin: 0 15px 20px;
    img{
      width: 100%;
      height: 100%;
      display: block;
    }
    .option{
      height: 30px;
      width: 100%;
      background: rgba(0,0,0,0.3);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      line-height: 30px;
      span{
        color: #fff;
        margin: 0 20px;
      }
      .red{
        color: red;
      }
    }
  }
}
</style>
