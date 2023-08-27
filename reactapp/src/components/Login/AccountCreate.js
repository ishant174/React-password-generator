import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "../Loader/Loader";
import Toastmessage from "../Error/Toastmessage";

const AccountCreate = () => {
  const navigate = useNavigate();
  const [showLoading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    msg: "hello",
    type: "",
    heading: "",
  });
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = (e) => {
    setUserData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const createAccount = async (e) => {
    e.preventDefault();
    try {
      axios
        .post("/signup", userData)
        .then((response) => {
          console.log(response);

          if (response.status == 200) {
            setLoading(false);
            setShowToast({
              show: true,
              msg: response.data.message,
              type: "Success",
              heading: "Success",
            });
            setTimeout(() => {
              navigate("/userlogin");
            }, 1500);
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log("error coming here");
          setShowToast({
            show: true,
            msg: error.response.data.message,
            type: "Danger",
            heading: "Error",
          });
          console.log(showToast);
          console.error(error.response.data.message);
        });
      // setData(response.data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
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
  return (
    <Form onSubmit={createAccount} className="login-form">
      {showToast.show === true ? (
        <Toastmessage showToast={showToast} onClose={handleCloseToast} />
      ) : (
        ""
      )}
      {showLoading ? <Loader showLoading={showLoading} /> : ""}

      <h1>Create Account</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          value={userData.fullName}
          type="text"
          name="fullName"
          placeholder="Enter Your Name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          value={userData.email}
          type="email"
          name="email"
          placeholder="Enter Your Email"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          value={userData.password}
          type="password"
          name="password"
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          onChange={handleInputChange}
          value={userData.confirmPassword}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
      </Form.Group>
      <div className="createAccount">
        <Button variant="primary" type="submit">
          Create
        </Button>
        <p>
          <Link className="links" to="/userlogin">
            Wanna Login?
          </Link>
        </p>
      </div>
    </Form>
  );
};
export default AccountCreate;
