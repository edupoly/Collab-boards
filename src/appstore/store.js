import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { boardapi } from '../services/boardapi'
import { usersApi } from '../services/userApi'

export const store = configureStore({
  reducer: {
    [boardapi.reducerPath]: boardapi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boardapi.middleware, usersApi.middleware,),
})

setupListeners(store.dispatch)