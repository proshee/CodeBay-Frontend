import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, role: "user" },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    changeRole(state, action) {
      const role = action.payload;
      state.role = role;
    },
  },
});
const authActions = authSlice.actions;
const authReducer = authSlice.reducer;

export { authActions };
export default authReducer;

