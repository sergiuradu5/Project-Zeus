import { UserType } from "../types/user-type";
import { LOCAL_STORAGE_USER_ITEM } from "./local-storage-constants";

export const getStorageUser = (): UserType | null => {
  const user = localStorage.getItem(LOCAL_STORAGE_USER_ITEM);
  if (user) return JSON.parse(user);
  else return null;
};

export const removeStorageUser = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_USER_ITEM);
};
