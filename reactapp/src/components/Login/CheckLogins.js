import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const CheckLogins = () => {
  const [userlogin, setUserLogin] = useState([]);
  const navigate = useNavigate();
  const CheckUserLogin = async () => {
    console.log("Check User Login here!");
    try {
      const user_id = Cookies.get("uid");
      if (user_id) {
        axios
          .post("/checkuser", { user_id: user_id })
          .then((response) => {
            if (response.data.token !== "") {
              setUserLogin({
                isLogin: true,
                userData: response.data.res,
              });
            } else {
              setUserLogin({
                isLogin: false,
                userData: [],
              });
              return false;
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.log("Please login!");
        navigate("/");
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const UserLogout = async () => {
    console.log("User Logout");
  };
  return <div>CheckLogins</div>;
};

export default CheckLogins;
