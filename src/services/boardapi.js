import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const boardapi = createApi({
  reducerPath: 'board',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://multitodo-backend-app-production-a172.up.railway.app/Board' }),
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4500/api/mock/Board' }),
  endpoints: (builder) => ({
    gettodolist: builder.query({
      query: () => `/`,
    }),
    gettodosbyid:builder.query({
      query:(id)=>`/${id}`
    }),
    addnewtodos: builder.mutation({
      query: (todolist) => ({
        url: `/${todolist.id}`,
        method: 'PUT',
        body:todolist,
      })
    })
      ,
    deletetask: builder.mutation({
      query: (todolist) => ({
        url: `/${todolist.id}`,
        method: 'PUT',
        body:todolist,
      }),

  }),
    createboard: builder.mutation({
      query: (board) => ({
        url: `/`,
        method: 'Post',
        body:board,
      }),

  }),
    deleteboard: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),

  }),
    updatatodolist: builder.mutation({
      query: (todolist) => ({
        url: `/${todolist.id}`,
        method: 'PUT',
        body:todolist,
      }),

  }),
    
})
})



export const {useGettodolistQuery ,
  useGettodosbyidQuery,
  useAddnewtodosMutation,
  useDeletetaskMutation,
  
  useCreateboardMutation,
  useDeleteboardMutation,
  useLazyGettodolistQuery,
  useLazyGettodosbyidQuery,
  useUpdatatodolistMutation
} = boardapi
