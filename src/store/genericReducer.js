import { ChatbotState } from "../Components/InheritanceCalculatorComponents/ChatbotComponent/Generics";

const initialState = ChatbotState;

const genericReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_GENERIC":
      return action.payload;
    default:
      return state;
  }
};

export default genericReducer;
