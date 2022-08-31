import { httpPostForm, httpGet } from './base';

// 请求时自动展示loading
// const loading = true
// 是否使用mock数据
const isMock = true;

export const Login = (params: API.LoginParams) => httpPostForm('/user/login', params);

export const GetCode = () => httpGet('/admin/code', {}, { isMock });
