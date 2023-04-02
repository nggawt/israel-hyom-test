import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// get and set base url from env variable
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? `${process.env.MIX_LOCAL_URL}:${window.location.port}/api`
    : `${process.env.MIX_WEB_URL}/api`;

export const ApiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  credentials: "include",
  prepareHeaders: (headers, {getState}) => {
    // If we have a token set in state, let's assume that we should be passing it.
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    return headers;
  },
  tagTypes: ["Auth", "Writer", "Post"],
  endpoints: (builder) => ({}),
});
