<template>
  <div id="login">
        <div class="banner">
                <!-- 反转卡片 -->
          <div class="body">
              <div class="card">
                  <!-- 正面卡片 -->
                  <div class="front">
                    <p style="font-family: Verdana;
                            font-size: 50px;
                            font-weight: bold;
                            color: transparent;
                            text-stroke: 2px #078080;
                            -webkit-text-stroke: 2px #078080;
                      ">iTakeaway</p>
                  </div>
                  <!-- 背面卡片 -->
                  <div class="back,info">
                    <p style="font-size: 30px;color: #172c66;text-shadow: 4px 4px 2px gray;">iTakeaway</p>
                  </div>
              </div>
             <!-- <i class="info">外卖e点通</i>  -->
             <i class="tips">您的专属健康管理点餐APP</i> 
          </div>
       
        </div>
        <!-- 登录 -->
        <div class="login">
            <van-form @submit.prevent="login">
                <van-field
                    v-model="username"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info"  @click="login($event)">登录</van-button>
                </div>
            </van-form>
        </div>
        <div class="signup">
            <router-link class="register" to="/register">立即注册</router-link>
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
data() {
    return {
      username: '',
      password: '',
    };
},
methods: {
    login(event){
        if (event && typeof event.preventDefault === 'function') {
            event.preventDefault();
        }
        //  发送登录请求
          requests.post('/user/login',this.$data,{
            headers:{
              id:localStorage.getItem('USERID'),
              token:localStorage.getItem('TOKEN')
            }
          })
          .then(response => {
            console.log(response)
          if(response.code==200){
            //持久化存储token
            localStorage.setItem("USERID",response.data.id)
            localStorage.setItem("TOKEN",response.data.token)
      
            this.$router.replace('/footer/start');
             //return
             this.$message.success('登录成功')
             // 在用户登录成功的逻辑中
            localStorage.setItem('userLoggedIn', 'true');
          }else if(response.code==444){
            this.$message.error(response.message)
          }else if(response.code==666){
            this.$message.error(response.message)
          }else if(response.code==2333){
            this.$message.error(response.message)
          }else if(response.code==429){
            this.$message.error("操作太快!")
          }
        }).catch(error => {
        console.error(error);
        this.$message.error('登录失败');
      }) .finally(() => {
            // 结束加载
            this.isLoading = false;
        });
    }
},
}
</script>

<style scoped>
#login {
    width: 100vw;
    height: 100vh;
    padding: 100px 0;
     /* 背景渐变色 */
	background-image: linear-gradient(200deg,#fffffe, #c3f0ca);
    /* background-image: url("@/assets/images/bgc.jpg");
    background-repeat: no-repeat; */
}
#login .banner {
    width: 100%;
    height: 250px;
    /* margin-top: 100px; */
    /* background-color: pink; */
}
/* 反转卡片 */
.banner .body {
	/* display: flex; */
	/* justify-content: center; */
	/* align-items: center; */
	/* 让页面始终占浏览器总高 */
	height: 250px;
	/* 背景渐变色 */
	/* background-image: linear-gradient(200deg, #78f, #f78); */
	/* 这里现在我们动画看起来硬生生的，没有任何的立体感 所以我们需要添加这个属性来增加卡片旋转的立体感 当然值越小 立体感就会越明显 立体感最明显的地方就是近小远大 这个是的意思就是设置视距 相当于你的眼睛离一个东西的距离 当这个东西离你的眼睛越近 那么这个东西就会越大 这期的很多知识点可能小伙伴看的不是特别明白 所以小伙伴们如果有什么不懂得就在评论区给我留言 我会一一为大家解答  录声音不太方便 就只能以文字的形式来为大家解答了  谢谢大家的支持 最后不要忘了三连*/
	perspective: 1000px;
}
.banner .body .card {
	width: 100%;
	height: 240px;
	/* 圆角属性 */
	border-radius: 30px;
	/* 鼠标放到元素上呈现小手的形状 */
	cursor: pointer;
    font-size:60px;
	/* 盒子阴影 */
	box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.1);
	/* 给父元素 加一个3D盒子属性 那么子元素就到背面了 这个属性是加到父元素上 但是影响的是子元素 */
	transform-style: preserve-3d;
	/* animation: rotate-reverse 1.2s cubic-bezier(0.66, -0.47, 0.33, 1.5) forwards; */
    /* 添加动画属性，使卡片自动翻转 */
    animation: rotate 2s infinite cubic-bezier(0.66, -0.47, 0.33, 1.5) forwards  alternate;
}
.card:hover {
	/* 动画 名称 时长 第三个属性是贝塞尔曲线 我们可以自定义动画的运动轨迹 让动画的运动轨迹有了很多种可能 第四个属性是当我们的动画完成是的状态 一般动画完成之后就回到了0%的状态 默认值是backwards 当我们给属性值是forwards的时候那么当动画到100%的时候就会停下来 不会再回到0% */
	animation: rotate 1.2s cubic-bezier(0.66, -0.47, 0.33, 1.5) forwards;
}
.front,
.back {
	display: flex;
	/* 弹性布局 让元素垂直陈列 */
	flex-direction: row;
	/* 现在子元素垂直陈列 那么就是让子元素 水平居中 */
	align-items: center;
	/* 平均分配高度给每一个子元素 */
	justify-content: space-around;
	/* 绝对定位  子元素是绝对定位 父元素需要相对定位 */
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	/* 1em = 16px */
	font-size: 1.3em;
	border-radius: 30px;
}
.back {
	/* 因为背面卡片要到后面去所以我们给背面卡片加一个沿Y轴旋转180度的属性 这里面我们可以看到是旋转了但是没有到后面 原因就是父盒子现在不是3D盒子 而是一个2D盒子 所以我们必须让父元素变成3D盒子 */
	transform: rotateY(180deg);
}
/* 下面我们定义一下翻转动画 */
@keyframes rotate {
	0% {
		transform: rotateY(0);
	}
	100% {
		transform: rotateY(180deg);
	}
}

@keyframes rotate-reverse {
	0% {
		transform: rotateY(180deg);
	}
	100% {
		transform: rotateY(0);
	}
}
/* 卡片 */
.info {
  height:240px;
  width:100%;
  /* background-color: forestgreen; */
}
/* tips */
.body .tips {
  /* position: absolute; */
  display: block;
  height:10px;
  /* margin-top:230px; */
  font-size:16px;
  margin-top: -40px;
  margin-left: 100px;
}
/* 登录 */
#login .login{
    width: 100%;
    /* height: 300px; */
    margin-top: 20px;
    padding: 0 10px;
    /* background-color: green; */
}
#login > div.login > form > div{
    line-height: 40px;
}
#login > div.login > form > div:nth-child(2){
    margin-top: 10px;
}
#login > div.login > form > div {
    border-radius: 30px;
    opacity: 0.5;
}
/* 注册 */
#login .signup {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 20px;
    margin-top: 10px;
    /* background-color: green; */
}
#login .signup .register {
    float: right;
}
#login .signup .register:active{
    font-size: 20px;
}
/* logo */
#login .logo {
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