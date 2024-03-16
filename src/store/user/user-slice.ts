import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/user-type";
import { signInThunk } from "./user-actions";

export const defaultUser: UserType = {
  id: "",
  img: "",
  isOnline: false,
  username: "",
  email: "",
  bio: "",
  creationTime: undefined,
  lastSeen: undefined,
};

type UserState = {
  users: UserType[];
  currentUser: UserType;
};

const initialState: UserState = {
  users: [],
  currentUser: defaultUser,
  // currentSelectedUser: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      const user = action.payload;

      localStorage.setItem("user", JSON.stringify(user));

      state.currentUser = action.payload;
    },
    setUsers: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export const { setUser, setUsers } = userSlice.actions;
