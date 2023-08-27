import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "./Password.css";
import copy from "copy-text-to-clipboard";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Toastmessage from "../Error/Toastmessage";

const Password = (props) => {
  const navigate = useNavigate();
  const [showCopied, setCopied] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showsavedForm, setdavedForm] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    msg: "",
    type: "",
    heading: "",
  });
  const [weblink, setweblink] = useState("");
  const hideElement = () => {
    if (!props.cookieeid) {
      setShowToast({
        show: true,
        msg: "Please Login first! Redirecting you...",
        type: "Info",
        heading: "Redirecting...",
      });
      setTimeout(() => {
        navigate("/userlogin");
      }, 3000);
      return false;
    }
    setVisible(false);
    setdavedForm(true);
  };
  const handleBack = () => {
    setVisible(true);
    setdavedForm(false);
  };
  const handleSavePass = (e) => {
    e.preventDefault();
    const checkweblinkValid = (weblink) => {
      const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
      const isValidLink = pattern.test(weblink);
      console.log(isValidLink);
      return isValidLink;
    };
    if (!props.cookieeid) {
      setShowToast({
        show: true,
        msg: "Please login first in order to save this Password!",
        type: "Info",
        heading: "Lgin please!",
      });
      navigate("/userlogin");
      return false;
    }
    if (checkweblinkValid(weblink)) {
      const savedData = {
        weblink: weblink,
        password: props.password,
        usertoken: props.cookieeid,
      };

      axios
        .post("/savenewpass", savedData)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            setShowToast({
              show: true,
              msg: "Password Saved Successfully!",
              type: "Success",
              heading: "Saved",
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setShowToast({
        show: true,
        msg: "Please check or fill all the details carefully!",
        type: "Danger",
        heading: "Error",
      });
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
  const changeweblink = (e) => {
    console.log(e.target.value);
    setweblink(e.target.value);
  };

  const copyText = () => {
    copy(props.password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <>
      {showToast.show === true ? (
        <Toastmessage showToast={showToast} onClose={handleCloseToast} />
      ) : (
        ""
      )}
      {visible ? (
        <Card className="passwordbody">
          <Card.Body>
            <div className="form-group">
              <div className="input-group">
                <div className="input-tooltip">
                  <input
                    type="text"
                    className="form-control"
                    id="passwordfield"
                    value={props.password}
                    disabled
                  />
                  {showCopied ? (
                    <span className="input-tooltip__content">Copied!</span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="button-container">
              <button
                type="button"
                className="btn btn-primary"
                onClick={copyText}
              >
                Copy
              </button>
              <button
                type="button"
                className="btn btn-secondary generatenew"
                onClick={props.fetchData}
              >
                Generate New
              </button>
              <p className="middle">
                <Link className="links" onClick={hideElement}>
                  Wanna save this?
                </Link>
              </p>
            </div>
          </Card.Body>
        </Card>
      ) : (
        ""
      )}
      {showsavedForm ? (
        <Card className="passwordbody">
          <Card.Body>
            <Form onSubmit={handleSavePass}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Website Link</Form.Label>
                <Form.Control
                  type="text"
                  onChange={changeweblink}
                  value={weblink}
                  placeholder="Enter Website Link"
                />
                <Form.Text className="text-muted">
                  Please enter website link for which you want to save this
                  password for!
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Password"
                  value={props.password}
                  disabled
                />
              </Form.Group>
              <div className="allbtn">
                <Button variant="primary" className="savepass" type="submit">
                  Submit
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate("/savedpasswords");
                  }}
                  className="savedpass"
                  type="button"
                >
                  Your Saves
                </Button>
                <Button
                  variant="primary"
                  onClick={handleBack}
                  className="backbtn"
                  type="button"
                >
                  Back
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      ) : (
        ""
      )}
    </>
  );
};

export default Password;
