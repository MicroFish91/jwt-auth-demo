import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { applyMiddleware, compose, createStore } from "redux";
import reduxThunk from "redux-thunk";
import App from "./App";
import "./assets/styles.scss";
import Signin from "./components/auth/Signin";
import Signout from "./components/auth/Signout";
import Signup from "./components/auth/Signup";
import requireAuth from "./components/authWrappers/requireAuth"; // class-based wrapper
import RequireAuthHooksWrapper from "./components/authWrappers/RequireAuthHooksWrapper"; // function-based hook, not a wrapper
import Feature from "./components/Feature"; //protect
import BaseLayout from "./components/layout/BaseLayout";
import Welcome from "./components/Welcome";
import reducer from "./reducers/reducer";

// initializing redux store
// requires a reducer. Second argument is for redux dev-tools extension.
// let store = createStore(
//   reducer,
//   {},
//   compose(
//     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//       window.__REDUX_DEVTOOLS_EXTENSION__(),
//     applyMiddleware(reduxThunk)
//   )
// );

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  {},
  composeEnhancers(applyMiddleware(reduxThunk))
);

//provider hooks react to redux.
//Must pass redux instance to provider via "store" prop.

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <BaseLayout>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/signup" component={Signup} />
            {/* <Route path="/feature" component={requireAuth(Feature)} /> */}
            <Route
              path="/feature"
              render={() => RequireAuthHooksWrapper(Feature)}
            />
            {/* <Route
              path="/feature"
              component={() => RequireAuthHooksWrapper(Feature)}
            /> */}
            <Route path="/signout" component={Signout} />
            <Route path="/signin" component={Signin} />
          </Switch>
        </BaseLayout>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
