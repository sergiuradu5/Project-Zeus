import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../backend/firebase";
import { AuthDataType } from "../../types/auth-data-type";

export const signInThunk = createAsyncThunk(
  "user/signIn",
  async ({ email, password }: AuthDataType, thunkApi): Promise<any> => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in
    const user = userCredential.user;
    return user;
    //  toastSucc("Sign in successful");
    //  setIsLoading(false);
    //  goTo("/dashboard");
    // ...
  }
);
