import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authAPI } from './api/authAPI/authAPI';
import { authSlice } from './reducer/authSlice';

export const store = configureStore({
  reducer: { auth: authSlice.reducer, [authAPI.reducerPath]: authAPI.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authAPI.middleware),
});

setupListeners(store.dispatch);
