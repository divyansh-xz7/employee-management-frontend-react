// src/services/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    // baseUrl: 'https://static-api-react-3fd8b5ce2-react-3fd997eba-urtjok3rza-wl.a.run.app' ,
    baseUrl: 'https://localhost:8080' ,

  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/authenticate',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (user) => ({
        url: '/employee',
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(user),
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
export default authApi;