import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { currentUserIsSender } from "../../backend/chat-queries";
import { MessageType } from "../../types/message-type";
import { UserType } from "../../types/user-type";
import { ChatType } from "./../../types/chat-type";

type ChatsState = {
  isChatsTab: boolean;
  chats: ChatType[];
  currentSelectedChat: ChatType | undefined;
  currentSelectedUser: UserType | undefined;
  isRightSideBarOpen: boolean;
  currentMessages: MessageType[];
  hasNewMessages: boolean;
};

const initialState: ChatsState = {
  isChatsTab: false,
  chats: [],
  currentSelectedChat: undefined,
  currentSelectedUser: undefined,
  isRightSideBarOpen: true,
  currentMessages: [],
  hasNewMessages: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setIsChatTab: (state, action: PayloadAction<boolean>) => {
      state.isChatsTab = action.payload;
    },
    setChats: (state, action: PayloadAction<ChatType[]>) => {
      const chats = action.payload;
      let hasNewMessages = false;
      for (const chat of chats) {
        if (chat.id && currentUserIsSender(chat.senderId)) {
          if (
            chat?.receiverToSenderNewMsgCount &&
            chat?.receiverToSenderNewMsgCount > 0
          ) {
            hasNewMessages = true;
            break;
          }
        } else {
          if (
            chat?.senderToReceiverNewMsgCount &&
            chat?.senderToReceiverNewMsgCount > 0
          ) {
            hasNewMessages = true;
            break;
          }
        }
      }

      state.chats = chats;
      state.hasNewMessages = hasNewMessages;
    },
    setCurrentSelectedChat: (state, action: PayloadAction<ChatType>) => {
      state.currentSelectedChat = action.payload;
    },
    setCurrentSelectedUser: (state, action: PayloadAction<UserType>) => {
      state.currentSelectedUser = action.payload;
    },
    setIsRightSideBarOpen: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.isRightSideBarOpen = action.payload ?? !state.isRightSideBarOpen;
    },
    setCurrentMessages: (state, action: PayloadAction<MessageType[]>) => {
      state.currentMessages = action.payload;
    },
  },
});

export const {
  setIsChatTab,
  setChats,
  setCurrentSelectedChat,
  setCurrentSelectedUser,
  setIsRightSideBarOpen,
  setCurrentMessages,
} = chatSlice.actions;

export default chatSlice;
