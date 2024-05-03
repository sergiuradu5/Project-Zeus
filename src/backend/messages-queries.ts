import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { setCurrentMessages } from "../store/chats/chat-slice";
import { AppDispatch } from "../store/store";
import { MessageType } from "../types/message-type";
import convertTime from "../utils/convert-time";
import { SetLoadingType } from "./../types/set-loading-type";
import { currentUserIsSender } from "./chat-queries";
import { db } from "./firebase";
import {
  FIREBASE_CHATS_COLL,
  FIREBASE_MESSAGES_COLL,
} from "./firebase-constants";
import { updateUserInfo } from "./user-queries";

export const BE_getMessages = async (
  dispatch: AppDispatch,
  chatId: string,
  setLoading: SetLoadingType
) => {
  setLoading(true);
  const q = query(
    collection(db, FIREBASE_CHATS_COLL, chatId, FIREBASE_MESSAGES_COLL),
    orderBy("createdAt", "asc")
  );

  onSnapshot(q, (messagesSnapshot) => {
    const messages: MessageType[] = [];

    messagesSnapshot.forEach((m) => {
      const { senderId, content, createdAt } = m.data();
      messages.push({
        id: m.id,
        senderId,
        content,
        createdAt: convertTime(createdAt?.toDate()),
      });
    });
    dispatch(setCurrentMessages(messages));
    setLoading(false);
  });
};

export const BE_sendMessage = async (
  chatId: string,
  data: MessageType,
  setLoading: SetLoadingType
) => {
  setLoading(true);

  const res = await addDoc(
    collection(db, FIREBASE_CHATS_COLL, chatId, FIREBASE_MESSAGES_COLL),
    {
      ...data,
      createdAt: serverTimestamp(),
    }
  );
  const newMessage = await getDoc(doc(db, res.path));
  if (newMessage.exists()) {
    setLoading(false);
    await updateNewMessageCount(chatId, true);
    await updateLastMessage(chatId, newMessage.data().content);
    await updateUserInfo({}); // update last seen
  }
};

export const updateNewMessageCount = async (
  chatId: string,
  reset?: boolean
) => {
  const chat = await getDoc(doc(db, FIREBASE_CHATS_COLL, chatId));

  let senderToReceiverNewMsgCount = chat.data()?.senderToReceiverNewMsgCount;
  let receiverToSenderNewMsgCount = chat.data()?.receiverToSenderNewMsgCount;

  if (currentUserIsSender(chat.data()?.senderId)) {
    if (reset) {
      receiverToSenderNewMsgCount = 0;
    } else {
      senderToReceiverNewMsgCount++;
    }
  } else {
    if (reset) {
      senderToReceiverNewMsgCount = 0;
    } else {
      receiverToSenderNewMsgCount++;
    }
  }

  await updateDoc(doc(db, FIREBASE_CHATS_COLL, chatId), {
    updatedAt: serverTimestamp(),
    senderToReceiverNewMsgCount,
    receiverToSenderNewMsgCount,
  });
};

export const updateLastMessage = async (chatId: string, content: string) => {
  await updateNewMessageCount(chatId);
  await updateDoc(doc(db, FIREBASE_CHATS_COLL, chatId), {
    lastMessage: content,
    updatedAt: serverTimestamp(),
  });
};
