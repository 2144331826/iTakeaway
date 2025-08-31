<template>
  <div id="useredit">
        <!-- 导航栏 -->
      <div>
          <van-nav-bar
              title="信息编辑"
              left-text="返回"
              left-arrow
              @click-left="onClickLeft"
          />
      </div>
      <div class="avatar">
            <div class="pic">
                <div class="tou">
                    <img :src="`${base}/images/${detail.avatar}`" style="width: 100%;height: 100%">
                </div>
            </div>
            <span>{{ detail.nickname }}</span>
            <input type="file" @change="onFileChange" accept="image/*"  ref="fileInput">
            <button @click="editpic">＋上传头像</button>
      </div>
      <div class="info">
        <van-form  >
            <van-field
                v-model="values.nickname"
                name="用户昵称"
                label="用户昵称"
                :placeholder=detail.nickname
            />
            <van-field
                v-model="values.username"
                name="用户名"
                label="用户名"
                :placeholder=detail.username
            />
            <van-field
                v-model="values.mobile"
                name="电话"
                label="电话"
                :placeholder=detail.mobile
            />
            <van-field
                v-model="values.email"
                name="邮箱"
                label="邮箱"
                :placeholder=detail.email
            />
            <van-field
                v-model="values.sex"
                name="性别"
                label="性别"
                :placeholder=detail.sex
            />
            <van-field
                v-model="values.description"
                name="个人介绍"
                label="个人介绍"
                :placeholder=detail.description
            />
            <div style="margin: 16px;">
                <van-button round block type="info" @click="update">提交</van-button>
            </div>
        </van-form>
      </div>
      
  </div>
</template>

<script>
import requests from '@/api/api/request';
import config from '@/api/config' 
export default {
name:'',
data(){
    return {
        base:config.baseURL,
        detail:'',
        values: {
          id:'',
          username: '',
          nickname: '',
          mobile: '',
          email: '',
          sex: '',
          description: '',
          score: '',
          avatar:'',
          token: '',
          pushEmail:'',
          pushSwitch:'',

        },
        // 用于存储选择的文件
        selectedFile: []
    }
},
methods:{
    onClickLeft() {
       this.$router.push('/footer/person')
    },   
    // 更新
    update(){
      console.log(this.detail.id)
      console.log(this.values)
      requests.post('/UpdateInfo',
      { 
          id:localStorage.getItem('USERID'),
          username:this.values.username,
          nickname:this.values.nickname,
          mobile: this.values.mobile,
          email: this.values.email,
          sex: this.values.sex,
          description: this.values.description,
          score: 0,
          avatar:this.values.avatar,
          token: localStorage.getItem('TOKEN'),
          pushEmail:'',
          pushSwitch:'',
      },
        {                 
          headers:{
          'id':localStorage.getItem('USERID'),
          'token':localStorage.getItem('TOKEN'),
            },
          })
    .then(response => {
        // 在这里处理搜索结果
        console.log(response)
        if(response.code==666){
          this.$message.success("更新成功!")
        }if(response.code==4444){
          this.$message.error("用户名已存在!")
        }
        
      })
      .catch(error => {
        // 在这里处理错误
        console.error(error)
      })
    },
    onFileChange(e) {
      // 当文件选择改变时触发
      this.selectedFile = e.target.files[0];
    },
    //上传头像
    editpic(){
        // 当用户点击更新头像按钮时触发
      if (!this.selectedFile) {
        this.$toast('请先选择图片!');
        return;
      }
      const formData = new FormData();
      formData.append('file', this.selectedFile);
        requests.post('/upload/user',formData,
          {headers:{
            id:localStorage.getItem('USERID'),
          }})
              .then(response => {
                console.log(response)
                if(response.code==666){
                  this.getuserInfo()
                  this.$message.success("头像更新成功!")
                }
              })
              .catch(error => {
                console.error(error);
                this.$message.error('更新头像失败，请重试!');
              });
    } ,
    // 获得用户信息
    getuserInfo(){
      requests.get('/getById',{
            headers:{
          'id':localStorage.getItem('USERID'),
          'token':localStorage.getItem('TOKEN')
        }
        })
    .then(response => {
        // 在这里处理搜索结果
        console.log(response.data);
        // console.log(response.data.avatar);
        this.detail.avatar=response.data.avatar
        this.values.avatar=this.detail.avatar
      })
      .catch(error => {
        // 在这里处理错误
        console.error(error)
      })
    },
  },
created() {
    this.detail = this.$route.query.userinfo;
    this.values=this.detail
    console.log(this.values)
  },
}
</script>

<style scoped>
#useredit {
    width: 100vw;
}
#useredit .avatar {
    width: 100%;
    height: 200px;
    padding: 20px 0;
    /* background-color: green; */
}
#useredit .avatar .pic {
    display: flex;
    justify-content: center;
    width: 100%;
}
#useredit .avatar .pic .tou {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    overflow: hidden;
    /* background-color: pink; */
}
#useredit  .avatar span {
    display: block;
    /* height: 20px; */
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
}
#useredit  .avatar button{
    display: block;
    height: 20px;
    text-align: center;
    font-size:18px;
    float: right;
    margin-right: 10px;
    color: #8bd3dd;
}
#useredit .info {
    width: 100%;
    /* background-color: pink; */
}
</style>