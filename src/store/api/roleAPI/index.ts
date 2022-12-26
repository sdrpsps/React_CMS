import { RootState } from '@/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const roleAPI = createApi({
  reducerPath: 'roleAPI',
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
    // 获取权限列表
    getRight: builder.query({
      query: (data) => {
        return { url: `rights/${data.type}` };
      },
    }),
    updateRight: builder.mutation({
      query: (data) => {
        return { url: `roles/${data.roleId}/rights`, method: 'post', body: { rids: data.rids } };
      },
    }),
  }),
});

export const { useGetRightQuery, useUpdateRightMutation } = roleAPI;
