<template>
  <div id="chat">
        <!-- 导航栏 -->
      <div>
          <van-nav-bar
              title="AI助手"
              left-text="返回"
              right-text=". . ."
              left-arrow
              @click-left="onClickLeft"
              @click-right="onClickRight"
          />
      </div>
    <div v-if="dialogs.length" class="all_chat" ref="all_chat" style="height: 88vh; overflow-y: auto; overflow-x: hidden;">
        <div class="conversation"  v-for="(dialog, index) in dialogs" :key="index" >
            <div class="info">
                <div class="data" v-if="dialog.user">
                    <span class="uh">
                        <img :src="`${base}/images/${avatar}`" style="width: 30px;height: 30px;border-radius: 15px;margin-right: 10px;">
                        <p class="un">YOU</p>
                    </span>
                    <span class="wen">
                        {{ dialog.user }}
                    </span>
                </div>
                <div v-if="dialog.bot" class="response">
                    <span class="uh">
                        <img src="../assets//images/logo1.png" style="width: 30px;height: 30px;border-radius: 15px;margin-right: 10px;">
                        <p class="un">食光AI助手</p>
                    </span>
                    <span class="res">
                        {{ dialog.bot }}
                    </span>
                </div>
            </div>
        </div>
        <div v-if="isLoading" class="loading">
            <span>回答生成中...</span>
        </div>
    </div>
   
      <div class="input">
            <input v-model="question"  placeholder="请输入问题" @keypress="onKeyPress" class="shuru"/>
            <input type="button"  :disabled="isLoading" @click="upload" value="发送" class="send"/>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import ollama from 'ollama/browser'
import requests from '@/api/api/request';
import config from '@/api/config';
export default {
data(){
    return {
        question:'',
        dialogs: [], // 用于存储整个对话历史
        isLoading: false, 
        avatar:'',
        users:'',
        base:config.baseURL,
        showGreeting: true, 
    }
},
methods:{
    onClickLeft() {
        this.$router.push('/footer/message')
    },
    onClickRight() {
        this.$router.push({ 
          path: '/chatedit', 
          query: { thisitem:this.dialogs} 
      });
    },
    // async upload() {
    //     this.isLoading = true; // 开始加载
    //     try {
    //     // 将当前问题添加到对话历史
    //     this.dialogs.push({ user: this.question });
    //     // 调用 ollama.chat 发送用户问题并获取助手回答
    //     const response = await ollama.chat({
    //       model: 'qwen',
    //       messages: [{ role: 'user', content: this.question }],
    //     });
    //     // 将助手的回答添加到对话历史
    //     this.dialogs.push({ bot: response.message.content });
    //     // Save the dialogs to localStorage
    //     this.saveDialogs();
    //     // console.log(response);
    //     console.log(this.dialogs);
    //     this.isLoading = false; // 结束加载
    //     // 清空输入框，准备下一轮对话
    //     this.question = '';
    //   } catch (error) {
    //     console.error('Error during chat:', error);
    //     this.isLoading = false; // 结束加载
    //     // 错误处理
    //   }
    //  },
    upload() {
        if (!this.question.trim()) {
            this.$toast('请输入问题');
            return;
        }
        this.isLoading = true;
         // 将当前问题添加到对话历史
         this.dialogs.push({ user: this.question });
         setTimeout(() => {this.scrollToBottom();}, 100);
        axios.post('http://model.etakeaway.shop:8000/v1/askNoToken',
        {},
        {
            params:{
                question:this.question
            }
        })
               .then(response => {
               // 注册成功，处理返回的响应数据
                console.log(response.data.text)
                // 将助手的回答添加到对话历史
                this.dialogs.push({ bot: response.data.text });
                // Save the dialogs to localStorage
                this.saveDialogs();
                setTimeout(() => {this.scrollToBottom();}, 100);
                // console.log(response);
                console.log(this.dialogs);

                // 获取最后一条用户提问消息
                const lastUserMessage = this.dialogs.length > 0 ? this.dialogs[this.dialogs.length - 2].user : '';
                console.log(this.dialogs[this.dialogs.length-2])
                console.log(lastUserMessage)
                this.$emit('update:message', lastUserMessage);
                this.question = '';
                this.isLoading = false; // 结束加载
              })
             .catch(error => {
               console.log(error);
               this.dialogs.push({ bot: "生成错误！请重试！" });
               this.saveDialogs();
               setTimeout(() => {
                    this.scrollToBottom();
                }, 100);

                this.question = '';
               this.isLoading = false; // 结束加载
              });
    },
    loadDialogs() {
      const savedDialogs = localStorage.getItem('dialogs');
      if (savedDialogs) {
        this.dialogs = JSON.parse(savedDialogs);
      }
    },
    saveDialogs() {
      localStorage.setItem('dialogs', JSON.stringify(this.dialogs));
    },
    onKeyPress(event) {
    // 检查键码是否为 Enter（发送键）
    if (event.key === 'Enter' || event.keyCode === 13) {
      // 阻止默认行为，例如防止表单提交
      event.preventDefault();
      // 调用 upload 方法
      this.upload();
    }
    },
     // 获得用户信息
    getuserInfo(){
      const storedUser = localStorage.getItem('users');
      if (storedUser) {
        // 如果有，直接使用缓存的用户信息
        this.users = JSON.parse(storedUser);
        this.avatar=this.users.avatar
      } else {
      requests.get('/getById',{
         headers:{
          'id':localStorage.getItem('USERID'),
          'token':localStorage.getItem('TOKEN')
        }
        })
    .then(response => {
        console.log(response.data);
        // console.log(response.data.avatar);
        this.avatar=response.data.avatar
      })
      .catch(error => {
        console.error(error)
      })
    }
    },
    scrollToBottom() {
        // console.log(this.$refs.all_chat); 
        const container = this.$refs.all_chat;
        if (container) {
        container.scrollTo(0, container.scrollHeight);
        }
    },
    //初始化对话
    initDialogs() {
      this.dialogs.unshift({ bot: '您好！我是食光 AI 助手，可以帮您解答饮食相关的问题。' });
      this.scrollToBottom();
    },

},

created() {
    this.loadDialogs();
},
  //   页面加载时初始化数据
 mounted(){
    this.getuserInfo();
    if (this.dialogs.length === 0) {
      this.initDialogs();
    }
    this.$nextTick(() => {
        this.scrollToBottom();
    });
  },
}
</script>

