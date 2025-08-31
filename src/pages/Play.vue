<template>
  <div id="play">
      <!-- 数据总览 -->
      <div class="today">
          <h2>数据总览</h2>
          <div class="all">
            <e-charts class="chart" :option="option" />
          </div>
      </div>
      <div style="width: 100%;height: 80px;box-sizing: border-box;margin-top: 5px;display: flex;justify-content: space-around;">
        <van-button round type="primary" @click="go_plan">定制计划</van-button>
        <van-button round type="primary" >我的计划</van-button>
        <van-button round type="primary" @click="go_test">健康跟踪</van-button>
        <van-button round type="primary" >我的菜谱</van-button>
      </div>
      <!-- 营养摄入 -->
      <div class="nu">
          <span>营养摄入分析</span>
          <div class="nu_chart">
            <e-charts :option="option1"></e-charts>
          </div>
      </div>
      <!-- 建议 -->
      <van-notice-bar
      left-icon="volume-o"
      text="您今日的营养摄入很均衡！"
      />
      <div class="advice">
          <span class="jianyi">-饮食小建议-</span>
          <div class="ad_card">
            <van-card
            price="12"
            desc="富含丰富的营养物质"
            title="营养套餐"
            thumb="https://img0.baidu.com/it/u=3985139114,273870070&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            >
            <template #tags>
              <van-tag plain type="danger">小吃</van-tag>
              <van-tag plain type="danger">现做</van-tag>
            </template>
            <template #footer>
              <span class="comment">"3572647"条评论</span>
            </template>
            </van-card>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name:'',
  data(){
    return {
      option : {
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
              saveAsImage: { show: true }
            }
          },
          xAxis: [
            {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '营养摄入分值',
              min: 0,
              max: 100,
              interval: 20,
              axisLabel: {
                formatter: '{value}分'
              }
            },
            {
              type: 'value',
              name: '点餐频率',
              min: 0,
              max: 25,
              interval: 5,
              axisLabel: {
                formatter: '{value} 次'
              }
            }
          ],
          series: [
            {
              name: '营养摄入分值',
              type: 'bar',
              tooltip: {
                valueFormatter: function (value) {
                  return value + '分';
                }
              },
              data: [
                92.0, 94.9, 87.0, 79.2, 95.6, 76.7, 59.6
              ]
            },
            {
              name: '点餐频率',
              type: 'line',
              yAxisIndex: 1,
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' 次';
                }
              },
              data: [4, 2, 3, 4, 6, 2, 1]
            }
          ]
      },
      option1:  {
        tooltip: {
            trigger: 'item'
            },
        legend: {
            orient: 'vertical',
            left: 'right',
            itemWidth:20
            },
        series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: [
                  { value: 1048, name: '蛋白质' },
                  { value: 735, name: '碳水化合物' },
                  { value: 580, name: '脂肪' },
                  { value: 484, name: '维生素' },
                  { value: 300, name: '矿物质' }
                  ],
              emphasis: {
                  itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
        ]
      },
    }
  },
  methods:{
    go_plan(){
      this.$router.push('/plan')
    },
    go_test(){
      this.$router.push('/test')
    }
  }
}
</script>

<style scoped>
#play {
  width: 100vw;
  height: 91vh;
}
/* 数据总览 */
#play .today {
  width: 100%;
  height: 350px;
  box-sizing: border-box;
  /* display: flex;
  justify-content: center; */
  /* background-color: green; */
}
#play .today h2 {
  width: 100%;
  height: 30px;
  margin-top: 20px;
  text-align: center;
}
#play .today .all {
  width: 100vw;
  height: 300px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  padding: 0 5px;
  /* background-color: pink; */
}
/* 营养摄入 */
#play .nu span {
  display: block;
  width: 100%;
  height: 30px;
  font-size: 18px;
  padding: 0 15px;
  font-weight: 800;
  color: rgb(71, 79, 79);
  /* background-color: pink; */
}
#play .nu .nu_chart {
  width: 100%;
  height: 250px;
  margin-top: 10px;
  /* background-color: pink; */
}
/* 建议 */
#play .advice {
  width: 100%;
  height: 200px;
  margin-top: 10px;
  /* background-color: pink; */
}
#play .advice .jianyi {
  display: block;
  width: 100%;
  height: 30px;
  /* background-color: green; */
  text-align: center;
  font-size: 18px;
}
#play .advice .ad_card {
  width: 100%;
  height: 100%;
  padding: 10px;
  /* background-color: green; */
}
/* 商品卡片 */
.ad_card .van-card{
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
.ad_card .comment {
  font-size: 13px;
  color: #706c6c;
}
.ad_card .van-card__header > div > div > span {
  margin-left: 5px;
}
</style>