<template>
  <div id="choose">
    <div class="random">
      <div id="app">
        <h1 style="box-sizing: border-box;margin: 0;padding: 10px;"><van-icon name="bell" /> 今天吃什么</h1>
        <van-stepper v-model="menuCount" theme="round" button-size="30" disable-input min="1" max="10" 
        @plus="increaseCount" @minus="decreaseCount" />
        <button @click="generateMenu"><van-icon name="replay" />  随机一下</button>
        <div class="menu-container">
          <ul>
            <li v-for="(item, index) in menuItems" :key="index">
              <img v-if="Math.random() > 0.5" :src="randomIconImage()" style="height:17px;">
              {{ item }}
              <img v-if="Math.random() > 0.5" :src="randomIconImage()" style="height:17px;">
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- hot -->
    <div class="hot_ad">
        <span>-今日热门-</span>
        <div class="hot_card">
          <van-swipe class="my-swipe" indicator-color="white" :autoplay="2000" >
            <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" />
            </van-swipe-item>
            </van-swipe>
        </div>
    </div>
    <div class="list">
        <span class="tit">-热门排行榜-</span>
        <div class="hot_list" >
          <div  v-for="(item,index) in list" :key="index" style="margin-bottom: 15px;position: relative; " class="card-item">
            <van-card
            :price=item.price
            :desc=item.description
            :title=item.thingname
            :thumb="`${base}/images/${item.picture}`"
            class="custom-card"
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
  </div>
</template>

<script>
import requests from '@/api/api/request'
import config from '@/api/config' 
export default {
  data() {
    return {
      base:config.baseURL,
      prizes: [], // 奖品名称列表
      images: [
        'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0311%2F51161bdej00sa6f9b006ud200u0014lg00u0014l.jpg&thumbnail=660x2147483647&quality=80&type=jpg',
        'https://img.zhisheji.com/lneDTOQyiYGiMmI2Favafii5lKyn?imageMogr2/quality/90/sharpen/1',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fa3f805b3-c171-4792-8ad8-5678448882ea%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1715450932&t=f5ee63ee4e962e44a783fa74196586b1'
      ],
      list: [],//商品列表
      query:{
          current:2,
          pagesize:10,
          count:0
      },

      menuItems: [],
      menuCount: 5,

      iconImages: [
      'https://img2.baidu.com/it/u=2254429453,676064780&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500',
      'https://img0.baidu.com/it/u=684801472,3214144403&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500',
      'https://img2.baidu.com/it/u=772332456,2676674639&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500',
      'https://pic.616pic.com/ys_bnew_img/00/46/74/guW3NrXFig.jpg',
      'https://img2.baidu.com/it/u=514535647,267621828&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      'https://img0.baidu.com/it/u=3515427398,2911986566&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      'https://img1.baidu.com/it/u=2284485967,3374575330&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=501',
      'https://img0.baidu.com/it/u=1341152829,4281174680&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      'https://hbimg.b0.upaiyun.com/8c17c6b70771c6d3ad379890eac0bad00f7f966df17a-USmebw_fw658',

      ],
    };
  },
  methods: {
    initializeMenuItems() {
      const count = Math.min(this.menuCount, this.prizes.length);
      const init=localStorage.getItem('InitPrize')
      this.menuItems=JSON.parse(init).slice(0,count)
    },
    generateMenu() {
      const dishes = this.prizes;
      this.menuItems = dishes.sort(() => Math.random() - 0.5).slice(0, this.menuCount);
    },
    decreaseCount() {
      if (this.menuCount > 1) {
        this.menuCount--;
        this.generateMenu();
      }
    },
    increaseCount() {
        this.menuCount++;
        this.generateMenu();
    },
    randomIconImage() {
      const randomIndex = Math.floor(Math.random() * this.iconImages.length);
      return this.iconImages[randomIndex];
    },
     // 排行榜
    searchAll(){
        requests.get('/getAllSale',{
        params: {
          pagesize:10,
          current:this.query.current
        },
    })
    .then(response => {
        console.log(response.data);
        this.list=response.data
        localStorage.setItem('HotList', JSON.stringify(response.data));
        this.query.count=response.other
        this.list.forEach(item => {
          this.prizes.push(item.thingname);
        });
        localStorage.setItem('InitPrize',JSON.stringify(this.prizes))
        this.initializeMenuItems();
      })
      .catch(error => {
        console.error(error)
      })
    },
    getLocalStorage() {
      const HotList = localStorage.getItem('HotList');
      this.list = JSON.parse(HotList);
    },
  },
  created(){
    this.getLocalStorage();
    this.searchAll();
    this.initializeMenuItems();
    this.randomIconImage()
  },
  mounted(){
    this.generateMenu();
  }
};
</script>

