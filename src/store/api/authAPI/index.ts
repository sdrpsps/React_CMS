import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { loginData, loginRes } from './types';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://cms.hchow.icu/api/private/v1/' }),
  endpoints: (builder) => ({
    login: builder.mutation<loginRes, loginData>({
      query: (loginData) => {
        return { url: `/login`, method: 'post', body: loginData };
      },
    }),
  }),
});

export const { useLoginMutation } = authAPI;
