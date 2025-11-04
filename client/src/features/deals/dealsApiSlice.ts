import { apiSlice } from "../../api/apiSlice";
import type { DealsInterface } from "../../interfaces/dealsInterface";
export const dealsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDeals: builder.query<DealsInterface[], void>({
      query: () => "/deals",
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetDealsQuery } = dealsApiSlice;
