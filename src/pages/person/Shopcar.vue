<template>
  <div id="shopcar">
        <!-- 导航栏 -->
      <div>
          <van-nav-bar
              title="我的购物车"
              left-text="返回"
              left-arrow
              @click-left="onClickLeft"
          />
      </div>

      <div class="shop_card">
          <div  v-for="(item, index)  in info.productInfos" :key="item.id" style="margin-bottom: 15px;" class="card-container">
            <van-swipe-cell>
              <van-card
              :num="info.shopcartItem[index].quantity"
              :price=item.price
              :desc=item.description
              :title=item.thingname
              :thumb="`${base}/images/${item.picture}`"
              @click="getInformation(item)"
              class="van-card"
              >
              <template #tags>
                <van-tag plain type="danger">小吃</van-tag>
              </template>
              <template #footer>
                <span class="comment">"{{ item.comcount }}"条评论</span>
              </template>
              </van-card>

              <div class="check">
                  <van-icon 
                  name="checked" 
                  size="30"
                  :class="{ 'active': info.shopcartItem[index].isChecked == true, 'deactive':info.shopcartItem[index].isChecked== false }" 
                  @click="selectItem(index)"/>
              </div>

              <template #right>
                <van-button square text="删除" type="danger" class="delete-button" @click="del_shop(index)"/>
              </template>
            </van-swipe-cell>
          </div>
      </div>

      <div class="send">
        <van-submit-bar :price="calculateTotal()"  button-text="提交订单">
            <van-icon 
                  name="checked" 
                  size="30"
                  v-model="checked"
                  :class="{ 'active': checked == true, 'deactive':checked== false }" 
                  @click="selectAll">
            </van-icon>全选
        </van-submit-bar>
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
        info:[],
        radio:'',
        checked: false,
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
    get_cart(){
        requests.get('/user/shoppingCart/getByCurrentUserId',
        {
          headers:{
            id:localStorage.getItem('USERID'),
            token:localStorage.getItem('TOKEN')
        }}
        )
        .then(response => {
          console.log(response.data);
          this.info=response.data
          // console.log(this.info.productInfos)
          localStorage.setItem('ShopCar', JSON.stringify(response.data));
        })
        .catch(error => {
          console.error(error)
        })
    },
    restoreCart() {
      const cachedData = localStorage.getItem('ShopCar');
      if(cachedData){
        this.info = JSON.parse(cachedData);
      }
    },
    del_shop(index){
      const id=this.info.shopcartItem[index].id
      requests.post(`/user/shoppingCart/delete/${id}`,
        {
            id:id
        },
        {
          headers:{
            id:localStorage.getItem('USERID'),
            token:localStorage.getItem('TOKEN')
        }}
        )
        .then(response => {
          console.log(response);
          this.$toast('删除成功')
          this.get_cart()
        })
        .catch(error => {
          console.error(error)
        })
    },
    selectAll() {
      this.checked = !(this.checked);
      if(this.info&&this.info.shopcartItem){
        this.info.shopcartItem.forEach((item,index) => {
        item.isChecked = this.checked;
        this.update_cart(index)
        });
      }
    },
    selectItem(index) {
      this.info.shopcartItem[index].isChecked = !this.info.shopcartItem[index].isChecked; 
      this.checkAllSelected()
      this.update_cart(index)
    },
    checkAllSelected() {
      const allSelected = this.info.shopcartItem.every(item => item.isChecked);
      this.checked = allSelected;
    },
    calculateTotal() {
      let total = 0;
      if(this.info&&this.info.shopcartItem){
        this.info.shopcartItem.forEach((item,index) => {
        if (item.isChecked) {
          total += (this.info.productInfos[index].price)*item.quantity;
          }
        });
      }
      // console.log(total)
      return total*100;
    },
    update_cart(index){
      const userId = localStorage.getItem('USERID');
        const token = localStorage.getItem('TOKEN');
        const headers = {
          'id': userId,
          'token': token,
        };
        requests.put('/user/shoppingCart/update',
        {
            productId: this.info.productInfos[index].id,
            id:this.info.shopcartItem[index].id,
            isChecked:this.info.shopcartItem[index].isChecked,
            userId:localStorage.getItem('USERID'),
            quantity:this.info.shopcartItem[index].quantity,
        },
        { headers: headers })
        .then(response => {
          console.log(response);
          this.get_cart()
        })
        .catch(error => {
          console.error(error)
        })
    }
},
created(){
  this.get_cart()
  this.restoreCart();
},
}
</script>

<style scoped>
#shopcar{
    width: 100vw;
}
/* 商品卡片 */
.shop_card{
  width: 100vw;
  margin-top: 15px;
  border-radius: 15px 15px 0 0;
  overflow: hidden;
  margin-bottom: 55px;
  height: 88vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 10px;
  /* background-color: pink; */
}
.card-container {
  display: flex; 
  align-items: center; 
  width: 100%; 
  border-radius:18px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  /* position: relative;  */
}
.shop_card .van-card{
  width: 100vw;
  height: 180px;
  border-radius: 18px 0 0 18px;
  padding:25px 60px 25px 10px;
  font-size: 15px;
  float: left;
  /* background-color: green; */
}
.delete-button {
    height: 180px;
    border: none;
    margin: 2px;
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
/* check */
.check{
  width: 50px;
  height: 180px;
  float: right;
  margin-top: -180px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0  18px 18px 0;
  background-color: #fafafa;
}
.check .active{
  color: red;
}
.check .deactive{
  color: grey;
  opacity: 0.7;
}
/* send */
.send{
  width: 100vw;
  height: 50px;
  position: fixed;
}
.van-button__content{
  height: 40px;
}
.send .active{
  color: red;
}
.send .deactive{
  color: grey;
  opacity: 0.7;
}
</style>