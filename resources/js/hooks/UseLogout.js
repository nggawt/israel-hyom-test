import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogoutApiMutation } from "../redux/auth_store/AuthApiSlice";
import { logOut } from "../redux/auth_store/AuthSlice";

const UseLogout = () => {
    const [logoutApi] = useLogoutApiMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loc = useLocation();

    const apiLogout = async () => {
        try {
            await logoutApi().unwrap();
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                console.log("No Server Response", err);
            } else if (err.originalStatus === 400) {
                console.log("Missing Username or Password");
            } else if (err.originalStatus === 401) {
                console.log("Unauthorized");
            } else {
                console.log("Logout Failed");
            }
        } finally {
            dispatch(logOut());
            // navigate("/login");
            // const urlParan = loc.search
            //     ? loc.pathname + loc.search
            //     : loc.pathname;
            // const urlProps = { from: urlParan, replace: true };
            // console.log("Loc", loc, urlParan, urlProps);
            // navigate("/login", { state: urlProps });
        }
    };
    return apiLogout;
};

export default UseLogout;
