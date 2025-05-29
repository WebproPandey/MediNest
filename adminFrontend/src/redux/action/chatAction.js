import { REMOVE_CONSULTATION_NOTIFICATION , NEW_CONSULTATION_RECEIVED, ADD_CHAT_MESSAGE } from "../actionType/adminAction";

export const newConsultationReceived = (consultation) => ({
  type: NEW_CONSULTATION_RECEIVED,
  payload: consultation,
});

export const addChatMessage = (message) => ({
  type: ADD_CHAT_MESSAGE,
  payload: message,
});


export const removeConsultationNotification = (id) => ({
  type: REMOVE_CONSULTATION_NOTIFICATION,
  payload: id,
});