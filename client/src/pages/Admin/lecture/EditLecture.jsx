import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import LectureTab from './LectureTab'
import { useGetLectureByLectureIdQuery } from '@/features/api/courseApi'

export default function EditLecture() {
  const param = useParams();
  const { courseId, lectureId } = param
  const { data, isLoading, isSuccess, isError, error,refetch} = useGetLectureByLectureIdQuery({ courseId, lectureId })
  useEffect(()=>{
    refetch()
  },[])
  return (
    isLoading ? (<div>Loading.....</div>) : (

      <div>
        <div className='flex flex-col justify-center'>
          <div className='flex items-center gap-2' >
            <Link to={`/admin/course/${courseId}/lecture/`} >
              <Button size="icon" variant="outline" className="rounded-full cursor-pointer">
                <ArrowLeft size={16} />
              </Button>
            </Link>
            <h1 className="font-bold text-xl">Update Your Lecture</h1>
          </div>
          <LectureTab lectureData={data.lecture} />
        </div>
      </div>)
  )
}
