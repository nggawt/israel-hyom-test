import React from "react";
import { Container, Navbar } from "react-bootstrap";

const FooterComponent = () => {
    return (
        <>
            <Navbar fixed="bottom" expand="lg" variant="light" bg="light">
                <Container>
                    <Navbar.Brand href="#">Home</Navbar.Brand>
                </Container>
            </Navbar>
            {/* <div className="fixed-bottom bg-light"> */}
            {/*     <p>lara url: {window.lara_url || "nop"}</p> */}
            {/*     <p>lara env: {window.lara_env || "nop"}</p> */}
            {/* </div> */}
        </>
    );
};
export default FooterComponent;
