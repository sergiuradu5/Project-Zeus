import {
  addDoc,
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  or,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { getStorageUser } from "../local-storage/local-storage-functions";
import { setChats, setIsChatTab } from "../store/chats/chat-slice";
import { AppDispatch } from "../store/store";
import { ChatType } from "../types/chat-type";
import { SetLoadingType } from "../types/set-loading-type";
import convertTime from "../utils/convert-time";
import { toastErr } from "../utils/toast";
import { db } from "./firebase";
import { FIREBASE_CHATS_COLL } from "./firebase-constants";

export const BE_startChat = async (
  receiverId: string,
  dispatch: AppDispatch,
  setLoading: SetLoadingType
) => {
  setLoading(true);
  const senderId = getStorageUser()!.id;

  const q = query(
    collection(db, FIREBASE_CHATS_COLL),
    or(
      and(
        where("senderId", "==", senderId),
        where("receiverId", "==", receiverId)
      ),
      and(
        where("senderId", "==", receiverId),
        where("receiverId", "==", senderId)
      )
    )
  );

  const response = await getDocs(q);

  if (response.empty) {
    const newChatRef = await addDoc(collection(db, FIREBASE_CHATS_COLL), {
      senderId,
      receiverId,
      lastMessage: "",
      updatedAt: serverTimestamp(),
      senderToReceiverNewMsgCount: 0,
      receiverToSenderNewMsgCount: 0,
    });

    const newChatDoc = await getDoc(doc(db, newChatRef.path));

    if (!newChatDoc.exists()) {
      toastErr(`${BE_startChat.name}: Document does not exist`);
    }
  }
  setLoading(false);
  dispatch(setIsChatTab(true));
};

export const BE_getChats = async (dispatch: AppDispatch) => {
  const userId = getStorageUser()!.id;
  const q = query(
    collection(db, FIREBASE_CHATS_COLL),
    or(where("senderId", "==", userId), where("receiverId", "==", userId)),
    orderBy("updatedAt", "desc")
  );

  onSnapshot(q, (chatSnapshot) => {
    const chats: ChatType[] = [];
    chatSnapshot.forEach((snapshot) => {
      const {
        senderId,
        receiverId,
        updatedAt,
        lastMessage,
        senderToReceiverNewMsgCount,
        receiverToSenderNewMsgCount,
      } = snapshot.data();
      chats.push({
        id: snapshot.id,
        senderId,
        receiverId,
        updatedAt: convertTime(updatedAt?.toDate()),
        lastMessage,
        senderToReceiverNewMsgCount,
        receiverToSenderNewMsgCount,
      });
    });
    dispatch(setChats(chats));
  });
};

export const currentUserIsSender = (senderId: string) => {
  const currentUserId = getStorageUser()!.id;
  return senderId === currentUserId;
};
