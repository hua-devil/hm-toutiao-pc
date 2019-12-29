<template>
  <div class="container-login">
    <el-card class="my-card">
      <img src="../../assets/logo_index.png" alt="">
      <!-- 表单 -->
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:230px;margin-right:10px"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已经阅读和同意用户协议条款和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 测试ref得代码 -->
    <!-- <div ref="dom">我是DOM</div>
    <el-button ref="com"></el-button> -->
  </div>
</template>

<script>
import store from '@/store'
export default {
  // mounted () {
  //  生命周期钩子函数（当组件渲染完毕后执行）
  //  console.log(this.$refs)
  //  // 获取ref=dom
  //  console.log(this.$refs.loginForm)
  //  console.log(this.$refs['com'])
  // },
  data () {
    const checkMobile = (rule, value, callback) => {
      // 校验逻辑：1开头  第二位 3-9 之间  最后 9个数学结尾
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号格式不对'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // 自定义校验规则
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录
    login () {
      // 先整体验证表单
      this.$refs.loginForm.validate(async (valid) => {
        console.log(valid)
        // valid 判断是否校验成功
        if (valid) {
          // 进行登录
          // this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
          // .then(res => {
          //   // 登录成功
          //   // res是响应对象  res.data是响应主体 是响应数据
          //   // res.data.data 就是用户信息
          //   // 存储用户信息
          //   store.setUser(res.data.data)
          //   // 直接跳转首页
          //   this.$router.push('/')
          // }).catch(e => {
          // // 登录失败
          // // e 错误对象
          // // 错误提示
          //   this.$message.error('手机号或验证码错误')
          // })
          try {
            const res = await this.$http.post('authorizations', this.loginForm)
            store.setUser(res.data.data)
            console.log(res.data.data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container-login{
  width: 100%;
  height: 100%;
  // 让百分百尺寸基于window计算
  position: absolute;
  left: 0;
  top: 0;
  // background-color: pink;
  background: url(../../assets/login_bg.jpg) no-repeat center / cover;
  .my-card{
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-60%);
    img{
      display: block;
      width: 200px;
      margin: 0 auto 20px;
    }
  }
}

</style>
