import { request } from '../utils/http';
import type { RequestOptions, Response } from '../utils/http';
import type { AxiosRequestConfig } from 'axios';
import qs from 'qs';

/**
 * 业务请求POST封装urlencoded form方式
 * @param url 请求地址
 * @param params 请求参数
 * @param options 请求配置(业务)
 * @returns
 */
export const httpPostForm = (url: string, params: AnyParams = {}, options?: RequestOptions) => {
  return request<Response>(
    {
      url,
      method: 'post',
      data: qs.stringify(params)
    },
    options
  );
};

/**
 * 通用POST封装
 * @param url 请求地址
 * @param params 请求参数
 * @param options 请求配置(业务)
 * @returns
 */
export const httpPost = (url: string, params: any = {}, options?: RequestOptions, config?: AxiosRequestConfig) => {
  return request(
    {
      ...config,
      url,
      method: 'post',
      data: params
    },
    options
  );
};

/**
 * 通用的GET请求
 * @param url 请求地址
 * @param params 请求参数
 * @param options 请求配置(业务)
 * @param config 请求配置(系统)
 * @returns
 */
export const httpGet = (url: string, params: AnyParams = {}, options?: RequestOptions, config?: AxiosRequestConfig) => {
  return request(
    {
      ...config,
      url,
      params
    },
    options
  );
};
