import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./login";

import home from './admin_homepage';
import courseSignup from './course_signup';
import assign from './assign';
import UserSignup from './user_signup'
import Profile from './profile'
import HandlerProfile from './handler_profile'
import UserProfile from './user_profile'
import DatatablePage from './datatable';
import HandlerLogin from './handler_login'
import UserLogin from './user_login'

function App() {
  return (<Router>
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/admin' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/homepage" component={Profile}/>
            <Route path="/handler-homepage" component={HandlerProfile}/>
            <Route path="/user-homepage" component={UserProfile}/>
            <Route path="/course-signup" component={courseSignup}/>
            <Route path="/user-signup" component={UserSignup}></Route>
            <Route path="/assign" component={assign}/>
            <Route path="/data" component={DatatablePage}/>
            <Route path="/handler" component={HandlerLogin}/>
            <Route path="/user" component={UserLogin}/>
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;