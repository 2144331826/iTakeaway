<template>
  <div id="plan">
    <!-- 导航栏 -->
    <div>
          <van-nav-bar
              title="定制计划"
              left-text="返回"
              left-arrow
              @click-left="onClickLeft"
          />
    </div>
    <div class="logo">
            <img src="../../assets/images/plan.png" style="width: 100%;height: 100%;">
    </div>
    <van-form style="margin-top: 2px;">
                    <van-field
                        v-model="height"
                        name="身高"
                        label="身高"
                        placeholder="请输入您的身高"
                        :rules="[{ required: true, message: '请填写身高信息' }]"
                    />
                    <van-field
                        v-model="weight"
                        name="体重"
                        label="体重"
                        placeholder="请输入您的体重"
                        :rules="[{ required: true, message: '请填写体重信息' }]"
                    />
                    <van-field
                        v-model="condition"
                        name="身体状况"
                        label="身体状况"
                        rows="2"
                        autosize
                        type="textarea"
                        maxlength="500"
                        show-word-limit
                        placeholder="请输入您的身体状况"
                        :rules="[{required: true, message: '请输入身体状况' }]"
                    />
                    <van-field
                        v-model="plan"
                        name="目标"
                        label="目标"
                        rows="2"
                        autosize
                        type="textarea"
                        maxlength="500"
                        show-word-limit
                        placeholder="请输入您的目标"
                        :rules="[{required: true, message: '请输入目标' }]"
                    />
                    <div style="margin: 16px;">
                        <van-button round block type="info"  @click="get_plan">生成计划</van-button>
                    </div>
    </van-form>

    <div v-if="loading" class="loading-container">
        <van-loading type="spinner" size="20" />
            计划生成中...
    </div>
    <!-- 计划卡片 -->
    <div class="card" v-if="!loading &&card">
            <div style="width: 100%;height: 40px;">
                <span style="display: block;width: 100%;height: 40px;text-align: center;font-size: 18px;line-height: 40px;background-color: #bfcbcb;
                border-radius: 15px 15px 0 0;">
                    计划详情
                </span>
            </div>
            <van-notice-bar
            left-icon="volume-o"
            text="默认不保存计划，满意可以手动添加计划"
            />
            <div class="info">
                    <span style="display: block;width: 100%;height: 40px;display: flex;">
                        <img src="../../assets/images/bre.png" style="width: 40px;height: 40px;">
                        <span style="display: blockk;height: 40px;line-height: 40px;font-size: 20px;color: #2d334a;">
                            &nbsp;早餐:
                        </span>
                    </span>
                    <span style="display: block;font-size: 18px;color: #687878;">
                            {{ card.早餐 }}
                    </span>

                    <span style="display: block;width: 100%;height: 40px;display: flex;">
                        <img src="../../assets/images/lunch.png" style="width: 40px;height: 40px;">
                        <span style="display: blockk;height: 40px;line-height: 40px;font-size: 20px;color: #2d334a;">
                            &nbsp;午餐:
                        </span>
                    </span>
                    <span style="display: block;font-size: 18px;color: #687878;">
                            {{ card.午餐 }}
                    </span>

                    <span style="display: block;width: 100%;height: 40px;display: flex;">
                        <img src="../../assets/images/dinner.png" style="width: 40px;height: 40px;">
                        <span style="display: blockk;height: 40px;line-height: 40px;font-size: 20px;color: #2d334a;">
                            &nbsp;晚餐:
                        </span>
                    </span>
                    <span style="display: block;font-size: 18px;color: #687878;">
                            {{ card.晚餐 }}
                    </span>

                    <span style="display: block;width: 100%;height: 40px;display: flex;">
                        <img src="../../assets/images/plan1.png" style="width: 40px;height: 40px;">
                        <span style="display: blockk;height: 40px;line-height: 40px;font-size: 20px;color: #2d334a;">
                            &nbsp;计划:
                        </span>
                    </span>
                    <span style="display: block;font-size: 18px;color: #687878;">
                            {{ card.计划 }}
                    </span>

                    <span style="display: block;width: 100%;height: 40px;display: flex;">
                        <img src="../../assets/images/notice.png" style="width: 40px;height: 40px;">
                        <span style="display: blockk;height: 40px;line-height: 40px;font-size: 20px;color: #2d334a;">
                            &nbsp;注意事项:
                        </span>
                    </span>
                    <span style="display: block;font-size: 18px;color: #687878;">
                            {{ card.注意事项 }}
                    </span>
            </div>
    </div>
    <div class="add" v-if="!loading &&card">
        <van-button type="default" round style="width: 160px;">添加至我的计划</van-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
data(){
    return {
        height:'',
        weight:'',
        condition:'',
        plan:'',

        card:'',//生成计划内容
        loading:false,
    }
},
methods:{
    onClickLeft() {
        this.$router.go('-1')
    }, 
    get_plan(){
        this.loading=true
        const userId = localStorage.getItem('USERID');
        const token = localStorage.getItem('TOKEN');
        const headers = {
          'id': userId,
          'token': token,
        };
        const params = {
            height:this.height,
            weight:this.weight,
            physical_condition:this.condition,
            hopo:this.plan
        };
        axios.post("http://model.etakeaway.shop:8000/v1/askPlanNoToken",
        {},
        {   params:params,
            headers: headers ,
            timeout: 120000
        })
        .then(response => {
          console.log(response);
          this.card=response.data
          localStorage.setItem('Plan_Card',JSON.stringify(response.data))
        })
        .catch(error => {
          console.error(error)
          this.$toast('生成失败')
        })
        .finally(() => {
            this.loading = false; // 隐藏加载提示
        });
    },
    load_plan(){
        const card_content=localStorage.getItem('Plan_Card')
        if(card_content){
            this.card=JSON.parse(card_content)
        }
    },
},
created(){
    this.load_plan();
}
}
</script>

<style scoped>
#plan {
    width: 100vw;
    padding-top: 46px;
}
#plan > div:first-child{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10; 
  }
#plan .logo{
    width: 100%;
    height: 80px;
    /* background-color: pink; */
}
#plan > form > div{
    line-height: 40px;
    margin-top: 10px;
    border-radius: 30px;
    opacity: 0.5;
}
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 卡片 */
.card{
    width: 100%;
    /* background-color: green; */
}
.card .info{
    width: 85%;
    margin:6px auto;
    /* background-color: pink; */
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    border: 1px solid grey;
}
.add{
    margin: 10px auto;
    text-align: center;
}
</style>