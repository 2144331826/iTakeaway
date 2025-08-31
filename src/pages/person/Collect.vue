<template>
  <div id="collect">
          <!-- 导航栏 -->
      <div>
          <van-nav-bar
              title="我的收藏"
              left-text="返回"
              left-arrow
              @click-left="onClickLeft"
          />
      </div>

      <div class="shop_card">
      <div  v-for="item in info" :key="item.id" style="margin-bottom: 15px;">
        <van-card
        :price=item.price
        :desc=item.description
        :title=item.thingname
        :thumb="`${base}/images/${item.picture}`"
        @click="getInformation(item)"
        >
        <template #tags>
          <van-tag plain type="danger">小吃</van-tag>
        </template>
        <template #footer>
          <span class="comment">"{{ item.comcount }}"条评论</span>
        </template>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script>
import requests from '@/api/api/request';
import config from '@/api/config';
export default {
    data(){
    return {
        base:config.baseURL,
        info:[]
    }
},
methods:{
    onClickLeft() {
        this.$router.push('/footer/person')
    }, 
    //商品详情
    getInformation(item){
        this.$router.push({ 
            path: '/detail', 
            query: { thisitem:item } 
        });
    },
    get_collect(){
        requests.get('/user/collect/getMyAll',
        {
          headers:{
            id:localStorage.getItem('USERID'),
            token:localStorage.getItem('TOKEN')
        }}
        )
        .then(response => {
          console.log(response.data);
          this.info=response.data
          localStorage.setItem('Collectshop', JSON.stringify(response.data));
        })
        .catch(error => {
          console.error(error)
        })
    },
    restoreCollect() {
      const cachedData = localStorage.getItem('Collectshop');
      this.info = JSON.parse(cachedData);
    }
},
created(){
  this.restoreCollect();
  this.get_collect()
}
}
</script>

<style scoped>
#collect{
    width: 100vw;
    padding-top: 46px;
}
#collect > div:first-child {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10; /* 确保导航栏在页面其他内容的上方 */
}
/* 商品卡片 */
.shop_card{
  width: 100vw;
  margin-top: 15px;
  border-radius: 15px 15px 0 0;
  overflow: hidden;
  margin-bottom: 55px;
  padding: 0 10px;
  /* background-color: pink; */
}
.shop_card .van-card{
  height: 180px;
  border-radius: 18px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.05);
  padding:25px 10px;
  font-size: 15px;
  /* background-color: green; */
}
.van-card__thumb {
  width: 130px;
  height: 130px;
}
.van-card__desc {
  line-height: 35px;
  max-height: 35px;
}
.van-card__title {
  font-size: 20px;
  line-height: 20px;
}
.van-card__price {
  font-size: 16px;
}
.shop_card .comment {
  font-size: 13px;
  color: #706c6c;
}
</style>