import type { Employee } from "../../store/employee/employee.types";
import baseApi from "../api";
import type { GetEmployeeListResponse, GetEmployeeListRequest } from "./types";

export const employeeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEmployeeList: builder.query<GetEmployeeListResponse, void>({
            query: () => '/employees',
            providesTags: ['EMPLOYEES']
        }),
        createEmployee: builder.mutation<Employee, Employee> ({
            query: (payload) => ({
                url: '/employees',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['EMPLOYEES']
        }),
        editEmployee: builder.mutation<Employee, Employee> ({
            query: (payload) => ({
                url: `/employees/${payload.id}`,
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: ['EMPLOYEES']
        }),
        deleteEmployee: builder.mutation<any, {id:number}>({
            query: ({id}) => ({
                url: `/employees/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['EMPLOYEES']
        }),
        getEmployeeById: builder.query({
            query: ({id}) => `/employees/${id}`,
            providesTags: ['EMPLOYEES']
        })
    }),
})

export const { useGetEmployeeListQuery, useDeleteEmployeeMutation, useGetEmployeeByIdQuery, useCreateEmployeeMutation, useEditEmployeeMutation } = employeeApi