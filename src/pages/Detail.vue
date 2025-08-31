<template>
    <div id="information">
      <!-- 导航栏 -->
      <div>
          <van-nav-bar
              title="商品明细"
              left-text="返回"
              right-text="分享"
              left-arrow
              @click-left="onClickLeft"
              @click-right="showShare = true"
          />
      </div>
      <!-- 商品信息 -->
      <div class="detail">
          <span class="pic">
              <img :src="`${base}/images/${thing.picture}`">
          </span>
          <div class="word">
              <p style="font-size: 25px;color: red;font-weight: bold;">￥{{ thing.price }}</p><p style="float: right;color: #333;">已售300+</p>
              <span>{{ thing.thingname }}</span>
              <i>{{ thing.description }}</i>
              <div class="operater">
                    <button is-link @click="showPopup1" class="button">等待详情</button>
                    <van-popup v-model="show1" position="bottom" :style="{ height: '80%' }" class="see">
                        <div class="de">
                            <h4 style="font-size: 15px;">当前店家外卖订单进度:&nbsp;13 / 26</h4>
                            <el-progress :percentage="50" style="margin-top: 20px;"></el-progress>
                            <div class="sty">
                                <h2 style="font-size: 15px;">口味风格</h2>  
                                <e-charts :option="option1"></e-charts>
                            </div>
                        </div>
                        <div class="rate">
                          <h2 style="font-size: 15px;">商品评分</h2> 
                          <e-charts :option="option3"></e-charts>
                        </div>
                        <div class="sug" v-if="info.length">
                            <h2 style="font-size: 15px;">推荐类似商品</h2>
                            <e-charts :option="option2"></e-charts>
                        </div>
                        <div class="list" v-if="info.length">
                            <span class="tit">-类似商品-</span>
                            <div class="hot_list" >
                              <div  v-for="item in info" :key="item.id" style="margin-bottom: 15px;">
                                <van-card
                                :price=item.price
                                :desc=item.description
                                :title=item.thingname
                                :thumb="`${base}/images/${item.picture}`"
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
                    </van-popup>
                    <button is-link @click="showPopup2" class="button">加入购物车</button>
                    <van-popup v-model="show2" position="bottom" :style="{ height: '80%' }" class="see">
                        <div>
                          <van-card
                            :num=this.num
                            :price=this.thing.price
                            :desc=this.thing.description
                            :title=this.thing.thingname
                            :thumb="`${base}/images/${this.thing.picture}`"
                          >
                            <template #tags>
                              <van-tag plain type="danger">小吃</van-tag>
                              <van-tag plain type="danger">现炒</van-tag>
                            </template>
                          </van-card>
                          <van-field name="stepper" label="数量" style="width: 90%;float: left;">
                            <template #input>
                              <van-stepper v-model="num" min="1" />
                            </template>
                          </van-field>

                          <van-icon 
                          name="star" 
                          size="23" 
                          :class="{ 'icon-love': islove == 1, 'icon-demo': islove == 0 }" 
                          @click="add_love"/>

                          <div style="margin: 16px;height:50px">
                            <van-button round block type="info" @click="add_cart">加入购物车</van-button>
                          </div>
                        </div>
                    </van-popup>
              </div>
          </div>
      </div>
      <!-- 词云 -->
      <div v-if="cloudUrl" style="width: 100%;margin-top: 10px;box-sizing: border-box;border-radius: 10px;box-shadow: 0px 0px 1px #888888;">
        <div style="width: 100%;height: 30px;font-size: 16px;line-height: 30px;margin-top: 10px;text-align: center;box-sizing: border-box;">评论热词</div>
        <div style="width: 100%;height: 200px;box-sizing: border-box;border-radius: 10px">
            <img  :src="cloudUrl" id="image" style="width: 100%;height: 100%;border-radius: 10px;">
        </div>
      </div>
      <!-- 商品评论 -->
      <div class="comment" v-if="com_user">
          <div class="nav_">商品评论({{ comment.length }})</div>
          <div  v-for="item in comment" :key="item.id" class="comment_card" ref="commentCard">
                <div style="width: 100%;height: 40px;" v-if="com_user[item.userId]">
                  <span class="comment_avater" >
                    <img :src="`${base}/images/${com_user[item.userId].avatar}`" >
                  </span>
                  <div style="height:40px;line-height: 40px;font-size: 16px;padding: 0 60px;box-sizing: border-box;font-weight: 800;">{{ com_user[item.userId].nickname }}</div>
                </div>
                <span class="word" >
                    <i style="display:block;margin-top: 5px;box-sizing: border-box;">
                        <van-rate
                        v-model="value"
                        :size="20"
                        color="#ffd21e"
                        void-icon="star"
                        void-color="#eee"
                        readonly
                        />
                    </i>
                    <span class="value_">
                        {{  item.content}}
                    </span>
                </span>
                <span class="bot" >
                  <van-icon name="comment-o" size="20"/>&nbsp;回复&nbsp;&nbsp;
                  <van-icon name="share-o" size="20"/>&nbsp;分享&nbsp;&nbsp;
                  <van-icon name="like-o" size="20"/>&nbsp;{{ item.likeCount }}
                </span>
          </div>
      </div>

      <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
      />
    </div>
  </template>
  
  <script>
  import requests from '@/api/api/request'
  import config from '@/api/config' 
  export default {
  name:'',
  data(){
      return {
            base:config.baseURL,
            show: false,  
            value:3,
            islove:0,
            thing:'',
            show1: false,
            show2:false,
            info:'',
            comment:'',//评论
            com_user:{},//评论用户信息
            num: '',
            shopcarinfo:'',
            cloudUrl:'',

            showShare: false,
            options: [
              { name: '微信', icon: 'wechat' },
              { name: '微博', icon: 'weibo' },
              { name: '复制链接', icon: 'link' },
              { name: '分享海报', icon: 'poster' },
              { name: '二维码', icon: 'qrcode' },
            ],

            dataLength:0,
            option1 : {
                tooltip: {
                      trigger: 'item'
                      },
                legend: {
                      top: '5%',
                      left: 'center'
                      },
                series: [
                    {
                      name: 'Access From',
                      type: 'pie',
                      radius: ['40%', '70%'],
                      avoidLabelOverlap: false,
                      itemStyle: {
                          borderRadius: 10,
                          borderColor: '#fff',
                          borderWidth: 2
                        },
                label: {
                  show: false,
                  position: 'center'
                },
              emphasis: {
                  label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold'
                  }
              },
            labelLine: {
                show: false
                },
      data: [
        { value: 1048, name: '辣' },
        { value: 735, name: '酸' },
        { value: 580, name: '甜' },
        { value: 484, name: '苦' },
        { value: 300, name: '咸' }
      ]
    }
  ]
            },
            option2: {
                  polar: {
                      radius: [30, '80%']
                  },
                  radiusAxis: {
                       max: '5'
                  },
                  angleAxis: {
                    type: 'category',
                    data: [],
                    startAngle: 75,
                    axisLabel:{
                      show:true,
                      formatter: function (value) {
                        if (value.length > 5) {
                          return value.substring(0, 5) + '...';
                        } else {
                          return value;
                        }
                      }
                    }
                  },
                  tooltip: {},
                  series: {
                    type: 'bar',
                    data: [],
                    coordinateSystem: 'polar',
                    label: {
                      show: true,
                      position: 'middle',
                      formatter: function (param) {
                          // param.name 是标签名称，param.value 是标签值
                          var text = param.name + ': ' + param.value;
                          if (param.length > 6) {
                            return param.value;
                          } else {
                              if (text.length > 5) {
                              return text.substring(0, 8) + '...';
                            } else {
                              return text;
                            }
                          }
                          // return param.value;
                      },
                    }
                  },
                  animation: true
            },
            option3: {
              tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'cross',
                      crossStyle: {
                        color: '#999'
                      }
                    }
                },
                toolbox: {
                  feature: {
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                  }
                },
                xAxis: [
                  {
                    type: 'category',
                    data: ['1', '2', '3', '4', '5'],
                    axisPointer: {
                      type: 'shadow'
                    }
                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                    name: '数量',
                    min: 0,
                    max: 200,
                    interval: 40,
                  },
                  {
                    type: 'value',
                    name:'平均',
                    min: 0,
                    max: 200,
                    interval: 40,
                  }
                ],
                series: [
                  {
                    name: '人数',
                    type: 'bar',
                    data: [
                      87.0, 94.9, 194, 123.2, 25.6
                    ]
                  },
                  {
                    name: '人数',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [40.0, 50.9, 80, 60.2, 25.6]
                  }
                ]
            },
      }
  },
  methods:{
      onClickLeft() {
          // this.$router.push('/footer/start')
          this.$router.go(-1);
      },
      showPopup1() {
          this.show1 = true;
      },
      showPopup2() {
          this.show2 = true;
      },
      //分享
      onSelect(option) {
        this.$toast(option.name);
        this.showShare = false;
      },
      //推荐
      getrec(){
        // console.log(this.thing.id)
        const id=this.thing.id
        requests.post(`/recommend/${id}`)
        .then(response => {
          console.log(response.data);
          this.info=response.data
          this.info.forEach(item => {
            this.option2.angleAxis.data.push(item.thingname);
            this.option2.series.data.push(item.ratevale)
          });
          // console.log(this.option2.angleAxis.data)
        })
        .catch(error => {
          console.error(error)
        })
      },
      //收藏
      add_love(){
        const id=this.thing.id
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
        if (this.islove == 1) {
          requests.post(`/user/collect/delete/${id}`,
            JSON.stringify(data), 
            { headers: headers })
            .then(response => {
              console.log(response);
              this.islove = 0; 
              this.$toast('已取消收藏');
            })
            .catch(error => {
              console.error(error);
              this.$toast('取消收藏失败');
            });
        }if(this.islove==0){
            requests.post(`/user/collect/add/${id}`,
              JSON.stringify(data), 
              { headers: headers })
              .then(response => {
                console.log(response);
                this.islove=1
                this.$toast('收藏成功');
              })
              .catch(error => {
                console.error(error)
                this.$toast('操作失败')
              })
          }
      },
      //加入购物车
      add_cart(){
        const userId = localStorage.getItem('USERID');
        const token = localStorage.getItem('TOKEN');
        const headers = {
          'id': userId,
          'token': token,
        };
        requests.post('/user/shoppingCart/insert',
        {
          productId: this.thing.id,
          quantity: this.num
        },
        { headers: headers })
        .then(response => {
          console.log(response);
          if(response.code==666){
            this.$toast('添加成功');
          }
          if(response.code==1014){
              this.update_cart()
          }
        })
        .catch(error => {
          console.error(error)
        })
      },
      //更新购物车
      update_cart(){
        const params = {
          proId: this.thing.id,
          count: this.num
        };
        requests.put('/user/shoppingCart/updateByproId',
        { },
        {
            params: params  ,
            headers:{
            id:localStorage.getItem('USERID'),
            token:localStorage.getItem('TOKEN')
            }
        })
        .then(response => {
          console.log(response);
          if(response.code==666){
            this.$toast("更新购物车成功!");
          }
          if(response.code==444){
            this.$toast("更新失败")
          }
        })
        .catch(error => {
          console.error(error)
          this.$toast("更新失败!")
        })
      },
      //是否收藏
      is_love(){
        const id=this.thing.id
        const userId = localStorage.getItem('USERID');
        const token = localStorage.getItem('TOKEN');
        const headers = {
          'id': userId,
          'token': token,
        };
        requests.get(`/user/collect/IsFavorited/${id}`,
        { headers: headers })
        .then(response => {
          console.log(response.data.Favorited);
          if(response.data.Favorited==true){
            this.islove=1
          }
          if(response.data.Favorited==false){
            this.islove=0
          }
          // console.log(this.islove)
        })
        .catch(error => {
          console.error(error)
        })
      },
      //是否加入购物车
      is_cart(){
        const id=this.thing.id
        const userId = localStorage.getItem('USERID');
        const token = localStorage.getItem('TOKEN');
        const headers = {
          'id': userId,
          'token': token,
        };
        requests.get(`/user/shoppingCart/IsExist/${id}`,
        { headers: headers })
        .then(response => {
          console.log(response);
          if(response.code==666){
            if(response.data.Favorited==true){
            this.num=response.data.count
          }
          }
          // console.log(this.islove)
        })
        .catch(error => {
          console.error(error)
        })
      },
      //获取评论
      get_comment(){
        const id=this.thing.id
        const userId = localStorage.getItem('USERID');
        const token = localStorage.getItem('TOKEN');
        const headers = {
          'id': userId,
          'token': token,
        };
        requests.get(`/user/comment/getByProductId/${id}`,
        { headers: headers })
        .then(response => {
          console.log(response);
          this.comment=response.data
          localStorage.setItem('PRO_COMinfo',JSON.stringify(response.data))
        })
        .catch(error => {
          console.error(error)
        })
      },
      //load_com
      load_comm(){
        const COM=localStorage.getItem('PRO_COMinfo')
        if(COM){
          this.comment=JSON.parse(COM)
        }
      },
      getUserInfo(){
        this.comment.forEach((item) => {
          const userId = item.userId;
            requests.get(`/getInfoById/${userId}`)
              .then((response) => {
                this.$set(this.com_user, userId, response.data);
              })
              .catch((error) => {
                console.error(error);
              });
        });
      },
      get_url(){
        const id=this.thing.id
        fetch(`http://model.etakeaway.shop:8000/v1/com/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.blob(); // 将响应转换为 Blob 对象
                })
                .then(blob => {
                    const imageUrl = URL.createObjectURL(blob); // 创建一个指向 Blob 的 URL
                    localStorage.setItem(`cloudImageUrl_${id}`,imageUrl)
                    // const image = document.getElementById('image');
                    // image.src = imageUrl;
                    this.cloudUrl=imageUrl
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
      },
      load_CiYun() {
        const id = this.thing.id; 
        const cachedImageUrl = localStorage.getItem(`cloudImageUrl_${id}`);
        if (cachedImageUrl) {
          this.cloudUrl = cachedImageUrl;
        } else {
          this.get_url();
        }
      }
  },
 created() {
    this.thing = this.$route.query.thisitem;
    console.log(this.thing)
    this.getrec();
    this.is_love();
    this.is_cart();
    this.get_comment();
    this.load_comm();
    this.getUserInfo();
    this.get_url();
    this.load_CiYun();
},
mounted() {
    
  },
}
  </script>
  
  <style scoped>
  #information {
      width: 100%;
      padding-top: 46px;
  }
  #information > div:first-child{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10; 
  }
  /* 商品信息 */
  #information .detail .pic {
      width: 100%;
      display: block;
      /* background-color: red; */
      height: 300px;
  }
  #information .detail .pic img {
      width: 100%;
      height: 100%;
  }
  #information .detail .word {
      width: 100%;
      height: 200px;
      /* background-color: blue; */
      border-radius:15px;
      box-shadow: 3px 3px 10px 5px rgb(226, 221, 221);
      padding: 15px;
  }
  #information .detail .word .operater {
    width: 100%;
    height: 48px;
    margin-top: 5px;
    display: flex;
    justify-content:space-around;
    padding: 4px;
    /* background-color: pink; */
  }
  #information .detail .word .operater .button {
    display: block;
    width: 100px;
    height: 40px;
    border-radius: 18px;
    background-color: rgba(214, 234, 234, 0.5) ;
  }
  #information .detail .word tit{
      /* display: block; */
      font-size: 20px;
      width: 100%;
      height: 30px;
  }
  #information .detail .word i{
      display: block;
      font-size: 18px;
      width: 100%;
      height: 50px;
      margin-top: 10px;
      font-style: normal;
  }
  
.icon-love {
  color: #ffd21e; 
}
.icon-demo {
  color: gray; 
}
#information > div.detail > div > div > div.see.van-popup.van-popup--bottom > div > i{
  width: 23px;
  height: 23px;
  float: right;
}

  /* 商品评论 */
  #information .comment {
      width: 100%;
      margin-top: 10px;
      border-radius: 15px 15px 0 0;
      overflow: hidden;
      margin-bottom: 5px;
      /* background-color: #c2bfbf; */
  }
  #information .comment .nav_ {
      width: 100%;
      height:40px;
      line-height: 40px;
      font-size: 19px;
      padding-left: 20px;
      background-color: #c2bfbf;
  }
  #information .comment .comment_card {
    width: 100%;
    /* background-color: green; */
    /* height: 150px; */
    padding: 15px;
    box-sizing: border-box;
    margin-top: 15px;
    border-radius: 40px;
    background-color: rgb(201 228 202 / 30%);
    overflow: hidden;
  }
  #information .comment .comment_card .comment_avater {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    position: absolute;
    /* background-color: pink; */
  }
  #information .comment .comment_card .comment_avater img {
    width: 100%;
    overflow: hidden;
    border-radius: 20px;
  }
  #information .comment .comment_card .word {
    display: block;
    position: relative;
    width: 100%;
  }
  #information .comment .comment_card .word .value_ {
    display: block;
    width: 100%;
    margin-top: 10px;
    font-size: 16px;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .bot{
    width: 100%;
    height: 30px;
    display: block;
    line-height: 30px;
    font-size: 14px;
    padding: 5px;
    box-sizing: border-box;
    /* background-color: pink; */
  }
/* 可视化 */
.see {
  width:100%;
  /* background-color: purple; */
  padding:15px;
}
.see .de {
  height:380px;
  /* background-color: yellow; */
}
.see .de .sty {
    height: 280px;
    margin-top: 30px;
    /* background-color: green; */
}
.see .rate{
  height: 300px;
  /* background: green; */
}
.see .sug {
  height:300px;
  /* background-color: pink; */
}

#information .list {
  width: 100%;
  /* height: 300px; */
  /* background-color: #4CAF50; */
}
#information .list .tit {
  width: 100%;
  display: block;
  height: 30px;
  /* background-color: pink; */
  font-size: 18px;
  margin-top: 20px;
  text-align: center;
}
#information .list .hot_list {
  width: 100%;
  margin-top: 20px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  opacity: 0.9;
}

/* 商品卡片 */
.hot_list .van-card{
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
 .comment {
  font-size: 13px;
  color: #706c6c;
}
.van-card__header > div > div > span {
  margin-left: 5px;
}
.van-button{
  height: 50px;
}
.van-button__content{
  height: 50px;
}
  </style>