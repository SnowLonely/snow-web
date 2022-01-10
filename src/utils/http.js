import axios from "axios";
import qs from "qs";
import { message } from "ant-design-vue";
import cookie from "js-cookie";
import router from "@/router";

axios.defaults.timeout = 15000;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "/";

axios.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

// http Request请求拉拦截器
axios.interceptors.request.use(
  (config) => {
    // 获取token并发送
    const token = cookie.get("snow");

    if (token) {
      config.headers.token = token; // token携带在请求头中
      // config.params = {'token':token} // token携带在参数中
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// http Response响应拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 接收到异常响应
    if (error && error.response) {
      // 根据响应码做公共错误处理
      switch (error.response.status) {
        case 400:
          message.error("错误请求");
          break;

        case 401:
          message.error("没有权限");
          break;

        case 403:
          message.error("拒绝访问");
          break;

        case 404:
          message.error("未找到资源");
          router.push({
            path: "/404",
            query: {
              redirect: router.currentRoute.fullPath, // 从那个页面跳转
            },
          });
          break;

        case 405:
          message.error("请求方法未允许");
          break;

        case 408:
          message.error("请求超时");
          break;

        case 500:
          message.error("服务器端出错");
          break;

        case 501:
          message.error("网络未实现");
          break;

        case 502:
          message.error("网络错误");
          break;

        case 503:
          message.error("服务不可用");
          break;

        case 504:
          message.error("网络超时");
          break;

        case 505:
          message.error("http版本不支持该请求");
          break;

        default:
          message.error(`连接错误${error.response.status}`);
      }
    } else {
      // 超时处理
      if (JSON.stringify(error).includes("timeout")) {
        message.error("服务器响应超时，请您刷新当前页面");
      } else {
        message.error("连接服务器失败");
      }
    }

    // 处理结束
    return Promise.reject(error);
  }
);

/**
 * 封装get请求，
 * @param {请求地址} url
 * @param {请求参数：采用？方式拼接} params
 * @returns
 */
export function doGet(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param {请求地址} url
 * @param {请求参数} data
 * @param {请求方式：true-formData; 空/false-json} field
 * @returns
 */
export function doPost(url, data = {}, field) {
  if (field) {
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(data)).then(
        (response) => {
          resolve(response.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  const options = {
    url,
    data: JSON.stringify(data),
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return new Promise((resolve, reject) => {
    axios(options)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 封装put请求
 * @param {请求地址} url
 * @param {请求参数} data
 * @param {请求方式：true--formData; 空/false--json} field
 * @returns
 */
export function doPut(url, data = {}, field) {
  if (field) {
    return new Promise((resolve, reject) => {
      axios.put(url, qs.stringify(data)).then(
        (response) => {
          resolve(response.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  const options = {
    url,
    data: JSON.stringify(data),
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return new Promise((resolve, reject) => {
    axios(options)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 封装delete请求
 * @param {请求地址} url
 * @param {请求参数} data
 * @param {请求方式：true--formData; json--json} field
 * @returns
 */
export function doDelete(url, params = {}, field) {
  if (field === "json") {
    const options = {
      url,
      data: JSON.stringify(params),
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    };

    return new Promise((resolve, reject) => {
      axios(options)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
