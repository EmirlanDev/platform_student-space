import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<USER.getUserProfileRes, USER.getUserProfileReq>({
      query: () => ({
        url: "/platform/user/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUserById: build.query<USER.getUserByIdRes, USER.getUserByIdReq>({
      query: (id) => ({
        url: `/platform/user/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    checkUser: build.query<USER.checkUserRes, USER.checkUserReq>({
      query: () => ({
        url: "/platform/user/check",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetProfileQuery, useGetUserByIdQuery, useCheckUserQuery } =
  api;
