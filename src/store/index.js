// 提供操作本地用户信息得 工具函数
// 设置用户信息
// 获取用户信息
// 删除用户信息
// 示例代码：sessionStorage.setItem('数据名称','具体数据')
const KEY = 'ht-toutiao-pc-user'
export default {
  // user是调用函数传入的用户信息对象
  setUser (user) {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
