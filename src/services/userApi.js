// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4500/api/users" }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userData) => ({
        url: '/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    logIn: builder.mutation({
      query: (userData) => ({
        url: '/login',
        method: 'POST',
        body: userData,
      }),
    }),
    getProfile: builder.query({
      query: (token) => ({
        url: '/profile/' + token,
        method: 'GET'
      }),
    }),
  }),
});

export const { useSignUpMutation, useLogInMutation,useGetProfileQuery,useLazyGetProfileQuery } = usersApi;
