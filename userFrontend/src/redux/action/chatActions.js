import {
  CHAT_MESSAGE_RECEIVED,
  CHAT_MESSAGE_SENT,
  CHAT_CLEAR,
} from "../actionType/userActionType";

// Message received from socket
export const chatMessageReceived = (message) => ({
  type: CHAT_MESSAGE_RECEIVED,
  payload: message,
});

// Message sent by user/admin
export const chatMessageSent = (message) => ({
  type: CHAT_MESSAGE_SENT,
  payload: message,
});

// Clear chat (optional)
export const clearChat = () => ({
  type: CHAT_CLEAR,
});