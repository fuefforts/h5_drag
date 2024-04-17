<template>
  <el-form-item label="文本内容：">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editors"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-if="show"
      style="height: 500px; overflow-y: hidden"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
    />
  </el-form-item>
</template>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<script>
import Vue from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
// import { DomEditor } from "@wangeditor/editor"
export default {
  name: "attr-qk-editor",
  props: {
    editor: String,
  },
  components: { Editor, Toolbar },
  data() {
    return {
      editors: null,
      html: "<p>hello</p>",
      toolbarConfig: {
        excludeKeys: ["group-image", "group-video"],
      },
      editorConfig: { placeholder: "请输入内容..." },
      tempText: "",
      show: true,
      mode: "default", // or 'simple'
    };
  },
  methods: {
    onCreated(editor) {
      this.editors = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    extendsMenu() {
      // const toolbar = DomEditor.getToolbar(this.editors)
      // console.log(toolbar.getConfig().toolbarKeys)
      this.editors.on("modalOrPanelShow", (modalOrPanel) => {
        if (modalOrPanel.type !== "modal") return;
        let a = document.getElementsByClassName("w-e-modal");
        a[0].style.right = "0px";
        let { $elem } = modalOrPanel; // modal element
        // 在 Vue 实例创建时，将 Element UI Upload 组件附加到页面
        const uploadContainer = document.createElement("div"); // 创建一个 div 元素用于容纳上传组件
        $elem.append(uploadContainer); // 将 div 元素添加到 #app 元素中

        new Vue({
          el: uploadContainer, // 将上传组件挂载到新的 div 元素上
          data: {
            fileList: [],
            headers: {
              "Tenant-Id": "1",
            },
          },
          template: `<el-upload
                class="upload-demo"
                action="/admin-api/so/wechat/upload-file"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :headers="headers"
                :limit="1"
                 :before-upload="beforeUpload"
                :on-exceed="handleExceed"
                :on-success="onSuccess"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>`,
          // <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          methods: {
            beforeUpload(file) {
              if (file.size > 1 * 1024 * 1024) {
                this.$message.error("psd文件不能超过1M！");
                return;
              }
              let temp1 = file.name.split(".");
              let temp = temp1[temp1.length - 1];
              if (!["jpg", "png", "gif"].includes(temp)) {
                this.$message.error("请上传jpg/png/gif文件");
                return false;
              }
              this.uploadPsd(file);
              return false;
            },
            uploadPsd(file) {
              let params = new FormData();
              params.append("file", file);
              this.uploading = true;
              this.$API
                .uploadImage(params)
                .then((res) => {
                  this.uploading = false;
                  let p = document.getElementsByTagName("input");
                  let links = Array.from(p).filter(
                (f) => f.id && f.id.includes("w-e-insert-link-")
              )[1];
                  links.value =`http://123.57.142.2:4000${res.body.url}` ;
                  // this.imageList.splice(0, 0, res.body);
                })
                .catch(() => {
                  this.uploading = true;
                });
            },
            onSuccess(response, file, fileList) {
              // console.log("File uploaded successfully", file, fileList);
              // let p = document.getElementsByTagName("input");
              // let links = Array.from(p).filter(
              //   (f) => f.id && f.id.includes("w-e-insert-link-")
              // )[1];
              // let data = file.response.data;
              // links.value =res.body.url;
                // "https://callcenter1.ccccltd.cn" +
                // data.split("http://10.201.246.123:48080")[1];
              //   this.editors
            },
            handleRemove() {},
            handlePreview() {},
            handleExceed() {},
            beforeRemove() {},
          },
        });
        // 设置 modal 样式（定位、z-index）
        // 显示蒙层
      });
      this.editors.on("modalOrPanelHide", () => {
        // 隐藏蒙层
      });
    },
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = `${this.editor}`;
      this.extendsMenu();
    }, 0);
  },
  beforeDestroy() {
    const editor = this.editors;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
  watch: {
    html() {
      this.tempText = this.html;
    },
    tempText() {
      this.$emit("update:editor", this.tempText);
    },
    editor: {
      handler: function (newVal) {
        console.log(this.editors);
        this.show = false;
        this.editors.setHtml(newVal);
        this.show = true;
        // this.html = newVal;
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
</style>
