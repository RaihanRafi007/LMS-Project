import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const courseApi = createApi({
//   reducerPath: "courseApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/" }),
//   tagTypes: ["Course"],
//   endpoints: (builder) => ({
//     getCourse: builder.query({
//       query: () => "course/",
//     }),
//     createCourse: builder.mutation({
//       query: (courseData) => ({
//         url: "course/",
//         method: "POST",
//         body: courseData,
//         headers: {
//           "content-type": "multipart/form-data",
//         },
//       }),
//     }),
//   }),
// });

// export const { useGetCoursesQuery, useCreateCourseMutation } = courseApi;

const teacherId = localStorage.getItem("teacherId");
console.log(teacherId);

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
    tagTypes: ['Course'],
    endpoints: (builder) => ({
      getCourses: builder.query({
        query: () => `teacher-course/${teacherId}`,
        providesTags: (result) =>
          result ? result.map(({ id }) => ({ type: 'Course', id })) : [],
        // providesTags: ['Course'],
      }),
    }),
  });
  
  export const { useGetCoursesQuery } = courseApi;

