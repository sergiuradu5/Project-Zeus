import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { NavigateFunction } from "react-router-dom";
import {
  getStorageUser,
  removeStorageUser,
} from "../local-storage/local-storage-functions";
import { AppDispatch } from "../store/store";
import { deleteTaskLists } from "../store/tasks/task-list-slice";
import {
  defaultUser,
  deleteUser as deleteUserAction,
  setUser,
} from "../store/user/user-slice";
import { AuthDataType } from "../types/auth-data-type";
import { SetLoadingType } from "../types/set-loading-type";
import { UserType } from "../types/user-type";
import { CatchError } from "../utils/catch-error";
import convertTime from "../utils/convert-time";
import { generateAvatarImgLink } from "../utils/generate-avatar";
import { toastErr, toastSucc } from "../utils/toast";
import { auth, db } from "./firebase";
import { FIREBASE_USERS_COLL } from "./firebase-constants";
import { BE_bulkDeleteTaskLists } from "./task-list-queries";

export const BE_signUp = async (
  { email, password, confirmPassword }: AuthDataType,
  setIsLoading: SetLoadingType,
  goTo: NavigateFunction,
  dispatch: AppDispatch,
  resetForm: () => void
) => {
  if (email && password) {
    if (password === confirmPassword) {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
          // Signed up
          const username =
            user.email?.split("@")[0] ||
            `username${Math.floor(Math.random() * 10000)}`;
          const email = user.email || "";
          const imgLink = generateAvatarImgLink(username);
          const userToAddToCollection = {
            id: user.uid,
            email: email,
            username,
            img: imgLink,
          };
          const userInfo = await addUserToCollection(userToAddToCollection);
          dispatch(setUser(userInfo));
          setIsLoading(false);
          toastSucc("Signup successful");
          goTo("/dashboard");
          resetForm();
          // ...
        })
        .catch((error) => {
          CatchError(error);
          setIsLoading(false);
        });
    } else {
      toastErr("Passwords must match");
      setIsLoading(false);
    }
  } else {
    toastErr("Fields should not be empty");
    setIsLoading(false);
  }
};

export const BE_signIn = async (
  { email, password }: AuthDataType,
  setIsLoading: SetLoadingType,
  goTo: NavigateFunction,
  dispatch: AppDispatch,
  resetForm: () => void
) => {
  setIsLoading(true);
  return signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      await updateUserInfo({ id: userCredential.user.uid, isOnline: true });
      const user = userCredential.user;
      const userInfo = await getUserInfo(user.uid);
      toastSucc("Sign in successful");
      setIsLoading(false);

      dispatch(setUser(userInfo));
      resetForm();
      goTo("/dashboard");
      // ...
    })
    .catch((error) => {
      CatchError(error);
      setIsLoading(false);
    });
};

export const BE_signOut = async (
  dispatch: AppDispatch,
  setLoading: SetLoadingType,
  goTo: NavigateFunction
) => {
  setLoading(true);
  signOut(auth)
    .then(async () => {
      await updateUserInfo({ isOnline: false });
      dispatch(setUser(defaultUser));
      dispatch(deleteTaskLists());
      removeStorageUser();
      goTo("/auth");
      setLoading(false);
      toastSucc("Sign out successful");
    })
    .catch((e) => {
      setLoading(false);
      toastErr(e);
    });
};

export const BE_updateUser = async (
  {
    email,
    username,
    password,
    img,
  }: { email?: string; username?: string; password?: string; img?: string },
  dispatch: AppDispatch,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  const id = getStorageUser()?.id;
  const user = auth.currentUser;
  if (id && user) {
    if (email) {
      updateEmail(user, email)
        .then(() => {
          toastSucc("Email updated successfully");
        })
        .catch((e) => {
          CatchError(e);
        });
    }
    if (password) {
      updatePassword(user, password)
        .then(() => {
          toastSucc("Password updated successfully");
        })
        .catch((e) => {
          CatchError(e);
        });
    }

    if (username || img) {
      await updateUserInfo({ username, img });
      toastSucc("Profile updated successfully");
    }

    const userInfo = await getUserInfo(user.uid);
    dispatch(setUser(userInfo));
    setLoading(false);
  } else {
    toastErr(`${BE_updateUser}: id not found`);
    setLoading(false);
  }
};

export const BE_deleteUser = async (
  dispatch: AppDispatch,
  setLoading: SetLoadingType
) => {
  setLoading(true);
  try {
    await BE_bulkDeleteTaskLists(dispatch);
    const currentUser = auth.currentUser;
    const userId = getStorageUser()?.id;
    if (currentUser && userId) {
      const userRef = doc(db, FIREBASE_USERS_COLL, userId);
      await deleteDoc(userRef);
      await deleteUser(currentUser);
      toastSucc("Profile deleted successfully");
      dispatch(deleteUserAction());
      setLoading(false);
    } else {
      toastErr(`${BE_deleteUser}: current user not found`);
      setLoading(false);
    }
  } catch (e) {
    CatchError(e as any);
  }
};

const addUserToCollection = async ({
  id,
  email,
  username,
  img,
}: {
  id: string;
  email: string;
  username: string;
  img: string;
}) => {
  await setDoc(doc(db, FIREBASE_USERS_COLL, id), {
    isOnline: true,
    email,
    username,
    img,
    creationTime: serverTimestamp(),
    lastSeen: serverTimestamp(),
    bio: "Hey, I am a new user on this app!",
  });

  return getUserInfo(id);
};

const getUserInfo = async (id: string): Promise<UserType> => {
  const user = await getDoc(doc(db, FIREBASE_USERS_COLL, id));

  if (user.exists()) {
    const { img, isOnline, username, email, bio, creationTime, lastSeen } =
      user.data();

    return {
      id: user.id,
      img,
      isOnline,
      username,
      email,
      bio,
      creationTime: creationTime
        ? convertTime(creationTime.toDate())
        : undefined,
      lastSeen: lastSeen ? convertTime(lastSeen.toDate()) : undefined,
    };
  } else {
    toastErr("getUserInfo: User not found");
    return defaultUser;
  }
};

const updateUserInfo = async ({
  id,
  username,
  img,
  isOnline,
}: {
  id?: string;
  username?: string;
  img?: string;
  isOnline?: boolean;
}) => {
  const updateValues = {
    ...(username && { username }),
    ...(img && { img }),
    ...(typeof isOnline === "boolean" ? { isOnline } : undefined),
    lastSeen: serverTimestamp(),
  };

  if (!id) {
    const fetchedId: string | undefined = getStorageUser()?.id;
    if (!fetchedId) throw new Error("Update action failed: id not found");
    id = fetchedId;
  }

  await updateDoc(doc(db, FIREBASE_USERS_COLL, id), updateValues);
};
