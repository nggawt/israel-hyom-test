import { Outlet } from "react-router-dom";
import FooterComponent from "./FooterComponent";
import NavbarComponent from "./NavbarComponent";

const Layout = () => {
    return (
        <>
            <NavbarComponent />
            <div className="container">
                <div className="row">
                    <Outlet />
                </div>
            </div>
            <FooterComponent />
        </>
    );
};

export default Layout;
