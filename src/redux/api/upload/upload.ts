import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    uploadImage: build.mutation({
      query: (formData) => ({
        url: "/file/upload",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = api;
