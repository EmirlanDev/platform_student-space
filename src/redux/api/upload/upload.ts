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
  }),
});

export const { useUploadImageMutation } = api;
