/**
 * api统一接口管理
 */

import instance from "./http";

// https://www.baidu.com/s?ie=utf-8&wd=word

export const apiAddress = p => instance.get("/apis/api/weather/city/101030100-linbowen", p);
