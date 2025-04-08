import { useGetCourseWithPaymentdetailsQuery } from "@/features/api/courseApi"
import { Navigate, useParams } from "react-router-dom"

export const PurchasedCourseProtectedRoute=({children})=>{
    const {courseId}=useParams()
    const {data,isLoading}=useGetCourseWithPaymentdetailsQuery(courseId)
    if(isLoading){
        return <div>Please Wait ...</div>
    }
    return data?.paymentDetails? children:<Navigate to={`/course/${courseId}`}/>
}