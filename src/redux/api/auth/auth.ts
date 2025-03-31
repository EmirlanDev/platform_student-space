import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<AUTH.registerRes, AUTH.registerReq>({
      query: (userData) => ({
        url: "/platform/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    login: build.mutation<AUTH.registerRes, AUTH.loginReq>({
      query: (userData) => ({
        url: "/platform/auth/login",
        method: "POST",
        body: userData,
      }),
    }),
    logout: build.mutation<AUTH.logoutRes, AUTH.logoutReq>({
      query: () => ({
        url: "/platform/auth/logout",
        method: "POST",
      }),
    }),
    editUser: build.mutation<
      AUTH.editRes,
      { id: string; values: AUTH.editReq }
    >({
      query: ({ id, values }) => ({
        url: `/platform/auth/edit/${id}`,
        method: "PUT",
        body: values,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useEditUserMutation,
  useLogoutMutation,
} = api;
