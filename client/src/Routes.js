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
import YogaPose from "./components/YogaPose";
import Leaderboard from "./components/Leaderboard";

const Routes = () => {
  return (
    <Router>
      <Nav />

      <Switch>
        {/* <Route exact path='/route' component={Page} /> for all the pages */}
        <Route exact path="" element={<YogaPose />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/leaderboard" element={<Leaderboard />} />
        {/* <Route exact path="/addproject" element={<AddProjectPage />} />
        <Route path="/profile/:username" element={<ProfilePage />} /> */}
      </Switch>
    </Router>
  );
};

export default Routes;
