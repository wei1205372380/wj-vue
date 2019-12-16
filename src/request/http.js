/**
 * axios封装：
 * 1.请求拦截；
 * 2.响应拦截；
 * 3.错误统一处理
 */

// 引入axios
import axios from "axios";
import store from "../vuex/index";
import router from "../router"
import { Message } from "element-ui";
import storage from "./localStorage";

/**
 * 提示函数
 * @param type 提示类型（成功，警告，失败等）
 * @param msg 提示信息
 */
const tip = (type, msg) => {
    Message({
        message: msg,
        duration: 1000,
        type: type
    })
};

/**
 * 跳转到登录页面
 * 携带当前页面路由，方便后面在成功登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: "/",
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
};

/**
 * 请求失败（即响应码不是2开头的情况）后的统一错误处理
 * @param status 状态码
 * @param other 其他信息
 */
const errorHandle = (status, other) => {
    switch (status) {
        // 401: 未登录状态，跳转到登录页面
        case 401:
            toLogin();
            break;
        // 403: token过期，清除token并跳转到登录页面
        case 403:
            tip("warning", "登录过期，请重新登录");
            storage.removeToken();
            setTimeout(() => {
                toLogin();
            }, 1000);
            break;
        // 404: 请求不存在
        case 404:
            tip("error", "请求的资源不存在");
            break;
        default:
            tip("error", other);
    }
};

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
        const token = storage.getToken();
        token && (config.headers.token = token);
        return config;
    },
    error => Promise.error(error)
);

// 响应拦截器
instance.interceptors.response.use(
    // 请求成功
    response => {
        return response.status === 200 ? Promise.resolve(response) : Promise.reject(response);
    },
    // 请求失败
    error => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是响应码不是2**
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 请求未发出，这里暂时统一作断网处理
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            if (!window.navigator.onLine) {
                store.commit('changeNetwork', false);
            } else {
                return Promise.reject(error);
            }
        }
    }
);

export default instance;



