import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const baseUrl="http://localhost:8080/api/v1/course-progress"
export const courseProgressApi=createApi({
    reducerPath: "courseProgressApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
        credentials:"include",        
    }),
    endpoints:(build)=>({
         getCourseProgress:build.query({
            query:({courseId})=>({
                url:`/${courseId}`,
                method:"GET"
            })
         }),
        updataLectureProgress:build.mutation({
            query:({courseId,lectureId})=>({
                url:`/${courseId}/lecture/${lectureId}`,
                method:"POST"
            })
        })
    })
})
export const {useGetCourseProgressQuery,useUpdataLectureProgressMutation}=courseProgressApi;