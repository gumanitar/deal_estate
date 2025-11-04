import { createSlice } from "@reduxjs/toolkit";

let persisted: { user: any | null; token: string | null } = {
  user: null,
  token: null,
};

const raw = localStorage.getItem("auth");
if (raw) persisted = JSON.parse(raw);

const authSlice = createSlice({
  name: "auth",
  initialState: persisted,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      try {
        localStorage.removeItem("auth");
      } catch (e) {}
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;
