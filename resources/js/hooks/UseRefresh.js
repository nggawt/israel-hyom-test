import { useDispatch } from "react-redux";
import { useRefreshApiMutation } from "../redux/auth_store/AuthApiSlice";
import { setCredentials } from "../redux/auth_store/AuthSlice";
import { ColorLoger } from "../utils/helpers/ColorLoger";

const useRefresh = () => {
    const [refreshApi, { isLoading }] = useRefreshApiMutation();
    const dispatch = useDispatch();
    const refresh = async (url) => {
        const urlEp = url || "/refresh";
        try {
            const userData = await refreshApi(urlEp).unwrap();
            dispatch(setCredentials({ ...userData }));
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                ColorLoger(err, "red", false, false, 30, 1, "gray", 15, {
                    isLoading,
                });
            } else if (err.originalStatus === 400) {
                console.log("Response error400: ", userData);
            } else if (err.originalStatus === 401) {
                console.log("Response error401: ", "401");
            } else {
                console.log("Response noStatusCode: ", err);
            }
        }
        return isLoading;
    };
    return refresh;
};

export default useRefresh;
