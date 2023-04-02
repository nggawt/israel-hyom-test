import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, Outlet, Navigate } from "react-router-dom";
import { selectAuth } from "../../redux/auth_store/AuthSlice";


const AuthRoutes = () => {
    const auth = useSelector(selectAuth);
    const loc = useLocation();
    const urlParan = loc.search ? loc.pathname + loc.search : loc.pathname;
    return auth?.access_token ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: urlParan }} replace />
    );
};

export default AuthRoutes;
