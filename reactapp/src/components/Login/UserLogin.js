import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Loader } from "../Loader/Loader";
import Toastmessage from "../Error/Toastmessage";
const UserLogin = (props) => {
  const getUserId = Cookies.get("uid");
  const navigate = useNavigate();
  useEffect(() => {
    if (getUserId) {
      navigate("/savedpasswords");
    }
  }, []);

  const [showLoading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    msg: "",
    type: "",
    heading: "",
  });
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (userData.email != "" && userData.password != "") {
      try {
        axios
          .post("/logincheck", userData)
          .then((response) => {
            if (response.data.res) {
              props.onSignIn(response);
              Cookies.set("uid", response.data.token);
              setLoading(false);
              setShowToast({
                show: true,
                msg: "Login Successfull! Redirecting you to your saves...",
                type: "Success",
                heading: "Success",
              });
              setTimeout(function () {
                navigate("/savedpasswords");
              }, 2000); // 2000 milliseconds (2 seconds) delay
            } else {
              console.log("here is resposne");
              setShowToast({
                show: true,
                msg: response.data.msg,
                type: "Danger",
                heading: "Error",
              });
              setLoading(false);
            }
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    } else {
      setShowToast({
        show: true,
        msg: "Please check or fill all the details carefully!",
        type: "Danger",
        heading: "Error",
      });
      setLoading(false);
      return false;
    }
  };
  const handleCloseToast = () => {
    setShowToast({
      show: false,
      msg: "",
      type: "",
      heading: "",
    });
  };

  const handleInputChange = (e) => {
    setUserData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <div className="userloginpage">
      {showToast.show === true ? (
        <Toastmessage showToast={showToast} onClose={handleCloseToast} />
      ) : (
        ""
      )}
      {showLoading ? <Loader showLoading={showLoading} /> : ""}
      <Form className="login-form" onSubmit={handleLogin}>
        <h1>User Login</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={userData.email}
            name="email"
            type="email"
            onChange={handleInputChange}
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={userData.password}
            name="password"
            onChange={handleInputChange}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <div className="createAccount">
          <Button type="submit" variant="primary">
            User Login
          </Button>
          <p>
            <Link className="links" to="/signup">
              Don't have account?
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default UserLogin;
