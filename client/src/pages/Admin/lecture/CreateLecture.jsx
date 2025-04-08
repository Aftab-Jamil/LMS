import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateLectureMutation, useGetLectureOfCourseQuery } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Lecture from './Lecture'
import { toast } from 'sonner'

export default function CreateLecture() {
    const navigate = useNavigate();
    const params = useParams();
    const { courseId } = params
    const [createLecture, { data, isLoading, isError, isSuccess, error }] = useCreateLectureMutation()
    const { data: lecturesData, isSuccess: getLectureSuccess, error: getLectureError, isLoading: lecturesLoading ,refetch} = useGetLectureOfCourseQuery(courseId);
    const [lectureTitle, setLectureTitle] = useState("")
    const handleCreateLecture = async () => {
        await createLecture({ courseId, lectureTitle });
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Lecture Created successfully")
            refetch()
            setLectureTitle("")
        }
        if (error) {
            toast.error(error?.data?.message);
        }
    }, [isSuccess, error])

    return (
        <div className='flex-1 md:mx-10 mt-3'>
            <div className='mb-4'>
                <h1 className='font-bold  text-xl'>Lets Add Lectures, Add some basic details for your new lecture</h1>
                <p className='text-gray-800 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, saepe.</p>
            </div>
            <div className='space-y-4'>
                <div className='space-y-1'>
                    <Label name="lectureTitle">Lecture Title</Label>
                    <Input type={"text"} placeholder="Enter your course title" className={"w-auto"} value={lectureTitle} onChange={(e) => { setLectureTitle(e.target.value) }} />
                </div>

                <div className='flex items-center gap-2' >
                    <Button variant={"outline"} className={'cursor-pointer'} onClick={() => navigate(`/admin/course/${courseId}`)}>Back to course</Button>
                    <Button className={'cursor-pointer'} disabled={isLoading} onClick={handleCreateLecture}>
                        {
                            isLoading ? (
                                <>
                                    <Loader2 className='ml-2 w-4 h-4 animate-spin' />
                                    Please Wait....
                                </>
                            ) : ("Create Lecture")
                        }
                    </Button>
                </div>
            </div>
            <div className='mt-5'>
                {
                    lecturesLoading ? (<div className='text-xl '>Please Wait...</div>) : getLectureError ? (<p>Failed to load lectures.</p>) : lecturesData.lectures.length === 0 ? (<p>No lectures uploaded yet</p>) : (
                        lecturesData.lectures.map((lecture, index)=><Lecture key={lecture._id} courseId={courseId} lecture={lecture} index={index}/>)
                    )

                }
            </div>

        </div>
    )
}
