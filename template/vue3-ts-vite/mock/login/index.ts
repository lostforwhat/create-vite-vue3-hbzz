import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess, resultFailed } from '../_util';

export default [
  {
    url: '/mock-api/admin/login',
    method: 'post',
    timeout: 1000,
    response: ({ body }: any) => {
      const { username, pwd } = body;
      if (username === 'admin') {
        return resultSuccess('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjE4NTAwMDU5MjE3IiwiaWRjYXJkIjoiNDIwNTI3MTk4ODA5MTg1MzEzIiwibmFtZSI6IumygeWwpyIsImV4cCI6MTY1NzAwNTQ2OCwidXNlcmlkIjoiRTIyRjQzRjhCOTFGMkQ1RkUwNTMwNTAwMTFBQzQ5QjEiLCJ1c2VybmFtZSI6Imx1eWFvIn0.86BYF8xpfLJ-yvjFNFcgYqwCKKiHMUVCOWl6HnZup6c', '登录成功');
      }
      return resultFailed('登录失败, 用户名或密码错误');
    }
  },
  {
    url: '/mock-api/admin/code',
    method: 'get',
    timeout: 1000,
    response: () => {
      return resultSuccess({
        img_base64:
          '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',
        key: 'f6d8bb527f574e6b855957c28bd9e270'
      });
    }
  }
] as MockMethod[];
