import React, { useEffect, useState, useRef } from "react";
import "./Savedpass.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Cookies from "js-cookie";
import Alert from "react-bootstrap/Alert";
const Savedpass = (props) => {
  const navigate = useNavigate();
  const cookieexist = Cookies.get("uid");
  const [searchInput, setSearchInput] = useState("");
  const [savedpasswords, setSavedpasswords] = useState([]);
  const [filteredPasswords, setFilteredPasswords] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(-1);
  useEffect(() => {
    if (!cookieexist) {
      navigate("/userlogin");
    }
    fetchUserSavedPass();
  }, []);
  useEffect(() => {
    filterPasswords();
  }, [searchInput]);
  const fetchUserSavedPass = async () => {
    try {
      const user_id = Cookies.get("uid");
      axios
        .post("/getuserdata", { user_id: user_id })
        .then((response) => {
          setSavedpasswords(response.data);
          setFilteredPasswords(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const filterPasswords = () => {
    const filtered = savedpasswords.filter((item) =>
      item.websitelink.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredPasswords(filtered);
  };

  return (
    <>
      <div className="allsavedpass">
        <Container className="savedpass">
          <Row>
            <h1>Your Saved Passwords</h1>
          </Row>
        </Container>
        <Container className="savedpass">
          <Row>
            <div className="searchcontainer">
              <form action="" className="search">
                <input
                  className="search__input"
                  type="search"
                  placeholder="Search"
                  id="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />

                <div className="search__icon-container">
                  <label
                    htmlFor="searchInput"
                    className="search__label"
                    aria-label="Search"
                  >
                    <svg viewBox="0 0 1000 1000" title="Search">
                      <path
                        fill="currentColor"
                        d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z"
                      />
                    </svg>
                  </label>

                  <button className="search__submit" aria-label="Search">
                    <svg viewBox="0 0 1000 1000" title="Search">
                      <path
                        fill="currentColor"
                        d="M408 745a337 337 0 1 0 0-674 337 337 0 0 0 0 674zm239-19a396 396 0 0 1-239 80 398 398 0 1 1 319-159l247 248a56 56 0 0 1 0 79 56 56 0 0 1-79 0L647 726z"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </Row>
        </Container>
        <Container className="savedpasscard">
          <Row>
            {filteredPasswords.length > 0 ? (
              filteredPasswords.map((item, index) => (
                <Col
                  md="3"
                  key={index}
                  onClick={() => {
                    navigator.clipboard.writeText(item.savedpassword);
                    setCopiedIndex(index);
                    setTimeout(() => setCopiedIndex(-1), 1500);
                  }}
                >
                  <Card border="success" style={{ width: "18rem" }}>
                    <Card.Header>
                      <span className="btn">Copy</span>
                      {copiedIndex === index && (
                        <div
                          className={`copied-message ${
                            copiedIndex !== index && "hide"
                          }`}
                        >
                          Copied!
                        </div>
                      )}
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>{item.websitelink}</Card.Title>
                      <Card.Text>{item.savedpassword}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <div className="text-center">
                <Alert key="info" variant="info">
                  No Record Found!{" "}
                  <Link className="link" to="/">
                    Click here
                  </Link>
                  and Go to Homepage to Save new Password
                </Alert>
              </div>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Savedpass;
