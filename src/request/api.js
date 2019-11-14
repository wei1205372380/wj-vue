/**
 * api统一接口管理
 */

import instance from "./http";

// 引入QS 模块，用来序列化post类型的数据
import QS from "qs";

// https://www.baidu.com/s?ie=utf-8&wd=word

/**
 * 外网测试服务器
 */
const server1 = "/apis";

/**
 * 本地服务器
 */
const localServer = "/localServer";

/**
 * 测试接口
 * @param p
 * @returns {Promise<AxiosResponse<T>>}
 */
export const apiAddress = p => instance.get(server1 + "/api/weather/city/101030100-linbowen", p);

/**
 * 登录接口
 * @param user 登入用户对象，包含用户名和密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export const login = user => instance.post(localServer + "/login", user);

