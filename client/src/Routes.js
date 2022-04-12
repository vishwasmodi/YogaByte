import React from "react";
import {
  Route,
  Routes as Switch,
  BrowserRouter as Router,
} from "react-router-dom";

// import all the pages here
import Login from "./components/Login";
import Register from "./components/Register";
import Nav from "./components/Nav";
import PoseNet from "./components/YogaPose";
import Leaderboard from "./components/Leaderboard";

const Routes = () => {
  return (
    <Router>
      <Nav />

      <Switch>
        {/* <Route exact path='/route' component={Page} /> for all the pages */}
        <Route exact path="" element={<PoseNet />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/leaderboard" element={<Leaderboard />} />
      </Switch>
    </Router>
  );
};

export default Routes;
