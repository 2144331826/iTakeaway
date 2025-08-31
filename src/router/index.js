//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);
//引入路由组件

import Footer from '../pages/Footer.vue'
import Start from '../pages/Start.vue'
import Play from '../pages/Play.vue'
import Message from '../pages/Message.vue'
import Person from '../pages/Person.vue'
import Choose from '../pages/Choose.vue'
import Detail from '@/pages/Detail.vue';
import Login from '@/pages/Login.vue';
import Register from '@/pages/Register.vue';
import Chat from '@/pages/Chat.vue';
import Chatedit from './../pages/Chatedit.vue'
import SearchInfo from '@/pages/SearchInfo.vue';

import Address from '@/pages/person/Address.vue';
import Advice from './../pages/person/Advice.vue'
import Shopcar from '@/pages/person/Shopcar.vue';
import Useredit from '@/pages/person/Useredit.vue';
import Collect from '@/pages/person/Collect.vue';

import Plan from '@/pages/play/Plan.vue';
import Test from './../pages/play/Test.vue'


//配置路由
const router = new VueRouter({
    // 路由跳转时动态添加样式
    linkActiveClass:'select',
    //配置路由
    routes:[
        //重定向，当项目跑起来时，立马定向到首页
        // {
        //     path:'/',
        //     redirect:"/login"
        // },
        //路由
        {
            path:'/footer',
            component:Footer,
            name:'footer',
            children:[
                {
                    path:'/footer/start',
                    component:Start,
                    name:'start',
                    meta: { keepAlive: true } // 缓存组件
                },  
                {
                    path:'/footer/play',
                    component:Play,
                    name:'play',
                    meta: { keepAlive: true }, // 缓存组件
                },
                {
                    path:'/footer/choose',
                    component:Choose,
                    name:'choose',
                    meta: { keepAlive: true } // 缓存组件
                },
                {
                    path:'/footer/message',
                    component:Message,
                    name:'message',
                    meta: { keepAlive: true } // 缓存组件
                },
                {
                    path:'/footer/person',
                    component:Person,
                    name:'person',
                    meta: { keepAlive: true } // 缓存组件
                }
            ]
        },
        {
            path:'/login',
            component:Login,
            name:'login',
        },
        {
            path:'/register',
            component:Register,
            name:'register',
        },
        {
            path:'/chat',
            component:Chat,
            name:'chat',
            meta: { keepAlive: true } // 缓存组件
        },
        {
            path:'/chatedit',
            component:Chatedit,
            name:'chatedit'
        },
        {
            path:'/useredit',
            component:Useredit,
            name:'useredit',
            meta: { keepAlive: true } // 缓存组件
        },
        {
            path:'/detail',
            component:Detail,
            name:'detail',
            meta: { keepAlive: true } // 缓存组件
        },
        {
            path:'/address',
            component:Address,
            name:'address',
        },
        {
            path:'/advice',
            component:Advice,
            name:'advice',
        },
        {
            path:'/shopcar',
            component:Shopcar,
            name:'shopcar',
        },
        {
            path:'/searchinfo',
            component:SearchInfo,
            name:'searchinfo',
        },
        {
            path:'/collect',
            component:Collect,
            name:'collect'
        },
        {
            path:'/plan',
            component:Plan,
            name:'plan',
            meta: { keepAlive: true }, // 缓存组件
        },
        {
            path:'/test',
            component:Test,
            name:'test',
            meta: { keepAlive: true }, // 缓存组件
        },
    ]
})

export default router