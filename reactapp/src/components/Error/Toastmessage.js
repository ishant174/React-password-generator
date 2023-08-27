import React, { useState, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import "./Toastmessage.css";
const Toastmessage = (props) => {
  console.log(props);
  const [show, setShow] = useState(props.showToast.show);
  const closeToast = (e) => {
    props.onClose();
  };
  return (
    <div>
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        <div
          style={{
            position: "fixed",
            top: "20px", // Adjust the distance from the top
            right: "20px", // Adjust the distance from the right
            zIndex: 9999,
          }}
        >
          <Toast
            bg={props.showToast.type.toLowerCase()}
            onClose={closeToast}
            show={show}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{props.showToast.heading}</strong>
            </Toast.Header>
            <Toast.Body>{props.showToast.msg}</Toast.Body>
          </Toast>
        </div>
      </ToastContainer>
    </div>
  );
};

export default Toastmessage;
