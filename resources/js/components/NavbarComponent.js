import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import UseLogout from "../hooks/UseLogout";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/auth_store/AuthSlice";

function NavbarComponent() {
    const auth = useSelector(selectAuth);
    const logout = UseLogout();

    const onLogOutClicked = async (e) => {
        e.preventDefault();
        logout();
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">Isra-App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        {auth?.access_token ? (
                            <>
                                <Nav.Link as={Link} to="/posts">
                                    Posts
                                </Nav.Link>
                                <Nav.Link as={Link} to="/writers">
                                    Writers
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register">
                                    Register
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                    <Nav>
                        {auth?.access_token ? (
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={onLogOutClicked}
                            >
                                Logout
                            </Button>
                        ) : null}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
