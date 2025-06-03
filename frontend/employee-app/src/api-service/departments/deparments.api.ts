import baseApi from "../api";

export const deparmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDepartmentList: builder.query<{}, void>({
            query: () => '/departments',
            providesTags: ['DEPARTMENTS']
        }),
        createDeparment: builder.mutation({
            query: (payload) => ({
                url: '/departments',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['DEPARTMENTS']
        }),
        deleteDepartment: builder.mutation({
            query: ({id}) => ({
                url: `/departments/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['DEPARTMENTS']
        }),
        getDepartmentById: builder.query({
            query: ({id}) => `/departments/${id}`,
            providesTags: ['DEPARTMENTS']
        })
    }),
})

export const { useGetDepartmentListQuery } = deparmentApi