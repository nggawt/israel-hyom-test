import {ApiSlice} from "../../api/ApiSlice";

import {store} from "../root_store/Store";
import {WriterSlice} from "../writer_store/WriterSlice";
import {PostSlice} from "../post_store/PostSlice";

export const AuthApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: {...credentials},
      }),
    }),
    login: builder.mutation({
      // query: (credentials) => ({
      //     url: "/login",
      //     method: "POST",
      //     body: { ...credentials },
      // }),
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        console.log(_arg, _queryApi, _extraOptions, fetchWithBQ);

        // get login credentials
        const loginData = await fetchWithBQ({
          url: "/login",
          method: "POST",
          body: {..._arg},
        });

        console.log("Login Init", loginData);
        if (loginData.error) return {error: loginData.error};

        store.dispatch(WriterSlice.endpoints.getWriters.initiate());
        store.dispatch(PostSlice.endpoints.getPosts.initiate());

        return loginData.data
          ? {data: loginData.data}
          : {error: loginData.error};
      },
    }),
    refreshApi: builder.mutation({

      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {

        // get auth token data
        const tokenData = await fetchWithBQ({
          url: "/refresh",
          method: "POST",
        });

        if (tokenData.error) return {error: tokenData.error};

        // initiate writers and post resources
        store.dispatch(WriterSlice.endpoints.getWriters.initiate());
        store.dispatch(PostSlice.endpoints.getPosts.initiate());

        return tokenData.data
          ? {data: tokenData.data}
          : {error: tokenData.error};
      },
    }),
    logoutApi: builder.mutation({
      query: (urlEp) => ({
        url: urlEp || "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshApiMutation,
  useLogoutApiMutation,
} = AuthApiSlice;
