import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const employeeApi = createApi({
    reducerPath:'employeeApi',
    baseQuery:fetchBaseQuery({ 
        // baseUrl: 'https://static-api-react-3fd8b5ce2-react-3fd997eba-urtjok3rza-wl.a.run.app',
        baseUrl: 'https://localhost:8080' ,
        prepareHeaders: (headers, {getState})=>{
            const token = getState().auth.token;
            if(token){
                headers.set('authorization', `Bearer ${token}`);
            }
            headers.set('Access-Control-Allow-Origin', '*');
            return headers;
        }
    }),
    tagTypes:['Employees'],
    endpoints: (builder) => ({
        getAllEmployees: builder.query({
            query:()=>({
                url:'/employees'
            }),
            providesTags: ['Employees']
        }),
        allocateDepartment: builder.mutation({
            query: (data) => ({
                url:'/add/employee/department',
                method:'POST',
                body: data
            }),
            invalidatesTags:['Employees']
        }),
        deallocateDepartment: builder.mutation({
            query: (data) => ({
                url:'/remove/employee/department',
                method:'DELETE',
                body: data
            }),
            invalidatesTags:['Employees']
        }),
        allocateManager: builder.mutation({
            query: (data) => ({
                url:'/allocate/manager',
                method:'POST',
                body: data
            }),
            invalidatesTags:['Employees']
        }),
        deallocateManager: builder.mutation({
            query: (empId) => ({
                url:`/remove/manager/${empId}`,
                method:'DELETE',
            }),
            invalidatesTags:['Employees']
        }),
        deleteEmployee: builder.mutation({
            query: (empId) => ({
                url:`employee/${empId}`,
                method:'DELETE',
            }),
            invalidatesTags:['Employees']
        }),
        updateEmployee: builder.mutation({
            query: (data) => ({
                url :'/employee',
                method:'PUT',
                body:data
            }),
            invalidatesTags:['Employees']
        })

    })
})

export const {useGetAllEmployeesQuery, useAllocateDepartmentMutation, useDeallocateDepartmentMutation, useAllocateManagerMutation, useDeallocateManagerMutation, useDeleteEmployeeMutation, useUpdateEmployeeMutation} = employeeApi;
export default employeeApi;