import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import "assets/styles/index.css";
// import './index.sass'

// layouts

import Admin from "layouts/Admin.js";
// import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import Login from "views/auth/Login";
import Register from "views/auth/Register";

//firebase
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import firebaseConfig from 'lib/firebaseConfig'

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();
const auth = firebase.auth();

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/login" render={props => <Login {...props} auth={auth} />} />
      <Route path="/register" render={props => <Register {...props} db={db} auth={auth}/>} />
      {/* add routes without layouts */}
      <Route path="/landing" exact component={Landing} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/" exact render={props => <Index {...props} db={db} />} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
