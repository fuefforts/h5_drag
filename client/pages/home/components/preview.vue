<template>
  <previewWrapper :pageId="pageId" @closePreview="closePreview" v-loading="loading">
    <p class="page-title paddingL30">页面预览</p>
    <div class="preview-info-wrapper" v-if="!loading">
      <el-form label-width="90px" label-position="left">
        <el-form-item label="页面二维码:">
          <QrcodeVue  :value="pageLink" :size="120" level="H"></QrcodeVue>
          <p v-if="!pageData.isPublish" class="gray fontsize-12 lineheight-18">注意：为防范钓鱼安全风险，预览内容仅供作者调试使用，有效期 50 分钟，如需供他人预览，请使用发布功能。</p>
        </el-form-item>
        <el-form-item label="页面链接:">
          <div><el-button type="primary" @click="doCopy">复制链接</el-button></div>
          <div class="share-wx-config-wrapper">{{$config.baseURL + '/quark/view/' + pageId}}</div>
        </el-form-item>
        <!--页面效果-->
        <el-form-item label="页面状态:">
          <span :class="[pageData.isPublish ? 'primary' : 'orange']">{{pageData.isPublish ? '已发布' : '未发布'}}</span>
        </el-form-item>
      </el-form>

      <div class="page-info">
        <div class="page-cover">
          <img :src="shareData.coverImage || defaultCoverImage" alt="">
        </div>
        <div class="page-title-des paddingT10">
          <div class="info-form-wrapper">
            {{shareData.title}}
          </div>
          <div class="info-form-wrapper ellipsis">
            {{shareData.description}}
          </div>
        </div>
      </div>
      <div class="clearfix paddingT30 text-center">
        <a :href="pageLink" target="_blank">
          <el-button type="primary">新标签打开链接</el-button>
        </a>
      </div>
    </div>
  </previewWrapper>
</template>

<script>
	import previewWrapper from '@client/components/preview-wrapper'
	import QrcodeVue from 'qrcode.vue'
	export default {
		components: {
			previewWrapper,
			QrcodeVue
		},
		props: {
			pageId: String
		},
		data() {
			return {
				loading: true,
				// defaultCoverImage: require('@client/common/images/quark--pagecover-image.png'),
				defaultCoverImage: "",
				pageData: {}
      }
		},
    created(){
			this.getData()
    },
    computed: {
			pageLink(){
				return this.$config.baseURL + '/quark/view/' + this.pageId
      },
			shareData(){
				if(!this.pageData.shareConfig){
					return {}
        }
				if(this.pageData.shareConfig.shareWx){
					return {
						coverImage: this.pageData.shareConfig.coverImage,
						title: this.pageData.shareConfig.title,
						description: this.pageData.shareConfig.description,
          }
        }else{
					return {
						coverImage: this.pageData.coverImage,
						title: this.pageData.title,
						description: this.pageData.description,
          }
        }
      }
    },
		methods: {
			/**
       * 关闭弹窗事件
			 */
			closePreview() {
				this.$emit('closePreview', false);
			},
			getData(){
				this.loading = true;
				this.$API.getPageDetail({pageId: this.pageId}).then(res => {
					this.loading = false;
          this.pageData = res.body;
				}).catch(() => {
					this.loading = false;
				})
      },
			doCopy: function () {
				this.$copyText(this.pageLink).then(() => {
					this.$message.success('已复制')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
  .preview-info-wrapper {
    padding: 30px 30px 60px;
    font-size: 16px;
  }

  .page-info {
    display: flex;
    padding: 12px;
    background-color: #f0f3f4;
    .page-cover {
      width: 80px;
      height: 80px;
      overflow: hidden;
    }
    .page-title-des {
      padding-left: 20px;
      flex: 1;
    }
  }
  .info-form-wrapper {
    display: flex;
    padding-bottom: 16px;
    .info-form-l {
      line-height: 42px;
      &.com-width {
        width: 120px;
      }
    }
    .info-form-r {
      flex: 1;
      padding-left: 10px;
    }
  }
  .share-wx-config-wrapper {
    margin-top: 14px;
    padding: 12px;
    background-color: #f0f3f4;
  }
</style>
