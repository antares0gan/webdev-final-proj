import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducers from './reducers/reducer.js';
// import Welcome from "./components/welcome.component";
import thunkMiddleware from 'redux-thunk';
import Login from './Login.js'
import Registration from './Registration.js'
import {
    BrowserRouter, Switch,
    Route, Redirect, Link
} from "react-router-dom";
// import UserLogin from "./containers/login.container";
// import Pokemons from "./containers/pokemons.container";
// import Register from "./containers/register.container";
// import LoggedInComponent from './components/loggedin.component'

const userStore = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
<Provider store={userStore}>
     <BrowserRouter>
       <Switch>
            {/*<Route path="/welcome" component={Welcome}/>
            <Route path="/login" component={UserLogin}/>
            <Route path="/register" component={Register}/>*/}
            <Route exact path="/login" component={Login}/>
            <Route exact path="/registration" component={Registration}/>
            <Route render={() => <h1>Not found!</h1>} />
       </Switch>
     </BrowserRouter>
   </Provider>, document.getElementById('root')
)
