<template>
  <div id="advice">
        <!-- 导航栏 -->
      <div>
          <van-nav-bar
              title="我的反馈"
              left-text="返回"
              left-arrow
              @click-left="onClickLeft"
          />
      </div>
      <van-form >
        <van-field
            v-model="username"
            name="姓名"
            label="姓名"
            placeholder="请输入姓名"
            :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
            v-model="telnumber"
            name="电话"
            label="电话"
            placeholder="请输入电话"
            :rules="[{ required: true, message: '请填写电话号码' }]"
        />
        <van-field name="radio" label="性别">
            <template #input>
                <van-radio-group v-model="radio" direction="horizontal">
                <van-radio name="女">女</van-radio>
                <van-radio name="男">男</van-radio>
                <van-radio name="其他">其他</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <van-field
            v-model="advice"
            name="advice"
            rows="2"
            autosize
            label="建议"
            type="textarea"
            maxlength="500"
            placeholder="请输入您的建议"
            show-word-limit
        />
        <van-field name="rate" label="评分">
            <template #input>
                <van-rate v-model="rate" />
            </template>
        </van-field>
        <div style="margin: 16px;">
            <van-button round block type="info" @click="send_advice">提交</van-button>
        </div>
       </van-form>
  </div>
</template>

<script>
import requests from '@/api/api/request';
export default {
data() {
    return {
      username: '',
      telnumber: '',
      advice:'',
      radio:'',
      rate: 0,
    };
},
methods:{
    onClickLeft() {
        this.$router.push('/footer/person')
    }, 
    send_advice(){
        const userId = localStorage.getItem('USERID');
        const token = localStorage.getItem('TOKEN');
        const headers = {
          'id': userId,
          'token': token,
        };
        requests.post('/user/feedback/insert',
        {
            "phoneNumber": this.telnumber,
            "gender": this.radio,
            "rating":this.rate,
            "name":this.username,
            "feedbackInfo":this.advice,
            
        },
        { headers: headers })
        .then(response => {
          console.log(response);
          if(response.code===666){
                this.$message.success('提交成功');
          }
        })
        .catch(error => {
          console.error(error)
          this.$message.error('提交失败')
        })
    }
}
}
</script>

<style scoped>
#advice {
    width: 100%;
}
</style>