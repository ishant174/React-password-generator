import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import UserLogin from "./components/Login/UserLogin";
import AccountCreate from "./components/Login/AccountCreate";
import Savedpass from "./components/Saved_Passwords/Savedpass";
import Toastmessage from "./components/Error/Toastmessage";
import Howto from "./components/Howto/Howto";
function App() {
  const [newpassword, setData] = useState("Loading password...");
  const [userlogin, setUserLogin] = useState([]);
  const [showToast, setShowToast] = useState({
    show: false,
    msg: "",
    type: "",
    heading: "",
  });
  const handleCloseToast = () => {
    setShowToast({
      show: false,
      msg: "",
      type: "",
      heading: "",
    });
  };
  useEffect(() => {
    checkConnection();
  }, []);
  useEffect(() => {
    fetchData();
    fetchUserlogin();
  }, []);
  const checkConnection = async () => {
    try {
      const response = await axios.get("/checkconnection");
      if (response.data === false) {
        setShowToast({
          show: true,
          msg: "Database connection error!",
          type: "Danger",
          heading: "Error",
        });
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get("/getpass");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onSignOut = () => {
    setUserLogin({
      isLogin: false,
      userData: [],
    });
  };
  const onSignIn = (userData) => {
    setUserLogin({
      isLogin: true,
      userData: userData.data.res,
    });
  };
  const fetchUserlogin = async () => {
    try {
      const user_id = Cookies.get("uid");
      if (user_id) {
        axios
          .post("/checkuser", { user_id: user_id })
          .then((response) => {
            if (response.data.token !== "") {
              onSignIn(response);
            } else {
              onSignOut();
              return false;
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      {showToast.show === true ? (
        <Toastmessage showToast={showToast} onClose={handleCloseToast} />
      ) : (
        ""
      )}
      <Header onSignOut={onSignOut} loginuser={userlogin} />

      <div className="allpages">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                loginuser={userlogin}
                password={newpassword}
                fetchData={fetchData}
              />
            }
          />
          <Route
            path="/userlogin"
            element={
              <UserLogin
                onSignOut={onSignOut}
                onSignIn={onSignIn}
                loginuser={userlogin}
              />
            }
          />
          <Route
            path="/signup"
            element={<AccountCreate loginuser={userlogin} />}
          />
          <Route
            path="/savedpasswords"
            element={
              <Savedpass
                fetchUserlogin={fetchUserlogin}
                loginuser={userlogin}
              />
            }
          />
          <Route path="/howtouse" element={<Howto />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
