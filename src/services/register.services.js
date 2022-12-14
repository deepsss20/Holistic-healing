import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const registerApi = createApi({
    reducerPath:"register",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:8080/api"
    }),
    endpoints:(builder)=>{
        return(
            {
                userRegistration:builder.mutation({
                    query:(body)=>({
                        url:"/create/user",
                        method:"POST",
                        body,
                    }),
                }),
                userLogin:builder.mutation({
                    query:(body)=>({
                     url:"/signIn/user",
                     method:"POST",
                     body,
                    }) 
                 })
            }
        )
    }
})

export const {useUserRegistrationMutation, useUserLoginMutation} = registerApi