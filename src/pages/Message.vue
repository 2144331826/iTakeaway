<template>
  <div id="message">
    <div class="header">
      <div class="logo">消息</div>
      <div class="search">
        <van-icon name="search" />
        <input type="text" placeholder="搜索" />
      </div>
      <van-icon name="bell" />
    </div>
    <div class="mes">
        <div class="mes_card" @click="go_AIchat">
            <div class="pic">
                <img src="../assets//images/logo1.png" style="width: 100%;">
            </div>
            <div class="word">
                <span>食光AI助手</span>
                <span>不知道今天吃什么？问问我吧！</span>
            </div>
        </div>
        <div class="mes_card" >
            <div class="pic">
                <img src="../assets//images/information.jpg" style="width: 100%;">
            </div>
            <div class="word">
                <span>系统通知</span>
                <span>如何快速上手iTakeaway,快来看看吧！</span>
            </div>
        </div>
        <div class="mes_card" >
            <div class="pic">
                <img src="../assets/picture/sj.jpg" style="width: 100%;">
            </div>
            <div class="word">
                <span>商家对话</span>
                <span>请问我的外卖还要多久送达？</span>
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Message",
  data(){
    return {
      latestMessage:''
    }
  },
  methods:{
    go_AIchat(){
      this.$router.push('/chat')
    },
    updateMessage(message) {
    this.latestMessage = message;
  }
  },
  mounted() {
  this.$on('update:message', this.updateMessage);
},
};
</script>

<style scoped>
#message {
  width: 100vw;
  background-color: #f5f5f5;
}
/* 头部 */
#message .header {
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

#message .header .logo {
  font-size: 20px;
  font-weight: bold;
}

#message .header .search {
  display: flex;
  align-items: center;
  background-color: #eee;
  padding: 5px;
  border-radius: 10px;
}
#message .header .search input {
  border: none;
  outline: none;
  background-color: transparent;
}
/* xiaoxi */
#message .mes {
  width: 100%;
}
#message .mes .mes_card{
  width: 100%;
  height: 90px;
  padding: 5px;
  background-color: #e3f6f5;
  border-bottom: 1px solid #cfebe9;
  /* box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5); */
  /* background-color: green; */
}
#message .mes .mes_card .pic {
  width: 80px;
  border-radius: 40px;
  overflow: hidden;
  float: left;
  padding: 10px;
}
#message .mes .mes_card .pic img {
  border-radius: 40px;
}
#message .mes .mes_card .word {
  width: 100%;
  height: 80px;
  margin-left: 80px;
  /* background-color: pink; */
}
#message .mes .mes_card .word span:nth-child(1) {
  display: block;
  font-size: 18px;
  margin-left: 20px;
  height: 40px;
  line-height: 40px;
  font-weight: 800;
}
#message .mes .mes_card .word span:nth-child(2) {
  display: block;
  font-size: 15px;
  margin-left: 20px;
  height: 40px;
  line-height: 40px;
  color: #636060;
}
</style>