import React, { useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export const Header = (props) => {
  const navigate = useNavigate();
  const logoutuser = () => {
    Cookies.remove("uid");
    props.onSignOut();
    navigate("/userlogin");
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">
            <span>Password </span>
            <span>Generator & Save</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-end">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to="/">Home</Link>

              {props.loginuser.isLogin ? (
                <>
                  <Link to="/savedpasswords">Your Saves</Link>
                  <Link to="/" onClick={logoutuser}>
                    Logout
                  </Link>
                </>
              ) : (
                <Link to="/userlogin">Login</Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
