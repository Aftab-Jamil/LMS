import EditLecture from "@/pages/Admin/lecture/EditLecture"
import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const baseUrl="https://lms-wizh.onrender.com/api/v1/course"
export const courseApi=createApi({
    reducerPath: "createApi",
    tagTypes: ["Refetch_courses_of_creator","Refetch_updated_course_detail","Refetch_updates_Lectures","Refetch_Updated_Particular_Lecture"],
    baseQuery: fetchBaseQuery({
        baseUrl,
        credentials:"include",        
    }),
    endpoints : (build)=>({
        createCourse: build.mutation({
            query: ({courseTitle,category})=>({
                url: '',
                method: "POST",
                body: {courseTitle,category}
            }),
            invalidatesTags:["Refetch_courses_of_creator"]
        }),
        getSearchCourse: build.query({
            query: ({searchQuery, categories, sortByPrice})=>{
                let querySearchString=`/search?query=${encodeURIComponent(searchQuery)}`
                if(categories && categories.length>0){
                    const categoriesString=categories.map(encodeURIComponent).join(",");
                    querySearchString+=`&categories=${categoriesString}`
                }
                if(sortByPrice){
                    querySearchString+=`&sortByPrice=${encodeURIComponent(sortByPrice)}`
                }
                return {
                    url: querySearchString,
                    method: "GET"
                }

            }
        })
        ,
        getAllCoursesOfACreator: build.query({
            query: ()=>({
                url: "",
                method: "GET"
            }),
            providesTags:["Refetch_courses_of_creator"]
        }),
        editCourse:build.mutation({
            query:({courseId,formData})=>({
                url: `/${courseId}`,
                method:"PUT",
                body:formData
            }),
            invalidatesTags:["Refetch_updated_course_detail","Refetch_courses_of_creator"]
        }),
        getCourseByCourseId:build.query({
            query:(courseId)=>({
                url: `/${courseId}`,
                method:"GET"
            }),
            providesTags:["Refetch_updated_course_detail"]

        }),
        getCourseWithPaymentdetails:build.query({
                query:(courseId)=>({
                    url:`/course-details/${courseId}`,
                    method:"GET"
                })
        }),
        createLecture:build.mutation({
            query:({courseId,lectureTitle})=>({
                url:`/${courseId}/lecture`,
                method:"POST",
                body:{lectureTitle}
            })
        }),
        getLectureOfCourse:build.query({
            query:(courseId)=>({
                url:`/${courseId}/lecture`,
                method:"GET"
            }),
            providesTags:["Refetch_updates_Lectures"]
        }),
        getLectureByLectureId:build.query({
            query:({courseId,lectureId})=>({
                url:`/${courseId}/lecture/${lectureId}`,
                method:"GET"
            }),
            providesTags:["Refetch_Updated_Particular_Lecture"]
        }),
        removeLectureByLectureId:build.mutation({
            query:({courseId,lectureId})=>({
                url:`/${courseId}/lecture/${lectureId}`,
                method:'DELETE'
            }),
            invalidatesTags:["Refetch_updates_Lectures"]            
        }),
        editLecture:build.mutation({
            query:({courseId,lectureId,lectureTitle,videoInfo,isPreviewFree})=>({
                url:`/${courseId}/lecture/${lectureId}`,
                method:"PUT",
                body:{lectureTitle,videoInfo,isPreviewFree}
            }),
            invalidatesTags:["Refetch_updates_Lectures","Refetch_Updated_Particular_Lecture"] 
        }),
        togglePublishCourse:build.mutation({
            query:({courseId,publish})=>({
                url:`/${courseId}`,
                method:"PATCH",
                body:{publish}
            }),
            invalidatesTags:["Refetch_courses_of_creator"]
        }),
        getAllPublishedCourse:build.query({
            query:()=>({
                url:"/published-course",
                method:"GET"
            })
        }),
        getEnrolledCourses:build.query({
            query:()=>({
                url:"/enrolled-courses",
                method:"GET"
            })
        }),
        
    })
})
export const {useCreateCourseMutation,useGetAllCoursesOfACreatorQuery,useEditCourseMutation,useGetCourseByCourseIdQuery,useCreateLectureMutation,useGetLectureOfCourseQuery,useGetLectureByLectureIdQuery,useRemoveLectureByLectureIdMutation,useEditLectureMutation,useTogglePublishCourseMutation,useGetAllPublishedCourseQuery,useGetCourseWithPaymentdetailsQuery,useGetEnrolledCoursesQuery,useGetSearchCourseQuery}=courseApi