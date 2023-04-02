import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefresh from "../../hooks/UseRefresh";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth_store/AuthSlice";
import { Spinner } from "react-bootstrap";
import { ColorLoger } from "../../utils/helpers/ColorLoger";



const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefresh();
    const auth = useSelector(selectAuth);

    useEffect(() => {
        const abortController = new AbortController();

        const verifyRefreshToken = async () => {
            const loading = await refresh();
            setIsLoading(loading);
        };

        // Avoids unwanted call to verifyRefreshToken
        !auth?.access_token ? verifyRefreshToken() : setIsLoading(false);
        return () => abortController.abort();
    }, []);

    ColorLoger("PersistLogin: ", "mix", 252, 249, 30, 1, false, 15, auth);
    return (
        <>
            {isLoading ? (
                <Spinner
                    className="d-flex justify-content-center"
                    animation="grow"
                    variant="success"
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default PersistLogin;
