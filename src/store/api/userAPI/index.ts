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
    getUserList: builder.query({
      query: (data) => {
        return {
          url: `/users`,
          method: 'get',
          params: { query: data.query || '', pagenum: data.pagenum || 1, pagesize: data.pagesize || 5 },
        };
      },
    }),
  }),
});

export const { useGetUserListQuery } = userAPI;
