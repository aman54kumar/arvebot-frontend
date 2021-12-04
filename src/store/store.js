import { createStore } from "redux";
import genericReducer from "./genericReducer";

const store = createStore(genericReducer);
export default store;
