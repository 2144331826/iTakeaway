<template >
  <div id="start">
    <!-- logo -->
    <div class="logo">
      <img src="../assets/images/itakeaway.png" style="width: 100px;margin-top: -7px;"/>
      <span class="loc">南昌工程学院瑶湖校区</span>
    </div>
    <!-- 搜索模块 -->
    <div class="search">
      <form >
        <van-search
        placeholder="请输入搜索关键词"
        @focus="handleFocus"
        />
      </form>
    </div>
    <!-- 轮播图 -->
    <div class="images">
      <van-swipe class="my-swipe" indicator-color="white" :autoplay="3000" >
        <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 功能窗口 -->
    <div class="items">
      <router-link to="/footer/start"> 
        <span>
          <img src="../assets/images/food.png" style="width: 60px;height: 60px;">
          <!-- <van-icon name="bag" size="60px"/> -->
        </span>
        <i>美食外卖</i>
      </router-link>
      <router-link to="/footer/start">
        <span>
          <img src="../assets/images/shop.png" style="width: 60px;height: 60px;">
          <!-- <van-icon name="shopping-cart" size="60px"/> -->
        </span>
        <i>超市便利</i>
      </router-link>
      <router-link to="/footer/start">
        <span>
          <img src="../assets/images/fruits.png" style="width: 60px;height: 60px;">
          <!-- <van-icon name="point-gift" size="60px"/> -->
        </span>
        <i>水果鲜花</i>
      </router-link>
      <router-link to="/footer/start">
        <span>
          <img src="../assets/images/medicine.png" style="width: 60px;height: 60px;">
          <!-- <van-icon name="add" size="60px"/> -->
        </span>
        <i>买药</i>
      </router-link>
      <router-link to="/footer/start">
        <span>
          <img src="../assets/images/sweet.png" style="width: 60px;height: 60px;">
          <!-- <van-icon name="new" size="60px"/> -->
        </span>
        <i>甜品饮品</i>
      </router-link>
      <router-link to="/footer/start">
        <span>
          <img src="../assets/images/night.png" style="width: 60px;height: 60px;">
          <!-- <van-icon name="eye" size="60px"/> -->
        </span>
        <i>夜宵</i>
      </router-link>
      <router-link to="/footer/start">
        <span>
          <img src="../assets/images/discount.png" style="width: 60px;height: 60px;">
          <!-- <van-icon name="discount" size="60px"/> -->
        </span>
        <i>折扣</i>
      </router-link>
      <router-link to="/footer/start">
        <span>
          <img src="../assets/images/hot.png" style="width: 60px;height: 60px;">
          <!-- <van-icon name="youzan-shield" size="60px"/> -->
        </span>
        <i>人气推荐</i>
      </router-link>
      <router-link to="/footer/start">
        <span>
          <img src="../assets/images/gift.png" style="width: 60px;height: 60px;">
          <!-- <van-icon name="gift-card" size="60px"/> -->
        </span>
        <i>礼品礼物</i>
      </router-link>
      <router-link to="/footer/start">
        <span>
          <img src="../assets/images/vip.png" style="width: 60px;height: 60px;">
          <!-- <van-icon name="vip-card" size="60px"/> -->
        </span>
        <i>会员专属</i>
      </router-link>
    </div>
    <!-- 商品卡片 -->
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
          <van-tag plain type="danger">现炒</van-tag>
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
import requests from '@/api/api/request'
import config from '@/api/config' 
export default {
    // eslint-disable-next-line vue/multi-word-component-names
name:'',
data() {
   return {
      base:config.baseURL,
      query:{
          current:1,
          pagesize:100,
          count:0
      },
      info:[
        {  }
      ],
      images: [
        'https://picnew11.photophoto.cn/20170610/meishimeishihaibaohaibaosucaimeishiwenhuameishizhanbanxuanchuan-24592157_1.jpg',
        'https://img.zhisheji.com/lneDTOQyiYGiMmI2Favafii5lKyn?imageMogr2/quality/90/sharpen/1',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fa3f805b3-c171-4792-8ad8-5678448882ea%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1715450932&t=f5ee63ee4e962e44a783fa74196586b1'
      ],
      
    }
},
methods: {
  handleFocus() {
      this.$router.push('/searchinfo');
  },
  // 初始加载
  searchAll(){
        requests.get('/getAllSale', {
          params: {
            pagesize: this.query.pagesize,
            current: this.query.current
          },
        })
        .then(response => {
          // 将获取的数据保存到缓存
          console.log(response.data)
          localStorage.setItem('allSaleData', JSON.stringify(response.data));
          this.info = response.data;
          this.query.count = response.other;
        })
        .catch(error => {
          console.error(error)
        });
  },
  //商品详情
  getInformation(item){
      this.$router.push({ 
          path: '/detail', 
          query: { thisitem:item } 
      });
  },
  useCachedSearchResults() {
      const cachedResults = localStorage.getItem('allSaleData');  
      this.info = JSON.parse(cachedResults);
      this.query.count = this.info.length; // 假设返回的数据长度即为计数
   }
},
created(){
  this.searchAll();
  this.useCachedSearchResults();
}
}
</script>

<style scoped>
#start {
  width:100vw;
  padding-top: 30px;
  /* background-color: green; */
}
/* logo */
.logo{
  width: 100vw;
  height: 30px;
  position: fixed;
  top: 0;
  z-index: 10;
  background-color: #fff;
}
.loc{
  display: block;
  width: 150px;
  height: 30px;
  float: right;
  /* margin-right: 0; */
  font-size: 16px;
  line-height: 36px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* 搜索模块 */
.search{
  width: 100vw;
  height: 55px;
  margin-top: 5px;
  border-radius: 10px;
  /* background-color: pink; */
}
/* 轮播图 */
.images {
  width:100%;
  height: 250px;
  /* background-color: red; */
}
.my-swipe .van-swipe-item {
  width: 100%;
  color: #fff;
  font-size: 20px;
  line-height: 250px;
  height: 250px;
  text-align: center;
  /* background-color: #39a9ed; */
}
.my-swipe .van-swipe-item img {
  height: 250px;
  width: 100%;
}
/* 功能窗口 */
#start .items {
  width: 100%;
  height: 215px;
  /* background-color: blue; */
  border-radius:15px;
  box-shadow: 3px 3px 10px 5px rgb(226, 221, 221);
  padding-top: 15px;
}
#start .items a {
  float: left;
  display: block;
  width: 20%;
  height: 50%;
  /* line-height: 100%; */
  text-align: center;
}
#start .items a span {
  display: block;
}
/* 商品卡片 */
.shop_card{
  width: 100vw;
  margin-top: 15px;
  border-radius: 15px 15px 0 0;
  overflow: hidden;
  margin-bottom: 55px;
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
.shop_card .van-card__header > div > div > span {
  margin-left: 5px;
}
</style>