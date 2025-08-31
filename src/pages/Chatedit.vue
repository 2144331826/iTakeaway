<template>
  <div id="chatedit">
    <van-nav-bar
              title="编辑"
              left-text="返回"
              left-arrow
              @click-left="onClickLeft"
              />


    
    <van-cell is-link @click="showPopup">清空聊天记录</van-cell>
    <!-- <van-popup v-model="show" position="bottom" :style="{ height: '30%' }"> -->
       
            <van-action-sheet
            v-model="show"
            :actions="actions"
            cancel-text="取消"
            close-on-click-action
            @cancel="onCancel"
            @select="onSelect"
            />
        
    <!-- </van-popup> -->
  </div>
</template>

<script>
export default {
data(){
    return{
        dialog:'',
        show: false,
        actions: [{ name: '清空所有聊天记录' }],
    }
},
methods:{
    onClickLeft() {
        this.$router.push('/chat')
    },
    onCancel() {
      Toast('取消');
    },
    showPopup() {
      this.show = true;
    },
    onSelect(item) {
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false; // 关闭操作菜单
      this.dialog=""
      this.saveDialogs()
      this.$message.success("清空成功!")
      console.log(item.name)
    },
    saveDialogs() {
      localStorage.setItem('dialogs', JSON.stringify(this.dialogs));
    },
},
created() {
    this.dialog = this.$route.query.thisitem;
    // this.thingprice=this.$route.query.price;
    // this.thingimage=this.$route.query.image;
    console.log(this.dialog)
  }
}
</script>

<style scoped>
#chatedit {
    width: 100vw;
    height: 100vh;
}
.clear {
    width: 300px;
    height: 33px;
    /* background-color: green; */
    border-radius: 20px;
    overflow: hidden;
}
.clear .info {
    width: 100%;
    height: 33px;
    font-size: 20px;
    padding: 0 auto;
}
</style>