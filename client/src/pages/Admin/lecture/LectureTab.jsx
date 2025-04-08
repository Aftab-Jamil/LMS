import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEditCourseMutation, useEditLectureMutation, useRemoveLectureByLectureIdMutation } from '@/features/api/courseApi';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function LectureTab({ lectureData }) {

    const [lectureTitle, setLectureTitle] = useState(lectureData.lectureTitle)
    const [removeLectureByLectureId, { isLoading: deleteIsLoading, isSuccess: deleteIsSuccess, isError: deleteIsError }] = useRemoveLectureByLectureIdMutation()
    const params = useParams()
    const { courseId, lectureId } = params;
    const navigate = useNavigate();
    const MEDIA_API = "http://localhost:8080/api/v1/media";
    const [mediaProgress, setMediaProgress] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isPreviewFree, setIsPreviewFree] = useState(lectureData?.isPreviewFree || false);
    const [videoInfo, setVideoInfo] = useState(null)
    const [editLecture, { data, isLoading, isSuccess, isError, error }] = useEditLectureMutation();
    const handleDeleteLecture = async () => {
        await removeLectureByLectureId({ courseId, lectureId })
    }
    const handleVideoChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            setMediaProgress(true);
            try {
                const response = await axios.post(`${MEDIA_API}/upload-video`, formData, {
                    onUploadProgress: ({ loaded, total }) => {
                        setUploadProgress(Math.round((loaded * 100) / total));
                    }
                })
                if (response.data.success) {
                    console.log(response.data)
                    setVideoInfo({
                        publicId: response.data.videoInfo.public_id,
                        videoUrl: response.data.videoInfo.secure_url
                    })
                    toast.success("video uploaded successfully")
                }
            } catch (error) {
                toast.error("video upload failed");
            }
            finally {
                setMediaProgress(false)
            }
        }
    }
    const handleEditSubmit = async () => {
        // console.log(isPreviewFree)
        await editLecture({ courseId, lectureId, lectureTitle, videoInfo, isPreviewFree })
    }
    useEffect(() => {
        if (deleteIsSuccess) {
            toast.success("Deleted successfully")
            navigate(`/admin/course/${courseId}/lecture`)
        }
        if (isSuccess) {
            toast.success(data.message || 'Uploaded but not response message')
            navigate(`/admin/course/${courseId}/lecture`)
        }
        if (isError) {
            toast.error(error.data.message || "Failed to update course")
        }
    }, [deleteIsSuccess, isSuccess, isError,videoInfo])
    return (
        <Card className={'mt-5'}>
            <CardHeader className="flex flex-row justify-between">
                <div>
                    <CardTitle>Edit Lecture</CardTitle>
                    <CardDescription>
                        Make changes to your Lectures here. Click <b>Update Lecture Button</b> when you're done.
                    </CardDescription>
                </div>


            </CardHeader>
            <CardContent>
                <div className="space-y-4 mt-5">
                    <div>
                        <Label>Title</Label>
                        <Input
                            type="text"
                            name="courseTitle"
                            placeholder="Ex. Introduction to SpringBoot"
                            value={lectureTitle}
                            onChange={(e) => setLectureTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>video</Label>
                        <Input
                            type="file"
                            className="w-fit mb-3"
                            onChange={handleVideoChange}
                            
                        />
                        {lectureData.videoUrl && !videoInfo ? (
                            <video
                            src={lectureData.videoUrl}
                            controls
                            className="w-100 h-auto md:rounded-lg"
                           
                        />
                        ): <div className='text-red-500'>  Video is not uploaded yet for this lecture, <b>Please Click On Update Lecture</b></div>}
                        
                    </div>
                    {mediaProgress && (
                        <div className="my-4">
                            <Progress value={uploadProgress} />
                            <p>{uploadProgress}% uploaded</p>
                        </div>
                    )}

                    <div className="flex items-center space-x-2 my-5">
                        <Switch id="airplane-mode" checked={isPreviewFree} onCheckedChange={(checked) => setIsPreviewFree(() => checked)} />
                        <Label htmlFor="airplane-mode">Is this video FREE</Label>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Button disabled={isLoading || mediaProgress} className={'cursor-pointer'} variant={'destructive'} onClick={handleDeleteLecture}>
                            {deleteIsLoading ? "Please Wait..." : "Remove Lecture"}
                        </Button>
                        <Button disabled={isLoading || mediaProgress} className={'cursor-pointer'} onClick={handleEditSubmit}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                "Update Lecture"
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
