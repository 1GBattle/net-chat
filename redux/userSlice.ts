import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../models/UserModel";
import { RootState } from "./store";

const userSlice = createSlice({
  name: "userSlice",
  initialState: { user: undefined } as { user: User | undefined },
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = {} as User;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
