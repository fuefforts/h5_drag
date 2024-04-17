<template>
  <el-form-item label="文本内容：">
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入文本内容"
      v-model="tempText"
    >
    </el-input>
  </el-form-item>
</template>

<script>
export default {
  name: "attr-qk-text",
  props: {
    text: String,
  },
  data() {
    return {
      tempText: "",
    };
  },
  mounted() {
    this.tempText = this.text;
    // // 监听鼠标事件
    // document.onmouseup = function () {
    //   // 获取选中的文本
    //   var selectedText = window.getSelection().toString();
    //   console.log(selectedText);
    // };
  },
  watch: {
    text() {
      this.tempText = this.text;
    },
    tempText() {
      this.$emit("update:text", this.tempText);
    },
  },
  methods: {
    handleClick(event) {
      console.log("Selected text:", event);
    },
  },
};
</script>

<style scoped>
</style>
