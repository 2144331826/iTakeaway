<template> 
<div class="footer">
     <!-- 路由组件跳转 -->
    <router-view ></router-view>
    <div class="footer-seat">
        <div class="footer-list">
            <ul>
            <li>
                <router-link to="/footer/start">
                    <van-icon name="location-o" size="30" />
                    <span>首页</span>
                </router-link>
                
            </li>
            <li>
                <router-link to="/footer/play">
                    <van-icon name="fire-o" size="30" />
                    <span>Play</span>
                </router-link>
            </li>
            <li>
                <router-link to="/footer/choose">
                    <van-icon name="certificate" size="30" />
                    <span>吃什么</span>
                </router-link>
            </li>
            <li>
                <router-link to="/footer/message">
                    <van-icon name="chat-o" size="30" />
                    <span>信息</span>
                </router-link>
            </li>
            <li>
                <router-link to="/footer/person">
                    <van-icon name="user-circle-o" size="30" />
                    <span>我的</span>
                </router-link>
            </li>
            </ul>
        </div>
    </div>   
</div>
</template>

<script>
export default {
name:'',
}
</script>

<style scoped>
.footer {
    width: 100vw;
}
a {
    color: inherit;
    text-decoration: none;
}
.footer-seat {
    position:fixed;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: #fff;
    border-top: 1px solid #e5e5e5;
}
.footer-list {
    width: 100%;
    height: 60px;
    margin: 0 auto;
}
.footer-list ul{
    display: flex;
    text-align: center;
    align-items: center;
    height: 100%;
}
.footer-list ul li {
    flex: 1;
    list-style-type: none;
}

.footer-list ul li span {
    display: block;
    color: #000;
}
.select {
    color: #abd1c6;
}
</style>