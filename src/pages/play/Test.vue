<template>
    <div id="test">
            <!-- 导航栏 -->
        <div>
          <van-nav-bar
              title="健康跟踪"
              left-text="返回"
              left-arrow
              @click-left="onClickLeft"
          />
        </div>


        <div class="card">
                <span style="display: block;width: 100%;text-align: center;border-radius: 10px;padding:5px 5px 0px;box-sizing: border-box;">
                    <input type="file" id="imageInput" accept="image/*" @change="onFileChange" style="display:none;"/>
                    <van-icon name="photo-o" size="60" style="cursor:pointer;line-height: 200px;" @click="selectImage" v-if="!imageSrc"/>
                    <img :src="imageSrc" v-if="imageSrc" style="width:100%;border-radius: 10px;  "/>
                </span>
        </div>
        <div style="margin: 16px;">
                <van-button round block type="info"  @click="get_info">开始识别</van-button>
        </div>


        <div v-if="loading" class="loading-container">
            <van-loading type="spinner" size="20" />
            图片识别中...
        </div>


        <div class="info" v-if="!loading && imageinfo">
                    <span style="display: block;width: 100%;height: 40px;display: flex;">
                        <img src="../../assets/images/name.png" style="width: 40px;height: 40px;">
                        <span style="display: blockk;height: 40px;line-height: 40px;font-size: 20px;color: #2d334a;">
                            &nbsp;名称:
                        </span>
                    </span>
                    <span style="display: block;font-size: 18px;color: #687878;">
                            {{ imageinfo.name }}
                    </span>

                    <span style="display: block;width: 100%;height: 40px;display: flex;">
                        <img src="../../assets/images/lunch.png" style="width: 40px;height: 40px;">
                        <span style="display: blockk;height: 40px;line-height: 40px;font-size: 20px;color: #2d334a;">
                            &nbsp;营养成分:
                        </span>
                    </span>
                    <span style="display: block;font-size: 18px;color: #687878;">
                            {{ imageinfo.info }}
                    </span>
        </div>
        <div class="add" v-if="!loading &&imageinfo">
            <van-button type="default" round style="width: 160px;">添加记录</van-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
data(){
    return {
        loading:false,
        imageSrc: '', // 用于存储图片的URL
        selectfile:'',

        imageinfo:'',
    }
},
methods:{
    onClickLeft() {
        this.$router.go('-1')
    }, 
    selectImage() {
         document.getElementById('imageInput').click();
    },
    onFileChange(e) {
        const file = e.target.files[0];
        this.selectfile=file
        if (file&& file.type.match('image.*')) {
                // 将文件转换为URL，用于显示图片
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imageSrc = e.target.result;
                };
                reader.readAsDataURL(file);
            }
    },
    get_info(){
        if (!this.selectfile) {
            this.$toast('请先选择图片!');
            return;
        }
        this.loading=true
        const formData = new FormData();
        formData.append('file', this.selectfile);
        const headers = {
          'Content-Type': 'multipart/form-data',
        };
        axios.post("http://model.etakeaway.shop:8000/v1/imageFood",
        formData,
        {  
            headers: headers ,
            timeout: 180000
        })
        .then(response => {
          console.log(response);
          this.imageinfo=response.data
          console.log(this.imageinfo)
        })
        .catch(error => {
          console.error(error)
          this.$toast('解析失败')
        })
        .finally(() => {
            this.loading = false; 
        });
    }
}
}
</script>

<style scoped>
#test{
    width: 100vw;
    padding-top: 46px;
}
#test > div:first-child{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10; 
}
.card{
    width: 90%;
    margin: 5px auto;
    box-sizing: border-box;
    /* background-color: pink; */
    border: 1px solid grey;
    border-radius: 10px;
}
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.info{
    width: 85%;
    margin:20px auto;
    /* background-color: pink; */
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid grey;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.add{
    margin: 10px auto;
    text-align: center;
}
</style>