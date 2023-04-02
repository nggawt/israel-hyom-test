import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        access_token: null,
        expires_in: null,
        token_type: null,
        user: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            console.log(
                "%csetCredentials: ",
                "background: green;",
                action.payload,
                state
            );

            return { ...state, ...action.payload };
        },
        logOut: (state) => {
            state = Object.keys(state).reduce((accumulator, key) => {
                return { ...accumulator, [key]: null };
            }, {});
            return state;
        },
    },
});

export const { setCredentials, logOut } = AuthSlice.actions;

export default AuthSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.access_token;
export const selectAuth = (state) => state.auth;
