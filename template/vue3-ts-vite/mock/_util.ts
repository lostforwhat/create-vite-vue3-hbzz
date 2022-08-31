export const resultSuccess = (data: any, msg = 'ok') => {
  return {
    code: 0,
    data,
    msg,
    success: true
  };
};

export const resultFailed = (msg = 'request failed', code = -1) => {
  return {
    code,
    msg,
    success: false
  };
};

export const resultPageList = <T = any>(page: number, limit: number, list: T[], msg = 'ok') => {
  const pageData = pagination(page, limit, list);
  return {
    code: 0,
    data: pageData,
    count: list.length,
    msg,
    success: true
  };
};

export const pagination = <T = any>(page: number, pageSize: number, array: T[]): T[] => {
  const offset = (page - 1) * Number(pageSize);
  const ret = offset + Number(pageSize) >= array.length ? array.slice(offset, array.length) : array.slice(offset, offset + Number(pageSize));
  return ret;
};
