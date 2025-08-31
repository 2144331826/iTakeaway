<template>
  <div id="searchinfo">
    <!-- 导航栏 -->
    <div>
          <van-nav-bar
              title="搜索详情"
              left-text="返回"
              left-arrow
              @click-left="onClickLeft"
          />
      </div>
    <!-- 搜索模块 -->
    <div class="search">
      <form >
        <van-search
        v-model="search_value"
        shape="round"
        background="transparent"
        autofocus="true"
        placeholder="请输入搜索关键词"
        @search="search"
        @focus="onFocus"
        @blur="onBlur"
        />
      </form>
    </div>
    <!-- 热门搜索推荐 -->
    <div v-if="isFocused && search_value === ''" class="hot-searches">
      <span class="hot" v-if="searchHistory&&searchHistory.length">搜索历史</span>
        <div class="hotlist" >
            <div class="hot-search"  v-for="history in searchHistory" :key="history.index">
                <van-tag v-if="show" plain closeable size="small" type="primary" @close="close(history.index)">
                      {{ history }}
                </van-tag>
            </div>
        </div>

        <span class="hot" style="margin-top: 10px;">热门搜索</span>
        <div class="hotlist">
            <div class="hot-search" v-for="(hotSearch, index) in hotSearches" :key="index">
                <van-tag>{{ hotSearch }}</van-tag>
            </div>
        </div>
    </div>
    <!-- 商品列表 -->
    <div v-else class="shop_card">
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
import requests from '@/api/api/request'
import config from '@/api/config'
export default {
 data(){
    return {
        base:config.baseURL,
        search_value: '',
        isFocused: true,
        show: true,
        hotSearches: ['美食', '水果', '超市', '鲜花', '外卖','美食', '水果', '超市', '鲜花'],
        searchHistory: [],
        info:[],
        query:{
          current:1,
          pagesize:100,
          count:0
        },
    }
},
methods:{
    onClickLeft() {
        this.$router.push('/footer/start')
    }, 
    // 搜索
  search() {
      const value=this.search_value;
      let search_history=[];
      requests.get('/search', {
        params: {
          keyword: this.search_value,
          pagesize:this.query.pagesize,
          current:1
        },
      })
      .then(response => {
        // 在这里处理搜索结果
        console.log(response.data)
        // console.log(response)
        this.info=response.data
        this.query.count=response.other
        localStorage.setItem('searchResults', JSON.stringify(this.info));

        if(this.searchHistory==""){
          search_history.unshift(value)
          this.searchHistory=search_history
        }else{
          this.searchHistory.unshift(value)
        }
        console.log(this.searchHistory)
        localStorage.setItem('SearchHistory',JSON.stringify(this.searchHistory))
      })
      .catch(error => {
        // 在这里处理错误
        console.error(error)
      })
  },
  loadHistoryResults() {
      const cachedResults = localStorage.getItem('SearchHistory');
      this.searchHistory = JSON.parse(cachedResults);
    },
  loadSearchResults() {
      const cachedResults = localStorage.getItem('searchResults');
      this.info = JSON.parse(cachedResults);
    },
  onFocus() {
      this.isFocused = true;
      this.search_value = ''; // 清空搜索框
    },
  onBlur() {
      this.isFocused = false;
   },
   getInformation(item){
      this.$router.push({ 
          path: '/detail', 
          query: { thisitem:item } 
      });
  },
  close(index) {
      this.searchHistory.splice(index, 1);
      console.log(this.searchHistory)
      localStorage.setItem('SearchHistory',JSON.stringify(this.searchHistory))
    },
},
mounted() {
    this.loadSearchResults();
    this.loadHistoryResults();
  }
}
</script>

<style scoped>
#searchinfo{
    width: 100vw;
    /* padding-top: 30px; */
}

/* 搜索模块 */
.search{
  width: 100vw;
  height: 55px;
  margin-top: 5px;
  border-radius: 10px;
  /* background-color: pink; */
}
.hot-searches{
    width: 100%;
    padding: 0 20px;
    /* background-color: green; */
}
.hot-searches .hot{
    display: block;
}
.hotlist{
    display: flex;
    flex-wrap: wrap; 
    justify-content: flex-start;
}
#searchinfo > div.hot-searches > div > div{
  margin-left: 9px;
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
</style>