<template>
  <div id="person">
    <!-- 头像信息 -->
    <div class="avater">
      <span class="pic">
        <van-image
        round
        width="100px"
        height="100px"
        :src="`${base}/images/${users.avatar}`"
        />
      </span>
      <div class="info">
          {{ users.nickname }}
      </div>
      <div class="descript">
          {{users.description}}
      </div>
      <div class="op">
        <van-button round plain type="info" @click="edit(users)">编辑</van-button>
        <van-button round plain type="info" @click="logout">退出</van-button>
      </div>
    </div>
    <!-- 个人服务 -->
    <div class="serves">
      <div class="nav">
        <van-grid>
        <van-grid-item icon="star-o" text="我的收藏" @click="go_collect"/>
        <van-grid-item icon="coupon-o" text="我的地址" @click="go_addr"/>
        <van-grid-item icon="cart-o" text="购物车" @click="go_shopcar"/>
        <van-grid-item icon="friends-o" text="我的服务" />
        </van-grid>
      </div>
      <div class="more">
        <span style="font-size: 18px;margin-left: 5px;">累积点餐</span>
        <div class="all_see">
          <e-charts class="chart" :option="option"/>
        </div>
      </div>
      <div class="ser">
        <span style="font-size: 18px;margin-left: 5px;margin-bottom: 5px;">更多服务</span>
        <van-cell is-link >个人中心</van-cell>
        <van-cell is-link >我的订单</van-cell>
        <!-- 优惠券单元格 -->
        <van-coupon-cell
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          @click="showList = true"
        />
        <!-- 优惠券列表 -->
        <van-popup
          v-model="showList"
          round
          position="bottom"
          style="height: 90%; padding-top: 4px;"
        >
          <van-coupon-list
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            :disabled-coupons="disabledCoupons"
            @change="onChange"
            @exchange="onExchange"
          />
        </van-popup>
        <van-cell is-link @click="go_advice">反馈建议</van-cell>
      </div>
      <div class="share">
        <span style="font-size: 18px;margin-left: 5px;">我的分享</span>
        <div class="share_card">
          <van-card
          price="398.88"
          desc="缓解疲劳和压力 模仿专业按摩师的按摩手法"
          title="好吃能按摩椅"
          thumb="https://img.zhisheji.com/lneDTOQyiYGiMmI2Favafii5lKyn?imageMogr2/quality/90/sharpen/1"
          />
          <span style="font-size: 15px;margin-top: 5px;display: block;">非常好吃，推荐大家购买</span>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import requests from '@/api/api/request';
import config from '@/api/config' 
import { CouponCell, CouponList, Popup } from 'vant';
const coupon = {
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元',
};
export default {
components: { CouponCell, CouponList, Popup },
name:'',
data(){
  return {
    base:config.baseURL,
    option :{
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
        yAxis: {
            type: 'value'
          },
        series: [
            {
              data: [3, 4, 1, 5, 0, 3, 1],
              type: 'line',
              smooth: true
            }
          ]
    },
    users:'',

    chosenCoupon: -1,
    coupons: [coupon],
    disabledCoupons: [coupon],
    showList:false
  }
},
methods:{
    // 获得用户信息
    getuserInfo(){
        requests.get('/getById', {
          headers: {
            'id': localStorage.getItem('USERID'),
            'token': localStorage.getItem('TOKEN')
          }
        })
        .then(response => {
          console.log(response.data);
          this.users = response.data;
          // 将获取到的用户信息存储到localStorage中
          localStorage.setItem('users', JSON.stringify(response.data));
        })
        .catch(error => {
          console.error(error);
        });
    },
    storeUser(){
      const storedUser = localStorage.getItem('users');
      this.users = JSON.parse(storedUser);
    },
    // 编辑
    edit(users){
      this.$router.push({ 
          path: '/useredit', 
          query: { userinfo:users } 
      });
    },
    logout(){
      const userId = localStorage.getItem('USERID');
      const token = localStorage.getItem('TOKEN');
      const headers = {
        'id': userId,
        'token': token,
      };
      const data = {
        id: userId,
        token: token
      };
        requests.post('/user/logout', 
          JSON.stringify(data), 
        { headers: headers })
        .then(response => {
            console.log(response);
            if (response.code === 200) {
                console.log("成功退出");
                localStorage.removeItem('TOKEN');
                localStorage.removeItem('USERID');
                localStorage.removeItem('users');
                localStorage.setItem('userLoggedIn', 'false');
                this.$message.success('退出成功');
                this.$router.push('/login');
            }
            if(response.code===429){
              this.$message.error("操作太快!")
            }
        })
        .catch(error => {
          console.error("退出失败", error);
          if (error.response && error.response.status === 403) {
            // 如果状态码是 403，表示用户未授权或令牌过期
            // this.$message.error(error.message);
            this.$message.error("登录过期，请重新登录");
            localStorage.removeItem('TOKEN');
            localStorage.removeItem('USERID');
            localStorage.setItem('userLoggedIn', 'false');
            this.$router.push('/login');
          } else {
            this.$message.error('登出时发生错误：' + (error.message || '未知错误'));
          }
        });
      },
    go_addr(){
      this.$router.push('/address')
    },
    go_advice(){
      this.$router.push('/advice')
    },
    go_shopcar(){
      this.$router.push('/shopcar')
    },
    go_collect(){
      this.$router.push('/collect')
    },

    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
},
created(){
  this.storeUser();
},
mounted(){
  this.getuserInfo();
}
}
</script>

<style scoped>
#id {
  width: 100vw;
}
.avater{
  /* width: 414px; */
  width: 100vw;
  height: 210px;
  padding: 10px;
  margin-top: 10px;
  background-color: #dce2ee;
  border-radius: 20px;
  box-shadow: 3px 3px 10px 5px #cfd4e0;
  /* background: url(../assets/images/bg1.jpg) fixed; */
}
.pic{
  width: 100px;
  height: 100px;
  display: block;
  text-align: center;
  line-height: 100px;
  float: left;
  /* background-color: pink; */
}
.info{
  width: 60%;
  height: 100px;
  /* background-color: #fff; */
  margin-left: 120px;
  line-height: 100px;
  font-size: 25px;
  font-weight: bold;
}
.descript{
  width: 100%;
  height: 60px;
  padding: 10px;
  /* background-color: pink; */
  border-radius: 15px;
}
.op {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content:space-around;
  /* background-color: green; */
}
.op button {
  display: block;
  height: 30px;
  font-size: 16px;
  border: 1px solid ;
}
.van-button__content{
  height: 30px;
}
/* 个人服务 */
.serves{
  width: 100vw;
  /* height: 300px; */
  margin-top: 10px;
  /* background-color: green; */
}
.serves .nav{
  width: 100vw;
  border-radius: 10px;
  overflow: hidden;
}
.serves .more{
  width: 100vw;
  margin-top: 10px;
}
.serves .more .all_see {
  width: 100%;
  height: 200px;
  background-color: #fff;
  border-radius: 15px;
}
.serves .ser {
  width: 100%;
  height: 160px;
  margin-top: 10px;
  /* background-color: green; */
}
.serves .share{
  width: 100vw;
  margin-top: 10px;
}
.serves .share .share_card{
  width: 100vw;
  height: 215px;
  margin-top: 10px;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 3px 3px 10px 5px #cfd4e0;
  /* background-color: pink; */
}
</style>