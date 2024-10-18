import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the TUserProfile type

// Define the userState interface
interface UserState {
  user: TUserProfile | null;
}

// Define the initial state using that type
const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<TUserProfile>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { updateUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
