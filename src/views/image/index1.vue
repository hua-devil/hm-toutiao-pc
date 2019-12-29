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
        <el-button style="float:right" type="success" size="small">添加素材</el-button>
      </div>
      <!-- 图片列表 -->
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="option" v-if="!filterParams.collect">
            <span class="el-icon-star-off" :class="{red:item.is_collected}"></span>
            <span class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页区域 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="filterParams.page"
        :page-size="filterParams.per_page"
        @current-change="changePager"
        :hide-on-single-page="true"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 筛选参数
      filterParams: {
        // false 全部 true 收藏
        collect: false,
        page: 1,
        per_page: 10
      },
      // 图片列表数据
      images: [],
      // 一共多少条
      total: 0
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 出来切换 全部与收藏
    changeCollect () {
      this.filterParams.page = 1
      this.getImages()
    },
    // 处理页码改变
    changePager (newPage) {
      this.filterParams.page = newPage
      this.getImages()
    },
    // 获取图片列表
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.filterParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.btn_box {
  margin-bottom: 20px;
}
.img_list {
  .img_item {
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin: 0 30px 20px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .option {
      height: 30px;
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      line-height: 30px;
      span {
        color: #fff;
        margin: 0 20px;
      }
      .red {
        color: red;
      }
    }
  }
}
</style>
