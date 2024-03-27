import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_USER_ITEM } from "../../local-storage/local-storage-constants";
import { getStorageUser } from "../../local-storage/local-storage-functions";
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

const initializeCurrentUserFromStorage = (): UserType => {
  const userFromStorage = getStorageUser();
  if (userFromStorage) {
    return userFromStorage;
  }
  return defaultUser;
};

const initialState: UserState = {
  users: [],
  currentUser: initializeCurrentUserFromStorage(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      const user = action.payload;

      localStorage.setItem(LOCAL_STORAGE_USER_ITEM, JSON.stringify(user));

      state.currentUser = action.payload;
    },

    deleteUser: (state) => {
      localStorage.removeItem(LOCAL_STORAGE_USER_ITEM);
      state.currentUser = defaultUser;
    },


    setUsers: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export const { setUser, deleteUser, setUsers } = userSlice.actions;
