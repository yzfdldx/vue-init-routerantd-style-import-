<template>
  <div class="hello">
    <Button type="primary">3223</Button>
    <Icon type="step-backward" />
    <div class="app_input">
      <TextArea class="app_input_ear" contenteditable="true">32</TextArea>
      <div class="app_input_button">
      
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Icon, Input } from 'ant-design-vue';
export default {
  name: 'HelloWorld',
  components: {
    Button,
    Icon,
    TextArea: Input.TextArea
  },
  data () {
    return {
      msg: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue + UEditor + v-model双向绑定</h2>',
    }
  },
}
</script>
<style lang="less">
  //["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": true }]
  // @import '~ant-design-vue/dist/antd.less'; 
  @import "./index.less";
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
