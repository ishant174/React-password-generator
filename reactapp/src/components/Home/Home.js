import React, { useEffect, useState, useRef } from "react";
import Password from "../Password/Password";
import Cookies from "js-cookie";
const Home = (props) => {
  const cookieexist = Cookies.get("uid");

  return (
    <div>
      <div className="passwordpage">
        <Password
          password={props.password}
          cookieeid={cookieexist}
          fetchData={props.fetchData}
        />
      </div>
    </div>
  );
};

export default Home;
