import { RootState } from '@/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://cms.hchow.icu/api/private/v1/',
    prepareHeaders: (header, { getState }) => {
      // 获取 token
      const token: string = (getState() as RootState).auth?.user.token;
      if (token) {
        header.set('Authorization', token);
      }
      return header;
    },
  }),
  endpoints: (builder) => ({
    // 获取用户列表
    getUserList: builder.mutation({
      query: (data) => {
        return {
          url: `/users`,
          method: 'get',
          params: { query: data.query || '', pagenum: data.pageNum || 1, pagesize: data.pageSize || 5 },
        };
      },
    }),
    // 修改用户启用状态
    updateUserState: builder.mutation({
      query: (data) => {
        return {
          url: `users/${data.id}/state/${data.type}`,
          method: 'put',
        };
      },
    }),
    // 修改用户信息
    updateUserInfo: builder.mutation({
      query: (data) => {
        return {
          url: `users/${data.id}`,
          method: 'put',
          body: data.data,
        };
      },
    }),
    // 删除用户
    deleteUser: builder.mutation({
      query: (data) => {
        return {
          url: `users/${data.id}`,
          method: 'delete',
        };
      },
    }),
    // 新增用户
    addUser: builder.mutation({
      query: (data) => {
        return {
          url: `users`,
          method: 'post',
          body: data,
        };
      },
    }),
    // 获取角色列表
    getRoleList: builder.mutation({
      query: (data) => `/roles`,
    }),
    // 修改用户角色
    updateUserRole: builder.mutation({
      query: (data) => {
        return {
          url: `users/${data.id}/role`,
          method: 'put',
          body: { rid: data.rid },
        };
      },
    }),
  }),
});

export const {
  useGetUserListMutation,
  useUpdateUserStateMutation,
  useUpdateUserInfoMutation,
  useDeleteUserMutation,
  useAddUserMutation,
  useGetRoleListMutation,
  useUpdateUserRoleMutation,
} = userAPI;
