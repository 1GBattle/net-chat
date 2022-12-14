import { configureStore } from '@reduxjs/toolkit'
import messageSlice from './messageSlice'
import userSlice from './userSlice'

const store = configureStore({
  reducer: {
    userSlice: userSlice,
    messageSlice: messageSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
