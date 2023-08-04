import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  email: string | null;
  id: string;
  image?: string | null | undefined;
  name: string | null;
  username: string | null;
}

const initialState: { user: UserState } = {
  user: {
    email: "",
    id: "",
    image: "",
    name: "",
    username: "",
  },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<{ user: UserState }>) => {
      state.user = action.payload.user;
    },
  },
});

export default userSlice.reducer;
export const { addUser } = userSlice.actions;
