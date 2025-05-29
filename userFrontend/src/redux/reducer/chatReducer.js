import {
  CHAT_MESSAGE_RECEIVED,
  CHAT_MESSAGE_SENT,
  CHAT_CLEAR,
} from "../actionType/userActionType";

const initialState = {
  messages: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_MESSAGE_RECEIVED:
    case CHAT_MESSAGE_SENT:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case CHAT_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default chatReducer;