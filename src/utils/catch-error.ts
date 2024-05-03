import { toastErr } from "./toast";

const FirebaseErrorCodesAndMessages: Record<string, string> = {
  "auth/email-already-exists": "Email already exists",
  "auth/invalid-email": "Email is not valid",
  "auth/weak-password": "Password should be at least 6 characters",
  "auth/user-not-found": "User not found",
  "auth/email-already-in-use": "Email already in use",
  "auth/wrong-password": "Password is incorrect",
  "auth/requires-recent-login":
    "Log out and log in before updating your profile",
  "auth/invalid-credential": "Invalid credentials",
  "auth/too-many-requests": "Too many requests, please try again later",
  "permission-denied": "Permission denied",
  unavailable: "Firebase client is offline",
};

export const catchError = ({
  code,
  message: defaultErrorMessage,
}: {
  code?: string;
  message?: string;
}): void => {
  if (code) {
    const errorMessage = FirebaseErrorCodesAndMessages[code];
    if (errorMessage) {
      toastErr(errorMessage);
      return;
    }
  }
  if (defaultErrorMessage) {
    toastErr(defaultErrorMessage);
  } else {
    toastErr("An error occured");
  }
};
