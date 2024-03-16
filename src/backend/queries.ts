import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../store/store";
import { defaultUser, setUser } from "../store/user/user-slice";
import { AuthDataType } from "../types/auth-data-type";
import { UserType } from "../types/user-type";
import { CatchError } from "../utils/catch-error";
import convertTime from "../utils/convert-time";
import { generateAvatarImgLink } from "../utils/generate-avatar";
import { toastErr, toastSucc } from "../utils/toast";
import { SetIsLoadingType } from "./../types/set-is-loading-type";
import { auth, db, usersColl } from "./firebase";

export const BE_signUp = async (
  { email, password, confirmPassword }: AuthDataType,
  setIsLoading: SetIsLoadingType,
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
  setIsLoading: SetIsLoadingType,
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
      goTo("/dashboard");
      resetForm();
      // ...
    })
    .catch((error) => {
      CatchError(error);
      setIsLoading(false);
    });
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
  await setDoc(doc(db, usersColl, id), {
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
  const user = await getDoc(doc(db, usersColl, id));

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
  id: string;
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

  await updateDoc(doc(db, usersColl, id), updateValues);
};

const getStorageUser = (): UserType | null => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  else return null;
};
