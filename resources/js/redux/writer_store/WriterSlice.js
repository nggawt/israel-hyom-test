import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import {ApiSlice} from "../../api/ApiSlice";

const writersAdapter = createEntityAdapter({
  selectId: (writers) => {
    return writers?.current_page || writers;
  },
});

// define initial state for excepted data fialds
const initialState = writersAdapter.getInitialState({
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
export const WriterSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWriters: builder.query({
      query: (pageData) => ({
        url: `/writers?${new URLSearchParams({
          ...defaultUrlParams,
          ...pageData,
        }).toString()}`,
        headers: {
          ContentType: "application/json",
          Accept: "application/json",
        },
      }),
      transformResponse: (responseData) => {
        return writersAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) =>
        Array.isArray(result)
          ? [
            {type: "Writer", id: "LIST"},
            ...result?.ids.map((id) => ({type: "Writer", id})),
          ]
          : [{type: "Writer", id: "LIST"}],
    }),
    addNewWriter: builder.mutation({
      query: (initialWriter) => ({
        url: "/writers",
        method: "POST",
        body: {
          ...initialWriter,
          userId: Number(initialWriter.userId),
        },
      }),
      invalidatesTags: (result, error, arg) => {
        return [{type: "Writer", id: arg.pageId}];
      },
    }),
    updateWriter: builder.mutation({
      query: (initialWriter) => ({
        url: `/writers/${initialWriter.id}`,
        method: "PUT",
        body: {
          ...initialWriter,
          //date: new Date().toISOString(),
        },
      }),
      invalidatesTags: (result, error, arg) => {
        return [{type: "Writer", id: arg.pageId}];
      },
    }),
    deleteWriter: builder.mutation({
      query: ({id}) => ({
        url: `/writers/${id}`,
        method: "DELETE",
        body: {id},
      }),
      invalidatesTags: (result, error, arg) => {
        return [{type: "Writer", id: arg.pageId}];
      },
    }),
  }),
});

export const {
  useGetWritersQuery,
  useWritersByUserId,
  useAddNewWriterMutation,
  useUpdateWriterMutation,
  useDeleteWriterMutation,
} = WriterSlice;

// returns the query result object
export const selectWritersResult = WriterSlice.endpoints.getWriters.select();

// Creates memoized selector
const selectWritersData = createSelector(
  selectWritersResult,
  (writersResult) => writersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllWriters,
  selectById: selectWriterById,
  selectIds: selectWriterIds,
  // Pass in a selector that returns the posts slice of state
} = writersAdapter.getSelectors(
  (state) => selectWritersData(state) ?? initialState
);
