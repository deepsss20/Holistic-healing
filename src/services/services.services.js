import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const serviceDetailsApi = createApi({
    reducerPath:"service",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:8080/api",
       prepareHeaders:(headers)=>{
        headers.set("Authorization",sessionStorage.getItem("token"))
        return headers
       }
    }),
    endpoints:(builder)=>{
        return(
            {
                serviceDetailsApi: builder.query({
                    query:()=>'/get/service',
                })
            }
        )
    }
})

export const {useServiceDetailsApiQuery} = serviceDetailsApi