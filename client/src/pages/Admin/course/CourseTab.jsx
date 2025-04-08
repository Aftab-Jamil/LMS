import RichTextEditor from '@/components/RichTextEditor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEditCourseMutation, useGetCourseByCourseIdQuery, useTogglePublishCourseMutation } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'


export default function CourseTab() {
    // const [publish, setPublish] = useState(false)
    // const isLoading = false;
    const params = useParams();
    const courseId = params.courseId;
    const { data: fetchData, isLoading: fetchIsLoading, isError: fetchIsError, isSuccess: fetchIsSuccess ,refetch} = useGetCourseByCourseIdQuery(courseId);
    const [courseData, setCourseData] = useState({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: ""
    });
    useEffect(() => {
        if (fetchData?.course) {
            const course = fetchData?.course
            console.log(course)
            setCourseData({
                courseTitle: course.courseTitle,
                subTitle: course.subTitle,
                description: course.description,
                category: course.category,
                courseLevel: course.courseLevel,
                coursePrice: course.coursePrice,
                courseThumbnail: course.courseThumbnail
            })
            // setPublish(course.isPublished || false)
            setSavedImagePreview(course.courseThumbnail);

        }
    }, [fetchData,fetchIsSuccess])
    const [savedImagePreview, setSavedImagePreview] = useState("")
    const [previewThumbnail, setPreviewThumbnail] = useState("")
    const handleInputChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value })
    }
    const handleSelectCategory = (value) => {
        setCourseData({ ...courseData, category: value })
    }
    const handleSelectCourseLevel = (value) => {
        setCourseData({ ...courseData, courseLevel: value })
    }
    const handleThumbnailChange = (e) => {
        setSavedImagePreview("")
        const file = e.target.files?.[0];
        if (file) {
            setCourseData({ ...courseData, courseThumbnail: file });
            const fileReader = new FileReader();
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
            fileReader.readAsDataURL(file);
        }
    }
    const [editCourse, { data, isSuccess, isError, error, isLoading }] = useEditCourseMutation()

    const handleSubmit = async () => {
        if(!courseData.description){
            toast.info("please enter description of the courses")
            return ;
        }
        const formData = new FormData();
        formData.append("courseTitle", courseData.courseTitle)
        formData.append("subTitle", courseData.subTitle)
        formData.append("description", courseData.description)
        formData.append("courseLevel", courseData.courseLevel)
        const price =courseData.coursePrice?Number(courseData.coursePrice):0
        formData.append("coursePrice", price)
        formData.append("category", courseData.category)
        formData.append("courseThumbnail", courseData.courseThumbnail)
        await editCourse({ courseId, formData })
    }
    const navigate = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Updated Successfully")
            navigate("/admin/course")
        }
    }, [isSuccess, isError])
   

    
    // handling publish toggle
    const [togglePublishCourse, {}] = useTogglePublishCourseMutation()
    const handletogglePublishCourse = async (action) => {
        try {
            const res = await togglePublishCourse({ courseId, publish: action })
            refetch()
            if (res.data) {
                toast.success(res.data.message)
            }
            
        } catch (error) {
            toast.error("unable to update the staus")
        }
    }
    if(fetchIsLoading) return (<h1>Loading...</h1>)
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <div>
                    <CardTitle>Basic Course Information</CardTitle>
                    <CardDescription>
                        Make changes to your courses here. Click save when you're done.
                    </CardDescription>
                </div>
                <div className="space-x-2">
                    <Button variant="outline" className={'cursor-pointer'} onClick={()=>{handletogglePublishCourse(fetchData?.course?.isPublished ? "false" : "true")}}>
                        {fetchData?.course?.isPublished? "Unpublished" : "Publish"}
                    </Button>
                    <Button className={'cursor-pointer'}>Remove Course</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 mt-5">
                    <div>
                        <Label>Title</Label>
                        <Input
                            type="text"
                            name="courseTitle"
                            placeholder="Ex. Fullstack developer"
                            value={courseData.courseTitle}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label>Subtitle</Label>
                        <Input
                            type="text"
                            name="subTitle"
                            placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
                            value={courseData.subTitle}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <RichTextEditor courseData={courseData} setCourseData={setCourseData} />
                    </div>
                    <div className="flex items-center gap-5">
                        <div>
                            <Label>Category</Label>
                            <Select onValueChange={handleSelectCategory} value={courseData?.category}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        <SelectItem value="Next JS">Next JS</SelectItem>
                                        <SelectItem value="Data Science">Data Science</SelectItem>
                                        <SelectItem value="Frontend Development">
                                            Frontend Development
                                        </SelectItem>
                                        <SelectItem value="Fullstack Development">
                                            Fullstack Development
                                        </SelectItem>
                                        <SelectItem value="MERN Stack Development">
                                            MERN Stack Development
                                        </SelectItem>
                                        <SelectItem value="Javascript">Javascript</SelectItem>
                                        <SelectItem value="Python">Python</SelectItem>
                                        <SelectItem value="Docker">Docker</SelectItem>
                                        <SelectItem value="MongoDB">MongoDB</SelectItem>
                                        <SelectItem value="HTML">HTML</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Course Level</Label>
                            <Select onValueChange={handleSelectCourseLevel} value={courseData?.courseLevel}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a course level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Course Level</SelectLabel>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Advance">Advance</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Price in (INR)</Label>
                            <Input
                                type="number"
                                name="coursePrice"
                                placeholder="199"
                                className="w-fit"
                                value={courseData.coursePrice}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Course Thumbnail</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            className="w-fit"
                            onChange={handleThumbnailChange}
                        />
                        {
                            savedImagePreview && (<img
                                src={savedImagePreview}
                                className="h-40 w-auto my-2"
                                alt="Course Thumbnail"
                            />)
                        }
                        {
                            previewThumbnail && (<img
                                src={previewThumbnail}
                                className="h-40 w-auto my-2"
                                alt="Course Thumbnail"
                            />)
                        }


                    </div>
                    <div className='flex items-center gap-2'>
                        <Button onClick={() => navigate("/admin/course")} variant="outline" className={'cursor-pointer'}>
                            Cancel
                        </Button>
                        <Button disabled={isLoading} className={'cursor-pointer'} onClick={handleSubmit}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                "Save"
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
