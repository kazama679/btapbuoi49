import { combineReducers, createStore } from "redux";
import { bookReducer } from "./reducers/bookRendecer";

const rootReducer=combineReducers({
    bookReducer
})
export const store = createStore(rootReducer);