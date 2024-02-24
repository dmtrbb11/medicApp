import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

export const userSlice = createSlice({
  name: "userLogic",
  initialState,
  reducers: {
    addUser(state, action) {
      const newUser = {
        lastName: action.payload.surName,
        name: action.payload.name,
        gender: action.payload.gender,
        email: action.payload.email,
        editable: action.payload.editable,
      };
      state.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    deleteUserFunction(state, action) {
      const localeArr = JSON.parse(localStorage.getItem("users"));
      state.users = localeArr.filter((user) => user.email !== action.payload);
      const updatedUsersArr = JSON.stringify(state.users);
      localStorage.setItem("users", updatedUsersArr);
    },
    saveEditedUser(state, action) {
      const { pochta, user } = action.payload;
      const updatedArray = state.users.map((obj) => {
        if (obj.email === pochta) {
          return {
            lastName: user.surName,
            name: user.name,
            gender: user.gender,
            email: user.email,
            editable: user.editable,
          };
        } else {
          return obj;
        }
      });
      state.users = updatedArray;
    },
    setLocalState(state, action) {
      if (action.payload === true) {
        state.users = [];
      } else {
        state.users = JSON.parse(localStorage.getItem("users"));
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, setLocalState, deleteUserFunction, saveEditedUser } =
  userSlice.actions;

export default userSlice.reducer;
