import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const domainsApi = createApi({
  reducerPath: 'domainsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6797aa2bc2c861de0c6d964c.mockapi.io/',
  }),
  tagTypes: ['Domain'],
  endpoints: (builder) => ({
    // --- Get All Domains ---
    getDomains: builder.query({
      query: () => 'domain',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Domain', id: _id })),
              { type: 'Domain', id: 'LIST' },
            ]
          : [{ type: 'Domain', id: 'LIST' }],
    }),

    // --- Get Single Domain by ID ---
    getDomainById: builder.query({
      query: (id) => `domain/${id}`,
      providesTags: (result, error, id) => [{ type: 'Domain', id }],
    }),

    // --- Add New Domain ---
    addDomain: builder.mutation({
      query: (newDomain) => ({
        url: 'domain',
        method: 'POST',
        body: newDomain,
      }),
      invalidatesTags: [{ type: 'Domain', id: 'LIST' }],
    }),

    // --- Update Existing Domain ---
    updateDomain: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `domain/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Domain', id },
        { type: 'Domain', id: 'LIST' },
      ],
    }),

    // --- Delete Domain ---
    deleteDomain: builder.mutation({
      query: (id) => ({
        url: `domain/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Domain', id },
        { type: 'Domain', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetDomainsQuery,
  useGetDomainByIdQuery,
  useAddDomainMutation,
  useUpdateDomainMutation,
  useDeleteDomainMutation,
} = domainsApi;
