import { defineStore } from 'pinia';
import store from '@/store/index';
import type { Canceler } from 'axios';
import type { AppState } from './types';

export const useAppStore = defineStore(
  // 唯一ID
  'app',
  {
    state: (): AppState => ({
      processRequests: [],
      loading: false,
      cacheViews: []
    }),
    getters: {},
    actions: {
      pushReq(req: any) {
        const reqs = this.processRequests || [];
        reqs.push(req);
        this.processRequests = reqs;
      },
      abortRequest() {
        if (this.processRequests) {
          this.processRequests.forEach((cancel: Canceler) => {
            cancel(); // 取消上个页面所有请求
          });
          this.processRequests = [];
        }
      },
      setLoading(loading: boolean) {
        this.loading = loading;
      }
    }
  }
);

export function useAppOutsideStore() {
  return useAppStore(store);
}
