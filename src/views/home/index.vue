<template>
  <el-container class="container-home">
    <el-aside :width="isOpen?'200px':'60px'">
      <!-- logo区域 -->
      <div class="logo" :class="{minLogo: !isOpen}"></div>
      <!-- 导航组件 -->
      <el-menu
      default-active="$route.path"
      background-color="#002233"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="!isOpen"
      :collapse-transition="false"
      router>
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span @click="toggleAside()" class="el-icon-s-fold icon"></span>
        <span class="text"> 江苏xxxxxxxxxxx</span>
        <!-- 下拉菜单 -->
        <el-dropdown class="my-dropdown" @command="handler">
          <span class="el-dropdown-link">
            <img class="user-icon" :src="photo" alt="">
            <span class="user-name">{{name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 二级路由得显示位置 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      // 默认展开
      isOpen: true,
      name: '',
      photo: ''
    }
  },
  created () {
    // 从本地获取用户信息
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    toggleAside () {
      this.isOpen = !this.isOpen
    },
    setting () {
      this.$router.push('/setting')
    },
    // 退出登录
    logout () {
      store.delUser()
      this.$router.push('/login')
    },
    handler (command) {
      // command 值  setting|logout
      // 如果是 setting  跳转去个人设置  如果是logout  清楚用户信息跳转去登录
      // if (command === 'setting')
      // if (command === 'logout')
      // 如果指令是setting调用的是this.setting() this['setting']()
      // 如果指令是logout调用的是this.logout() this['logout']()
      this[command]()
    }
  }
}
</script>

<style lang="less" scoped>
.container-home{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  // element-ui提供得组件 解析后在容器上追加一个和组件同名得CSS类
  .el-aside{
    background: #002033;
    .logo{
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/logo_admin.png) no-repeat center / 140px auto
    }
    // 将来覆盖logo样式
    .minLogo{
      background-image:url(../../assets/logo_admin_01.png);
      background-size: 36px auto;
    }
    .el-menu{
      border-right:  none;
    }
  }
  .el-header{
    border-bottom: 1px solid #ccc;
    line-height: 60px;
    .icon{
      font-size: 24px;
      vertical-align: middle;
    }
    .text{
      font-size: 16px;
      vertical-align: middle;
    }
    .my-dropdown{
      float: right;
      .user-icon{
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .user-name{
        color:#333;
        font-weight: bold;
        vertical-align: middle;
        padding-left: 5px;
      }
    }
  }
}
</style>
