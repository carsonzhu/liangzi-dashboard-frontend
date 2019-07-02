import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";

import { createRootReducer, saga } from "./modules";

const isDev =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "custom";

const logger = createLogger({
  predicate: (getState, action) => action.type !== "@@router/LOCATION_CHANGE",
  collapsed: (getState, action, logEntry) => !logEntry.error
});

export const history = createBrowserHistory();

export default preloadState => {
  const rootReducer = createRootReducer(history);

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [routerMiddleware(history), sagaMiddleware];
  if (isDev) middlewares.push(logger);

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadState, composedEnhancers);

  sagaMiddleware.run(saga);

  return store;
};
