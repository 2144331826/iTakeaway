//对于axios进行二次封装
import axios from 'axios';
//利用axios对象的方法create，去创建一个axios实例
const requests=axios.create({
    //配置对象
    // baseURL:'http://26.163.139.139:8000',//zyh
    // baseURL:'http://26.163.139.139:8866',//zyh
    // baseURL:'http://106.52.78.230:8000',
    // baseURL:'http://10.10.249.29:8000',//wwf
    baseURL:'http://back.etakeaway.shop:8000',//fwq
    // baseURL:'http://26.246.197.88:8000',//VPN
    // baseURL:'http://172.20.10.2:8000',//手机
    // withCredentials: true, // 携带凭证
    timeout:120000
});

//请求拦截器：在请求发出之前可以检测到，可以在请求发出之前做一些事情
// requests.interceptors.request.use((config)=>{
//     // config:配置对象，对象里面有一个属性很重要，header请求头
//     // const userId = localStorage.getItem('USERID');
//     // const token = localStorage.getItem('TOKEN');
//     // if (userId && token) {
//     //   config.headers['token'] = token;
//     //   config.headers['id'] = userId; 
//     // }
//     // // 如果服务器端要求特定的Content-Type，可以在这里设置
//     // config.headers['Content-Type'] = 'application/json';
//     return config;
// }, error => {
//   return Promise.reject(error);
// });

//响应拦截器
requests.interceptors.response.use((res)=>{
    return res.data;
},(error)=>{
    return Promise.reject(error);
});

export default requests;
