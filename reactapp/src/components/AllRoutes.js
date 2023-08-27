import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "./Login/UserLogin";
import Home from "./Home/Home";
import { Savedpass } from "./Saved_Passwords/Savedpass";
import Howto from "./Howto/Howto";
const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route path="/userlogin" component={UserLogin} />
        <Route path="/savedpasswords" component={Savedpass} />
        <Route path="/howtouse" component={Howto} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
