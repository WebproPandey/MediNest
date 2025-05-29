import { REMOVE_CONSULTATION_NOTIFICATION } from "../actionType/adminAction";
import { NEW_CONSULTATION_RECEIVED, ADD_CHAT_MESSAGE } from "../actionType/adminAction";

const initialState = {
  notifications: [],
  messages: [],
};

const adminChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_CONSULTATION_RECEIVED:
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case ADD_CHAT_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
     case REMOVE_CONSULTATION_NOTIFICATION:
      return { ...state, notifications: state.notifications.filter(n => n._id !== action.payload) };
    default:
      return state;
  }
};

export default adminChatReducer;