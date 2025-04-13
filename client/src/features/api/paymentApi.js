import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const baseUrl="https://lms-wizh.onrender.com/api/v1/payment"
export const paymentApi=createApi({
    reducerPath: "paymentApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
        credentials:"include",        
    }),
    endpoints:(build)=>({
        getAllPurchasedCourseOfCreator:build.query({
            query:()=>({
                url:"/",
                method:"GET"
            })
        })
    })
})
export const {useGetAllPurchasedCourseOfCreatorQuery}=paymentApi