<style scoped>
#chat {
    width: 100vw;
    height: 95vh;
    position: relative;
    padding-top: 46px;
    /* background-color: pink; */
}
#chat > div:first-child {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10; /* 确保导航栏在页面其他内容的上方 */
}
#chat .input{
    width: 100%;
    height: 44px;
    bottom: 0;
    position: fixed;
    display: flex;
    background-color: #fff;
    border-radius: 22px;
    overflow: hidden;
}
#chat .input .shuru {
    width: 85%;
    height: 44px;
    padding: 5px 10px;
    box-sizing: border-box;
}
#chat .input .send{
    display: block;
    z-index: 78;
    width: 15%;
    height: 44px;
    float: right;
    border:1px solid #adaaaa;
    border-radius: 22px;
    background-color: #fff;
}
#chat .input .send:active{
    background-color: #f5f5f5;
}
#chat .conversation {
    width: 100%;
}
#chat .info{
    width: 100%;
    /* height: 300px; */
    /* background-color: pink; */
}
#chat .info .data {
    width: 100%;
    /* border: 1px solid #5e5c5c; */
    border-radius: 10px;
    /* background-color: #d9e4db; */
    margin-top: 20px;
}
#chat .info .data .uh {
    display: block;
    display: flex;
    justify-content: baseline;
    width: 100%;
    height: 30px;
    padding: 0 10px;
    position: relative;
    /* background-color: green; */
}
#chat .info .data .uh .un{
    display: block;
    line-height: 30px;
    padding: 0 15px;
    font-size: 15px;
    font-weight: 800;
}
#chat .info .data .wen {
    display: inline-block;
    /* width: 100%; */
    padding: 10px 40px;
    font-size: 18px;
    font-weight: 800;
}
#chat .info .response {
    width: 100%;
    /* border: 1px solid #5e5c5c; */
    border-radius: 10px;
    /* background-color:#faeee7; */
    margin-top: 20px;
}
#chat .info .response .uh {
    display: block;
    display: flex;
    justify-content: baseline;
    width: 100%;
    height: 30px;
    padding: 0 10px;
    position: relative;
}
#chat .info .response .uh .un {
    display: block;
    line-height: 30px;
    padding: 0 15px;
    font-size: 15px;
    font-weight: 800;
}
#chat .info .response .res {
    display: inline-block;
    /* width: 100%; */
    padding: 10px 45px;
    display: table-cell;
    font-size: 16px;
    font-weight: 400;
}

.loading {
  width: 100%;
  text-align: center;
  margin-top: 20px;
  color: gray;
}
</style>