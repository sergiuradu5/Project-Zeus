import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getStorageUser } from "../../local-storage/local-storage-functions";

type AuthState = {
  isAuthenticated: boolean;
};

const initializeIsAuthenticated = (): boolean => {
  const userFromStorage = getStorageUser();
  if (userFromStorage) {
    return true;
  }
  return false;
};

const initialState: AuthState = {
  isAuthenticated: initializeIsAuthenticated(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setIsAuthenticated } = authSlice.actions;
