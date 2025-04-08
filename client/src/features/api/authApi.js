import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { userLoggedIn, userLoggedOut } from "../authSlice";
const UserBaseUrl="http://localhost:8080/api/v1/user/"
export const authApi=createApi({
    reducerPath: "authApi",
    baseQuery:fetchBaseQuery({
        baseUrl: UserBaseUrl,
        credentials: "include"
    }),
    endpoints: (build)=>({
        registerUser: build.mutation({
            query: (inputData)=>({
                url: "register",
                body: inputData,
                method: "POST"
            })
        }),
        loginUser: build.mutation({
            query: (inputData)=>({
                url: "login",
                body: inputData,
                method: "POST"
            }),
            async onQueryStarted(_,{queryFulfilled,dispatch}){
                try {
                    const result=await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}))
                } catch (error) {
                    console.log(error);
                    
                }
            }
        }),
        getUser: build.query({
            query:()=>({
                url:"profile",
                method:"GET"
            }),
            async onQueryStarted(_,{queryFulfilled,dispatch}){
                try {
                    const result=await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}))
                } catch (error) {
                    
                }
            }
        }),
        logout : build.mutation({
            
            query:()=>({
                url:'logout',
                method:"POST",

            }),
            async onQueryStarted(_,{queryFulfilled,dispatch}){
                try {
                    dispatch(userLoggedOut())
                } catch (error) {
                    console.log(error);                   
                }
            }
        }),
        updataProfile: build.mutation({
            query: (formData)=>({
                url: "profile/update",
                method:"PUT",
                body:formData
            })
        })
    })
})
export const {useLoginUserMutation,useRegisterUserMutation,useGetUserQuery,useLogoutMutation,useUpdataProfileMutation} =authApi;