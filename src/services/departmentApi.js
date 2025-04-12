import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const departmentApi = createApi({
    reducerPath:'departmentApi',
    baseQuery:fetchBaseQuery({ 
        // baseUrl: 'https://static-api-react-3fd8b5ce2-react-3fd997eba-urtjok3rza-wl.a.run.app',
        baseUrl: 'https://localhost:8080' ,
        prepareHeaders: (headers, {getState})=>{
            const token = getState().auth.token;
            if(token){
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes:['Departments'],
    endpoints: (builder) => ({
        getAllDepartments: builder.query({
            query:()=>({
                url:'/departments'
        }),
            providesTags: ['Departments']
        }),
        addDepartment: builder.mutation({
            query: (newDpt) => ({
                url:'/add/department',
                method:'POST',
                body: newDpt
            }),
            invalidatesTags: ['Departments']
        }),
    })
})

export const {useGetAllDepartmentsQuery, useAddDepartmentMutation} = departmentApi;
export default departmentApi;