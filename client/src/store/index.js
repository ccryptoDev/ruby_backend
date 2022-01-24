import { compose, createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { createPromise } from "redux-promise-middleware";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [
  thunkMiddleware,
  createPromise({ promiseTypeSuffixes: ["REQ", "ACK", "ERR"] }),
];

export default function (initialState) {
  if (process.env.NODE_ENV !== "production") {
    middleware.push(createLogger({ level: "info", collapsed: true }));
  }
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware)),
  );
}
