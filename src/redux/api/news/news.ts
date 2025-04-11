import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    addNews: build.mutation<NEWS.addNewsRes, NEWS.addNewsReq>({
      query: (newsData) => ({
        url: "/news/add",
        method: "POST",
        body: newsData,
      }),
    }),
    getAllNews: build.query<NEWS.getAllNewsRes[], NEWS.getAllNewsReq>({
      query: () => ({
        url: "/news/get-all",
        method: "GET",
      }),
    }),
    deleteNews: build.mutation<NEWS.delNewsRes, NEWS.delNewsReq>({
      query: (id) => ({
        url: "/news/delete",
        method: "DELETE",
        body: id,
      }),
    }),
  }),
});

export const { useAddNewsMutation, useGetAllNewsQuery, useDeleteNewsMutation } =
  api;
