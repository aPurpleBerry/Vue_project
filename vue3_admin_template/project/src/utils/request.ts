import axios from "axios";
import { ElMessage } from "element-plus";
//【第一步】 利用axios对象的create方法。去创建axios示例，是为了方便有其他的配置
//创建axios实例
let request = axios.create({
    // 基础路径
    baseURL: import.meta.env.VITE_APP_BASE_API,  // 基础路径会携带VITE_APP_BASE_API
    timeout: 5000 // 设置超时的时间
})
//【第二步】请求拦截器
request.interceptors.request.use(config => {
    /*
      这里在发送请求之前做些什么
      config配置对象里面有一个 headers属性请求头，经常给服务器端携带公共参数
    */
    return config; //返回配置对象
});
//【第三步】响应拦截器
// request.interceptors.response.use(第一个函数,第二个函数)
// 第一个函数是响应成功  第二个函数是响应失败
request.interceptors.response.use((response) => {
    // 这里接上一节 mock，
    return response.data;
}, (error) => {
    //处理网络错误
    let msg = '';
    let status = error.response.status;
    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络";

    }
    //提示错误信息
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
});

// 对外暴露
export default request;