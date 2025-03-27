import {
  fetchBaseQuery,
  BaseQueryFn,
  createApi,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/platform",
  credentials: "include",
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOption) => {
  const result = await baseQuery(args, api, extraOption);
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryExtended,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  tagTypes: ["User"],
  endpoints: () => ({}),
});
