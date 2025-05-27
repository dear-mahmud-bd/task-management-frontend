import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUser } from "@/types";
import storage from "../storage";

type TAuthState = {
  user: null | IUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    signOut: (state) => {
      state.user = null;
      state.token = null;
      storage.removeItem("persist:root");
    },
  },
});

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;


export const { setUser, signOut } = authSlice.actions;
export default authSlice.reducer;
