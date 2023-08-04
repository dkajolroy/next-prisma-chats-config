import conversationSlice from "@/slice/conversationSlice";
import userSlice from "@/slice/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "./storage";

const persistConfig = {
  key: "root",
  storage: storage,
};

let rootReducer = combineReducers({
  userState: userSlice,
  conversationState: conversationSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
