import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import modalSlice from "../slices/modalSlice";

export const store = configureStore({
  reducer: { userReducer: userSlice, modalReducer: modalSlice },
});
