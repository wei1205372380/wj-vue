/**
 * axios封装：
 * 1.请求拦截；
 * 2.响应拦截；
 * 3.错误统一处理
 */

// 引入axios
import axios from "axios";
// 引入QS 模块，用来序列化post类型的数据
import QS from "qs";
import store from "../vuex/index";
import router from "../router"
import { Message } from "element-ui";

// 环境切换
// if (process.env.NODE_ENV === "development") {
//     axios.defaults.baseURL = "/apis";
// } else if (process.env.NODE_ENV === "debug") {
//     axios.defaults.baseURL = "";
// } else if (process.env.NODE_ENV === "production") {
//     axios.defaults.baseURL = "";
// }

console.log(store);

// 创建axios实例
const instance = axios.create({
    timeout: 1000 * 12
});
// 设置post请求头
instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

// 请求拦截器
instance.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否都存在token，如果存在，则统一在http请求的header加上token，不用每次请求都手动添加
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
    }
)

// 响应拦截器
instance.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转到登陆页面，并携带当前页面的路径
                // 在登陆成功后返回当前页面，这一步需要在登录页操作
                case 401:
                    console.log("401");
                    router.replace({
                        path: "/login",
                        query: {redirect: router.currentRoute.fullPath}
                    });
                    break;
                // 403: token过期
                // 登录过期对用户提示
                // 清楚本地token和清空vuex中token对象
                // 跳转登陆页面
                case 403:
                    console.log("403");
                    Message({
                        type: "warning",
                        message: "登录过期，请重新登录",
                        duration: 1000
                    });
                    // 清除本地token
                    localStorage.removeItem("token");
                    store.commit("loginSuccess", null);
                    // 跳转登陆页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: "/login",
                            query: {redirect: router.currentRoute.fullPath}
                        })
                    }, 1000);
                    break;
                // 404: 请求不存在
                case 404:
                    Message({
                        type: "error",
                        message: "网络请求不存在",
                        duration: 1500
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Message({
                        type: "error",
                        message: error.response.data.message,
                        duration: 1500
                    })
            }
            return Promise.reject(error.response);
        }
    }
)

export default instance;



