import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { categoryApi } from "./category/categoryApi";
import { courseApi } from "./course/courseApi";
import { teacherApi } from "./techers/teacherApi";

export const store = configureStore({
  reducer: {
    [teacherApi.reducerPath]: teacherApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(teacherApi.middleware)
      .concat(categoryApi.middleware)
      .concat(courseApi.middleware),
});

setupListeners(store.dispatch);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