<style scoped>
#choose {
  width: 100vw;
  /* background-image: url(../assets//images/bgc.jpg); */
  background-image: linear-gradient(200deg,#fffffe, #d3f8d9,#fffffe);
  /* background-color: pink; */
}
.random{
  width: 100%;
  /* background-color: green; */
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.menu-container {
  margin: 25px 0;
  box-sizing: border-box;
  padding: 0 66px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  font-size: 16px;
  box-sizing: border-box;
  background-color: #e3f6f5; 
  margin-bottom: 12px; 
  padding: 5px; 
  line-height: 30px;
  box-shadow: 0 2px 4px rgba(62, 144, 66, 0.1); 
  border-radius: 10px; 
  transition: all 0.3s ease; 
  border: 1px solid #bae8e8;
  height: 40px;
  box-sizing: border-box;
  color: #078080;
}

button {
  margin-top: 20px;
  border-radius: 10px;
  background-color: #d3f8d9;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
/* hot */
#choose .hot_ad {
  margin-top: 10px;
  width: 100%;
  margin-bottom: 10px;
  /* height: 280px; */
  /* background-color: green; */
}
#choose .hot_ad span {
  width: 100%;
  display: block;
  height: 30px;
  /* background-color: pink; */
  font-size: 18px;
  text-align: center;
}
#choose .hot_ad .hot_card {
  width: 100%;
  height: 250px;
  border-radius: 50px;
  overflow: hidden;
  margin-top: 10px;
  /* background-color: pink; */
}
.my-swipe .van-swipe-item {
  width: 100%;
  color: #fff;
  font-size: 20px;
  line-height: 250px;
  height: 250px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #39a9ed; */
}
.my-swipe .van-swipe-item img {
  /* height: 100%; */
  width: 100%;
}
/* 排名 */

#choose .list {
  width: 100%;
  padding-bottom: 44px;
  /* height: 300px; */
  /* background-color: #4CAF50; */
}
#choose .list .tit {
  width: 100%;
  display: block;
  height: 30px;
  /* background-color: pink; */
  font-size: 18px;
  text-align: center;
}
#choose .list .hot_list {
  width: 100%;
  margin-top: 20px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  opacity: 0.9;
}

/* 商品卡片 */
.list .hot_list .custom-card {
  background-image: var(--card-bg-url);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

/* 动态设置背景图片 */
.list .hot_list .card-item:nth-child(1) .custom-card {
  --card-bg-url: url('../assets/images/1.jpg');
}
.list .hot_list .card-item:nth-child(2) .custom-card {
  --card-bg-url: url('../assets/images/2.jpg');
}
.list .hot_list .card-item:nth-child(3) .custom-card {
  --card-bg-url: url('../assets/images/3.jpg');
}
.list .hot_list .card-item:nth-child(4) .custom-card {
  --card-bg-url: url('../assets/images/4.jpg');
}
.list .hot_list .card-item:nth-child(5) .custom-card {
  --card-bg-url: url('../assets/images/5.jpg');
}
.list .hot_list .card-item:nth-child(6) .custom-card {
  --card-bg-url: url('../assets/images/6.jpg');
}
.list .hot_list .card-item:nth-child(7) .custom-card {
  --card-bg-url: url('../assets/images/7.jpg');
}
.list .hot_list .card-item:nth-child(8) .custom-card {
  --card-bg-url: url('../assets/images/8.jpg');
}
.list .hot_list .card-item:nth-child(9) .custom-card {
  --card-bg-url: url('../assets/images/9.jpg');
}
.list .hot_list .card-item:nth-child(10) .custom-card {
  --card-bg-url: url('../assets/images/10.jpg');
}

.hot_list .van-card{
  height: 180px;
  border-radius: 18px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.05);
  padding:25px 10px;
  font-size: 15px;
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
