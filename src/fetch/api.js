import axios from 'axios'
import qs from 'qs'
import { Indicator } from 'mint-ui';
// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.baseURL = '/api';

// axios.defaults.baseURL = 'static/jsonData';//要用.get请求
//POST传参序列化
axios.interceptors.request.use((config) => {
    console.log("config")
    console.log(config)
    if (config.method === 'post') {
        if (config.url.indexOf("edit_logo") == -1) {//不存在
            config.data = qs.stringify(config.data);
        }
    }
    if (config.url.indexOf("betList") == -1 && config.url.indexOf("queryRes") == -1) {//不存在
        //    Indicator.open("加载中...");
    }
    return config;
}, (error) => {
    console.log("request" + error);
    // Indicator.open("加载中...");
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
    // if(!res.data.success){
    if (!res.data) {    //获得数据
        return Promise.reject(res);
    }
    // Indicator.close();
    return res;
}, (error) => {
    console.log("errresponse" + error);
    // Indicator.close();
    return Promise.reject(error);
});
function checkStatus(res) {
    // loading
    // 如果http状态码正常，则直接返回数据
    if (res && (res.status === 200 || res.status === 304 || res.status === 400)) {
        return res
        // 如果不需要除了data之外的数据，可以直接 return response.data
    }
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        msg: '网络异常'
    }
}
function checkCode(res) {
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    if (res.status === -404) {
        alert(res.msg)
    }
    if (res.data && (!res.data.success)) {
        alert(res.data.error_msg)
    }
    return res
}

export default {
    post(url, data) {
        return axios({
            method: 'post',
            baseURL: axios.defaults.baseURL,
            url,
            data: data,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        )
    },
    get(url, params) {
        return axios({
            method: 'get',
            baseURL: axios.defaults.baseURL,
            url,
            params, // get 请求时带的参数
            timeout: 10000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        )
    }
}