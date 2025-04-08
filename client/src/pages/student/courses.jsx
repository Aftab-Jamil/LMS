
import React from 'react'
import Course from './Course';
import CourseSkeleton from '../CourseSkeleton';
import { useGetAllPublishedCourseQuery } from '@/features/api/courseApi';
import { Link } from 'react-router-dom';

export default function courses() {
    const {data,isSuccess,isLoading,isError}=useGetAllPublishedCourseQuery()
    
    return (
    <div className='bg-gray-50 mx-auto dark:bg-[#313030]'>
        <div className='max-w-7xl mx-auto p-6'>
            <h2 className='font-bold text-3xl text-center mb-10'>Courses</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' >
                {
                    isLoading? (
                        Array.from({ length: 8 }).map((_, index) => (
                            <CourseSkeleton key={index} />
                          ))
                    ):data?.courses.map((course,index)=>(
                        <Link  to={`/course/${course._id}`}>
                         <Course course={course} index={index}/>
                         </Link>
                    ))
                }

            </div>
        </div>
      
    </div>
  )
}
