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

/**
 * 获取所有书籍信息
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getAllBooks = () => instance.get(localServer + "/book");

/**
 * 根据标签获取其下所有的书籍详细信息
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getBookDetails = (tagId) => instance.get(localServer + "/book/details/" + tagId);

/**
 * 根据书的id获取其所有的评分信息
 * @param bookId
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getBookScores = (bookId) => instance.get(localServer + "/book/scores/" + bookId);

/**
 * 更新用户对书籍的评分
 * @param bookScore
 * @returns {Promise<AxiosResponse<T>>}
 */
export const updateBookScore = (bookScore) => instance.post(localServer + "/book/score", bookScore);

/**
 * 添加用户对书籍的评论
 * @param bookComment
 * @returns {Promise<AxiosResponse<T>>}
 */
export const addBookComment = (bookComment) => instance.post(localServer + "/book/comment", bookComment);

/**
 * 获取子标签
 * @param id
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getSubTags = (id) => instance.get(localServer + "/tag/sub/" + id);

/**
 * 获取后代标签
 * @param id
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getAllSubTags = (id) => instance.get(localServer + "tag/sub/all/" + id);


