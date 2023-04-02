import React, {useState} from "react";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useLoginMutation} from "../../redux/auth_store/AuthApiSlice";
import {setCredentials} from "../../redux/auth_store/AuthSlice";
import {useDispatch} from "react-redux";

function Login() {
  const [user, setUser] = useState("admin");
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin");

  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({
        user,
        email,
        password,
      }).unwrap();

      dispatch(setCredentials({...userData}));
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
        <div className="card-header">Sign in</div>

        <div className="card-body">
          <Form>
            <Form.Group className="mb-3" controlId="user">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="User Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                defaultValue={email}
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
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
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
              onClick={handleLogin}
            >
              Submit
            </Button>
          </Form>

          <p>
            Need an Account?
            <br />
            <span className="line">
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
