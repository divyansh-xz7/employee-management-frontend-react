import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const countryApi = createApi({
    reducerPath:'countryApi',
    baseQuery:fetchBaseQuery({ 
        // baseUrl: 'https://static-api-react-3fd8b5ce2-react-3fd997eba-urtjok3rza-wl.a.run.app',
        baseUrl: 'https://localhost:8080' ,
    }),
    endpoints: (builder) => ({
        getCountry: builder.query({
            query:()=>({
                url:'/countries'
        }),
        }),
        
    })
})

export const {useGetCountryQuery} = countryApi;
export default countryApi;