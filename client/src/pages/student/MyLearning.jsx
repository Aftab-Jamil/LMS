import React from 'react'
import Course from './Course';
import CourseSkeleton from '../CourseSkeleton';
import { useGetCourseWithPaymentdetailsQuery, useGetEnrolledCoursesQuery } from '@/features/api/courseApi';
import { Link } from 'react-router-dom';

export default function MyLearning() {
  const {data,isSuccess,isError,isLoading}=useGetEnrolledCoursesQuery()
  return (
    <div className='max-w-4xl md:mx-auto mt-20 mx-2 p-2'>
        <h1 className='md:text-2xl font-bold mb-2 text-xl'>My Learning :</h1>
        
            {isLoading ? (<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
                {Array.from({length: 3}).map((_,index)=><CourseSkeleton key={index}/>)}
                </div>
            ):(
                data?.courses?.length===0? <><h1 className='md:text-xl text-gray-800'>You haven't enrolled in any of the courses:</h1></>:<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
                {data?.courses?.map((course)=>
                <Link  to={`/course/${course._id}`}>
                <Course key={course._id} course={course}/>
                </Link>)}
                </div>
            
                
            )
            
            }
        
    </div>
  )
}
