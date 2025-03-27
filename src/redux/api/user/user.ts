import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<USER.getUserProfileRes, USER.getUserProfileReq>({
      query: () => ({
        url: "user/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUserById: build.query<USER.getUserByIdRes, USER.getUserByIdReq>({
      query: (id) => ({
        url: `user/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProfileQuery, useGetUserByIdQuery } = api;
