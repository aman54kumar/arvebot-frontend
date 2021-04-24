import { createStore } from "redux";

const initialState = {
  person: [{ id: 1, nationalID: "12134" }],
  people: {
    nationalID: "",
    parents: {},
    partners: {},
    siblings: {},
    children: {},
  },
};

const reducer = (state = initialState, action) => {
  if (action.type === "ADD_PERSON") {
    return Object.assign({}, state, {
      person: state.person.concat(action.payload),
    });
  }
  return state;
};

const store = createStore(reducer);

export default store;
