export type ChatType = {
  id?: string;
  senderId: string;
  receiverId: string;
  updatedAt?: string;
  lastMessage?: string;
  senderToReceiverNewMsgCount?: number;
  receiverToSenderNewMsgCount?: number;
};
