import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/" }),
  // tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query({
        query: () => 'category/',

      // query: (page = 1) => `albums?_page=${page}&_limit=10`,
      // providesTags: ["Albums"],

      // query: () => "",
      //   providesTags: (result) =>
      //     result ? result.map(({ id }) => ({ type: 'Category', id })) : [],
    }),
    createTeacher: builder.mutation({
      query: (teacherData) => ({
        url: 'course/',
        method: 'POST',
        body: teacherData,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
