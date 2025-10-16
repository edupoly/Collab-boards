import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null, // Stores user data (e.g., name, email, token)
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      // console.log(action.payload)
      state.userInfo = action.payload;
      // console.log(state.userInfo);
    },
    clearUser(state) {
      state.userInfo = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
const userReducer=userSlice.reducer;
export default userReducer;
