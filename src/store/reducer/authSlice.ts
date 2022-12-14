import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: () => {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (!user?.token) {
      return { isLogin: false, user: null, expirationTime: 0 };
    }
    const expirationTime = localStorage.getItem('expirationTime');
    return { isLogin: true, user, expirationTime };
  },
  reducers: {
    // 登陆
    login(state, action) {
      state.isLogin = true;
      state.user = action.payload;
      /* 保存 token 用户信息 */
      localStorage.setItem('user', JSON.stringify(action.payload));
      /* 设置 token 自动失效时间 */
      // 获取当前时间戳
      const currentTime = Date.now();
      // 设置有效时长 (一天)
      const timeOut = 1000 * 60 * 60 * 24;
      state.expirationTime = currentTime + timeOut;
      localStorage.setItem('expirationTime', state.expirationTime.toString());
    },
    // 登出
    logout(state) {
      state.isLogin = false;
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('expirationTime');
    },
  },
});

export const { login, logout } = authSlice.actions;
