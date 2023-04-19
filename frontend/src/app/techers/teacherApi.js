import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const teacherApi = createApi({
  reducerPath: 'teacherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: () => 'teacher/',
    }),
    createTeacher: builder.mutation({
      query: (teacherData) => ({
        url: 'teacher/',
        method: 'POST',
        body: teacherData,
      }),
    }),
    loginTeacher: builder.mutation({
      query: (teacherLoginData) => ({
        url: 'teacher/login/',
        method: 'POST',
        body: teacherLoginData,
      }),
    }),
  }),
});

export const { useGetTeachersQuery, useCreateTeacherMutation, useLoginTeacherMutation } = teacherApi;


