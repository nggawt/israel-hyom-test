import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { selectAuth } from "../../redux/auth_store/AuthSlice";

const PublicRoutes = () => {
    const auth = useSelector(selectAuth);
    const loc = useLocation();

    const urlGo = loc.state?.from || "/posts";
    return !auth?.access_token ? <Outlet /> : <Navigate replace to={urlGo} />;
};

export default PublicRoutes;
