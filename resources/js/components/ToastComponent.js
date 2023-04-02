import React, { useState } from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";

function ToastShift({ show, setShow, masseges }) {
    return (
        <ToastContainer
            className="p-3"
            style={{ zIndex: 9 }}
            position="top-end"
        >
            <Toast
                onClose={() => setShow(false)}
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
                    <strong className="me-auto">
                        {masseges && masseges.header
                            ? masseges.header
                            : "Bootstrap"}
                    </strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>
                    {masseges && masseges.body
                        ? masseges.body
                        : "Woohoo, you're reading this text in a Toast!"}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default ToastShift;
