<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import userModel from "@/libs/userModel";
export default {
  created() {
    if( this.getUrlParams("userName") && this.getUrlParams("pwd")){
    
    // 登录操作
    userModel
      .doLogin(
        {
          username: this.getUrlParams("userName"),
          password: this.getUrlParams("pwd"),
        },
        this.getUrlParams("userName") && this.getUrlParams("pwd")
      )
      .then(() => {
        if (this.fromUrl) {
          this.$router.push(this.fromUrl);
        } else {
          userModel.goBeforeLoginUrl();
        }
      })
      .catch(() => {
        userModel.doRegister({
          username: this.getUrlParams("userName"),
          password: this.getUrlParams("pwd"),
          email: "puhui" + Math.random(),
        }).then(()=>{
          if(this.fromUrl){
						this.$router.push(this.fromUrl)
					}else{
						userModel.goBeforeLoginUrl()
					}
        })
      });
    
    }
  },
  methods: {
    //获取地址栏参数，key:参数名称
    getUrlParams(key) {
      try {
        let params = window.location.href.split("?")[1].split("&");
        if (params) {
          return params.filter((d) => d.split("=")[0] === key)[0].split("=")[1];
        } else {
          return null;
        }
      } catch (error) {
        console.warn(error);
        return null;
      }
    },
  },
};
</script>
<style lang="scss">
html,
body {
  position: relative;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
  height: 100%;
  overflow: hidden;
}
</style>
