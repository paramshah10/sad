import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// views
import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";

export default function Auth() {
  return (
    <main>
      <section className="relative w-full h-full py-24 min-h-screen">
        <div
          className="absolute top-0 w-full h-full bg-gray-900 bg-no-repeat bg-full"
          style={{
            backgroundImage:
              "url(" + require("assets/img/register_bg_2.png") + ")",
          }}
        ></div>
        <Switch>
          <Route path="/auth/login" exact render={props => <Login {...props} />} />
          <Route path="/auth/register" exact render={props => <Register {...props} />} />
          <Redirect from="/auth" to="/auth/login" />
        </Switch>
      </section>
    </main>
  );
}
