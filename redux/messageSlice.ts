import { createSlice } from '@reduxjs/toolkit'
import MessageModel from '../models/MessageModel'

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [] as MessageModel[],
  },

  reducers: {
    setMessages: (state, action) => {
      state.messages = [action.payload, ...state.messages]
    },
  },
})

export const { setMessages } = messageSlice.actions
export default messageSlice.reducer
