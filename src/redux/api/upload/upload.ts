import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    uploadImage: build.mutation<any, FormData>({
      query: (formData) => ({
        url: "/file/upload",
        method: "POST",
        body: formData,
      }),
    }),
    uploadBgImage: build.mutation<any, FormData>({
      query: (formData) => ({
        url: "/file/upload/background",
        method: "POST",
        body: formData,
      }),
    }),
    uploadNewsImage: build.mutation<any, FormData>({
      query: (formData) => ({
        url: "/file/upload/news",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useUploadImageMutation,
  useUploadBgImageMutation,
  useUploadNewsImageMutation,
} = api;
