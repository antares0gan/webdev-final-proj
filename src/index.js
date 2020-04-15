import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import reducers from './reducers/reducer';
import thunkMiddleware from 'redux-thunk';
import {
    BrowserRouter, Switch,
    Route, Redirect, Link
} from "react-router-dom";
import UserLogin from "./containers/login.container";
import HomePage from "./containers/home.container";
import SearchResult from "./containers/result.container";
import Register from "./containers/register.container";
import UserProfile from "./containers/profile.container";
import LoggedInComponent from './components/loggedin.component';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const userStore = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
  <Provider store={userStore}>
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={HomePage}/>
        <Route path="/result" component={SearchResult}/>
        <Route path="/login" component={UserLogin}/>
        <Route path="/register" component={Register}/>
        {/* <Route path="/profile" component={LoggedInComponent(UserProfile)}/> */}
        <Redirect exact from="/" to="home"/>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);