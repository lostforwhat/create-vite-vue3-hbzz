/**axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { getToken, clearToken, setToken } from './storage';
import { useAppStore } from '../store/modules/app';

/** 默认错误文案 */
const UNKNOWN_ERROR = '请求出现未知错误，请稍后重试';

/** 真实请求的路径前缀 */
const baseApiUrl = import.meta.env.VITE_BASE_API;
/** mock请求路径前缀 */
const baseMockUrl = import.meta.env.VITE_MOCK_API;

const TIME_OUT_MS: number = 10 * 1000; // 默认请求超时时间
// const BASE_URL : string = '/api' // baseUrl

// 创建axios实例
const instance = axios.create({
  // baseURL:"",
  timeout: TIME_OUT_MS
  // withCredentials: true,
});

// 请求拦截器
instance.interceptors.request.use(
  (config: any) => {
    // 全局添加token
    if (config.headers) {
      config.headers['Authorization'] = getToken();
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const res = response.data;
    // 根据响应头更新token
    const headers = response.headers ?? {};
    const authorization = headers['Authorization'] ?? '';
    if (authorization) {
      setToken(authorization);
    }

    // code 是后端返回的业务状态码 {code:0,data:{},message:"成功"}
    if (!res.success) {
      // 此处因为后端框架偷懒 message ==> msg 所以需要做转换
      const error = new Error(res.msg || UNKNOWN_ERROR) as Error & { code: any };
      error.code = res.code;
      return Promise.reject(error);
    } else {
      return res;
    }
  },
  error => {
    if (axios.isCancel(error)) {
      return new Promise(() => {
        console.log('cancel http');
      });
    }
    const errMsg = error?.response?.data?.msg ?? UNKNOWN_ERROR;
    error.message = errMsg;
    error.code = error?.response?.status;
    return Promise.reject(error);
  }
);

export type Response<T = any> = {
  code: number;
  msg: string;
  data?: T;
  success: boolean;
  count?: number;
};

export interface RequestOptions {
  /** 是否需要全局loading */
  loading?: boolean;
  /** 是否mock数据请求 */
  isMock?: boolean;
  /** 是否直接获取data */
  onlyData?: boolean;
  /** 展示错误function */
  showError?: Function;
}

export const request = async <T = any>(config: AxiosRequestConfig, options: RequestOptions = {}): Promise<T> => {
  const { loading = true, isMock, onlyData = false, showError } = options;
  const appStore = useAppStore();
  try {
    const fullUrl = `${(isMock ? baseMockUrl : baseApiUrl) + config.url}`;
    config.url = fullUrl.replace(/(?<!:)\/{2,}/g, '/');

    // 设置请求取消令牌，用于程序特殊情况取消该次未完成请求
    config.cancelToken = new axios.CancelToken(cancel => {
      appStore.pushReq(cancel);
    });

    if (loading) {
      appStore.setLoading(true);
    }
    const res: Response = await instance.request(config);

    return onlyData ? res.data : res;
  } catch (error: any) {
    const { code, message } = error;
    let errMsg = message;
    switch (code) {
      //404 资源不存在
      case 404:
        errMsg = '网络请求不存在';
        break;
      case 403:
        errMsg = '用户登录过期，请重新登录';
        // router.replace('/login');
        clearToken();
        window.location.reload();
        break;
      // 系统错误
      case 500:
        errMsg = errMsg ?? '服务器异常，请稍后重试';
        break;
      // 其他错误，直接抛出错误提示
      default:
        errMsg = errMsg ?? UNKNOWN_ERROR;
    }
    if (showError) {
      showError(errMsg);
    }
    const data: any = {
      code,
      msg: errMsg,
      success: false
    };
    return data;
  } finally {
    if (loading) {
      appStore.setLoading(false);
    }
  }
};

export default instance;
