import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  editable: false,
  userData: {},
};

export const modalSlice = createSlice({
  name: "userModal",
  initialState,
  reducers: {
    openModal(state, action) {
      state.open = action.payload;
    },
    closeModal(state, action) {
      state.open = action.payload;
    },
    closeAndDeleteDataModal(state) {
      state.userData = {};
    },
    editUser(state, action) {
      state.editable = action.payload;
    },
    userDataSave(state, action) {
      state.userData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  openModal,
  closeModal,
  editUser,
  userDataSave,
  closeAndDeleteDataModal,
} = modalSlice.actions;

export default modalSlice.reducer;
