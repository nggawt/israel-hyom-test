import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import {ApiSlice} from "../../api/ApiSlice";

const postAdapter = createEntityAdapter({
  selectId: (posts) => {
    return posts?.current_page || posts;
  },
});

// define initial excepted data fialds
const initialState = postAdapter.getInitialState({
  current_page: null,
  data: [],
  first_page_url: "",
  from: 1,
  last_page: null,
  last_page_url: null,
  links: [],
  next_page_url: null,
  path: "",
  per_page: 10,
  prev_page_url: null,
  total: null,
});

// defualt per page input
const defaultUrlParams = {
  per_page: 10,
};

// redux rtk api slice reponsable for crud oparation and cache system out of
// box
export const PostSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (pageData) => ({
        url: `/posts?${new URLSearchParams({
          ...defaultUrlParams,
          ...pageData,
        }).toString()}`,
        headers: {
          ContentType: "application/json",
          Accept: "application/json",
        },
      }),
      transformResponse: (responseData) => {
        return postAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        return Array.isArray(result)
          ? [
            {type: "Post", id: "LIST"},
            ...result?.ids.map((id) => ({type: "Post", id})),
          ]
          : [{type: "Post", id: "LIST"}]
      }
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: (result, error, arg) => {
        return [{type: "Post", id: arg.pageId}];
      },
    }),
    updatePost: builder.mutation({
      query: (initialPost) => ({
        url: `/posts/${initialPost.id}`,
        method: "PUT",
        body: {
          ...initialPost,
        },
      }),
      invalidatesTags: (result, error, arg) => {
        return [{type: "Post", id: arg.pageId}];
      },
    }),
    deletePost: builder.mutation({
      query: ({id}) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        body: {id},
      }),
      invalidatesTags: (result, error, arg) => {
        return [{type: "Post", id: arg.pageId}];
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = PostSlice;

// returns the query result object
export const selectPostsResult = PostSlice.endpoints.getPosts.select();

// Creates memoized selector
const selectPostsData = createSelector(
  selectPostsResult,
  (postResult) => postResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postAdapter.getSelectors(
  (state) => selectPostsData(state) ?? initialState
);
