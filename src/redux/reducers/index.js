import {combineReducers, createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import questionReducer from "./questionReducer";

const rootReducer = combineReducers({
    questionsReducer: questionReducer
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);