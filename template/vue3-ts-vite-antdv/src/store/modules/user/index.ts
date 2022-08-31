import { defineStore } from 'pinia';
import { Login } from '@/api/login';
import { setToken, clearToken, getToken } from '@/utils/storage';
import type { UserState } from './types';
import { Base64 } from 'js-base64';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    username: undefined,
    avatar: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    role: ''
  }),
  getters: {
    userProfile(state: UserState): UserState {
      return { ...state };
    }
  },
  actions: {
    switchRoles() {
      return new Promise(resolve => {
        this.role = this.role === 'user' ? 'user' : 'admin';
        resolve(this.role);
      });
    },
    // 设置用户的信息
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },
    // 重置用户信息
    resetInfo() {
      this.$reset();
    },
    // 获取用户信息
    info() {
      const token = getToken() || '';
      const payload = Base64.decode(token.split('.')[1]);
      console.log(payload);
      const userInfo = JSON.parse(payload);
      this.setInfo(userInfo);
    },
    // 异步登录并存储token
    async login(loginForm: any) {
      const { success, data, msg } = await Login(loginForm);
      if (success) {
        // 存储 token
        const token = data;
        setToken(token);
        this.info();
      }
      return { success, msg };
    },
    // Logout
    async logout() {
      //   await userLogout()
      this.resetInfo();
      clearToken();
    }
  }
});
