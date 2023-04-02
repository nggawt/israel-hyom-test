import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "../../api/ApiSlice";
import AuthReducer from "../auth_store/AuthSlice";

export const store = configureStore({
    reducer: {
        [ApiSlice.reducerPath]: ApiSlice.reducer,
        auth: AuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ApiSlice.middleware),
    devTools: true,
});
