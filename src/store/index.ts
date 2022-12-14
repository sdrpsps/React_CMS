import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authAPI } from './api/authAPI';
import { userAPI } from './api/userAPI';
import { authSlice } from './reducer/authSlice';

export const store = configureStore({
  reducer: { auth: authSlice.reducer, [authAPI.reducerPath]: authAPI.reducer, [userAPI.reducerPath]: userAPI.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authAPI.middleware, userAPI.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
