<!--test.vue-->
<template>
  <div class="qk-image">
    <img :src=" imageSrc | handleImg" alt="">
  </div>
</template>

<script>
	export default {
		name: 'QkImage', // 这个名字很重要，它就是未来的标签名<qk-text></qk-text>
		props: {
			imageSrc: {
				type: String,
        default: 'http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg'
      }
		},
    filters:{
      handleImg(val){
       return (val.includes("http") || window.location.href.includes(4000)) ? val : '/h5-template' +val
      }
    }
	}
</script>

<style lang="scss" scoped>
  .qk-image{
    width: 100%;
    height: 100%;
  }
  img{
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
