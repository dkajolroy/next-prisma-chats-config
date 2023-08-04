import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: null,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    addConversations: (state, action) => {
      state.conversations = action.payload;
    },
  },
});

export default conversationSlice.reducer;
export const { addConversations } = conversationSlice.actions;
