import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRegisterMutation } from "../../redux/auth_store/AuthApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/auth_store/AuthSlice";

function Register() {
    const [name, setName] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [register, { isLoading }] = useRegisterMutation();
    const dispatch = useDispatch();
    const [errMsg, setErrMsg] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("%cLoginCOmponent Component: ", "background:yellow;");

        try {
            const userData = await register({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            }).unwrap();

            console.log("Response userData: ", userData);
            dispatch(setCredentials({ ...userData }));
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg("No Server Response");
            } else if (err.originalStatus === 400) {
                setErrMsg("Missing Username or Password");
            } else if (err.originalStatus === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
        }
    };

    return (
        <div>
            <div className="card">
                <div className="card-header">Sign Up</div>

                <div className="card-body">
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                placeholder="User Name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="passwordConfirmation"
                        >
                            <Form.Label>Password Confirm</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={(e) =>
                                    setPasswordConfirmation(e.target.value)
                                }
                                placeholder="Confirm Password"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicCheckbox"
                        >
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={handleRegister}
                        >
                            Submit
                        </Button>
                    </Form>

                    <p>
                        You Have Account?
                        <br />
                        <span className="line">
                            <Link to="/login">Sign in</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
