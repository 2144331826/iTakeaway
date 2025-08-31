<template>
    <div id="register">
          <!-- 注册 -->
          <div class="register">
               <!-- 表单 -->
                <van-form >
                    <van-field
                        v-model="username"
                        name="用户名"
                        label="账户"
                        placeholder="用户名 (必须以字母开头)"
                        :rules="[{ required: true, message: '请填写用户名' }]"
                    />
                    <van-field
                        v-model="password1"
                        type="password"
                        name="密码"
                        label="密码"
                        placeholder="密码 (至少8位包含数字字母大小写)"
                        :rules="[{ required: true, message: '请填写密码' }]"
                    />
                    <van-field
                        v-model="password2"
                        type="password"
                        name="确认密码"
                        label="确认密码"
                        placeholder="请再次输入密码"
                        :rules="[{required: true, message: '请确认密码' }]"
                    />
                    <div style="margin: 16px;">
                        <van-button round block type="info"  @click="signup">注册</van-button>
                    </div>
                </van-form>
          </div>
          <div class="login">
              <router-link  class="deng" to="/login">去登陆</router-link>
          </div>
          <!-- logo -->
          <div class="logo">
  
          </div>
    </div>
  </template>
  
  <script>
  import requests from '@/api/api/request';
  export default {
  name:"",
  data(){
    return {
        username:"",
        password1:"",
        password2:"",
    }
  },
  methods: {
    //注册
    signup(){
      if (this.password1 !== this.password2) {
        this.$message.error('两次输入的密码不一致！');
        return;
      }
      requests.post('/user/register',{
        username: this.username,
        password: this.password1,})
               .then(response => {
               // 注册成功，处理返回的响应数据
               console.log(response)
               // 其他注册成功后的操作，例如跳转到登录页面
               if(response.code==200){
                this.$router.push('/login');
                this.$message.success('注册成功')
               }else if(response.code==201){
                this.$message.error(response.data)
               }
              })
             .catch(error => {
               // 注册失败，处理错误信息
               console.error(error);
               this.$message.error('注册失败');
              });
    }
  }  
}
  </script>
  
  <style scoped>
  #register {
      width: 100vw;
      height: 100vh;
      padding: 270px 0;
       /* 背景渐变色 */
      background-image: linear-gradient(200deg,#fffffe, #c3f0ca);
      background-image: url("@/assets/images/bgc.jpg");
      background-size: cover;
      background-position: center center; 
      background-attachment: fixed;
      background-repeat: no-repeat;
      /* height: 300px; */
      /* background-color: green; */
  }
  #register .register{
    width: 100%;
    /* height: 300px; */
    margin-top: 20px;
    padding: 0 10px;
    /* background-color: green; */
}
  #register > div.register > form > div{
    line-height: 40px;
    margin-top: 10px;
    border-radius: 30px;
    opacity: 0.5;
}
 /* 登录 */
#register .login {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 20px;
    margin-top: 10px;
    /* background-color: green; */
}
#register .login .deng {
  float: right;
}
#register .login .deng:active{
    font-size: 20px;
}
  /* logo */
  #register .logo {
      width: 100%;
      height: 100px;
      /* background-color: pink; */
      background-image: url("../assets/images/itakeaway.png");
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center; /* 水平垂直居中 */
      /* margin-top: 100px; */
  }
  </style>