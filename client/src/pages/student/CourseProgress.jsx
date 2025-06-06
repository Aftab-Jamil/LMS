import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { useGetCourseProgressQuery, useUpdataLectureProgressMutation } from '@/features/api/courseProgressApi';
import { CheckCircle, CheckCircle2, CirclePlay } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function CourseProgress() {
  const param = useParams()
  const { courseId } = param
  const { data, isSuccess, isLoading,refetch } = useGetCourseProgressQuery({ courseId })
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [initialLecture, setInitialLecture] = useState(null);
  const [updataLectureProgress,{}]=useUpdataLectureProgressMutation()
  useEffect(() => {
    if (isSuccess && data) {
      setCourse(data.courseDetails);
      setProgress(data.progress);
      setCompleted(data.completed);
      setCurrentLecture(data.courseDetails.lectures[0])
      setInitialLecture(data.courseDetails.lectures[0])
    }
  }, [isSuccess, data]);
  const isLectureCompleted = (lecId) => {
    return progress.some((prog) => prog.lectureId === lecId && prog.viewed)
  }
  const handleSelectLecture=(lecture)=>{
    setCurrentLecture(lecture)
  }
  const handleLectureProgress=async(lectureId)=>{
   await updataLectureProgress({courseId,lectureId})
   refetch()
  }
  if (isLoading) return (<div className='flex justify-center'>Please Wait Loading...</div>)
  return (

    <div className="max-w-7xl mx-auto p-4">
      {/* Display course name  */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{course?.courseTitle}</h1>
        <Button
          // onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>{" "}
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video section  */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            <video
              src={currentLecture?.videoUrl }
              controls
              className="w-full h-auto md:rounded-lg"
              onPlay={() =>
                handleLectureProgress(currentLecture._id)
              }
            />
          </div>
          {/* Display current watching lecture title */}
          <div className="mt-2 ">
            <h3 className="font-medium text-lg">
              {`Lecture ${course?.lectures?.findIndex(
                (lec) =>
                  lec._id === (currentLecture?._id)
              ) + 1
                } : ${currentLecture?.lectureTitle
                }`}
            </h3>
          </div>
        </div>
        {/* Lecture Sidebar  */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
          <div className="flex-1 overflow-y-auto">
            {course?.lectures.map((lecture) => (
              // lecture.videoUrl &&  // topic is only shown when lecture contains video url
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform  ${lecture._id === currentLecture?._id
                    ? "bg-gray-200 dark:dark:bg-gray-800"
                    : ""
                  }  ${!lecture.videoUrl ? "pointer-events-none opacity-50" : "hover:cursor-pointer"}
               `}

                onClick={() => lecture.videoUrl && handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant={"outline"}
                      className="bg-green-200 text-green-600"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}
