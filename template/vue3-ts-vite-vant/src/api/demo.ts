import { httpPostForm, httpPost, httpGet } from './base';

// 请求时自动展示loading
const loading = true;

//demo 不需要loading
export const test1 = (params: AnyParams) => httpPostForm('/rkxq/tj', params);

//demo 需要loading
export const test2 = (params: AnyParams) => httpPostForm('/test2', params, { loading });

//demo post
export const test3 = (params: FormData) => httpPost('/test2', params);

//demo get
export const test4 = (params: AnyParams) => httpGet('/test2', params);
