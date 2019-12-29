<template>
  <el-select :value="value"
          @change="changeChannel"
          clearable
          placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  // value 只能用不能改,所以上面改为 :value
  props: ['value'],
  data () {
    return {
      channelId: null,
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    // 获取频道的选项数据
    async getChannelOptions () {
      // 原始数据 res = {data: {message:'',data: {channels:[]}}}
      // 按照 结构 去解构赋值。
      // await this.$http.get('channels')  返回值  res
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
      // console.log(this.channelOptions)
    },
    changeChannel (channelId) {
      // if (this.channelId === '') this.channelId = null
      if (channelId === '') channelId = null
      // 把选择的频道传递给父组件  父组件去修改数据
      this.$emit('input', channelId)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
