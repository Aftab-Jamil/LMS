import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateCourseMutation } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'


export default function AddCourse() {
    const [courseTitle,setCourseTitle]=useState("")
    const [category,setCategory]=useState("")
    const handleSelectCategory=(value)=>{
        setCategory(value)
    }
    const [createCourse,{data,isLoading,isError,isSuccess,error}]=useCreateCourseMutation()
    const createCourseHandler=async()=>{
        await createCourse({courseTitle,category});
    }
 
    const navigate=useNavigate()
    useEffect(()=>{
        if(isSuccess){
            toast.success(data?.message || "Created successfully")
            setCourseTitle('')
            navigate("/admin/course")
        }
        
    },[isSuccess,isError])
    return (
        <div className='flex-1 mx-10 mt-3'>
            <div className='mb-4'>
                <h1 className='font-bold  text-xl'>Lets Add Course, Add some basic details for your new course</h1>
                <p className='text-gray-800 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, saepe.</p>
            </div>
            <div className='space-y-4'>
                <div className='space-y-1'>
                    <Label name="courseTitle">Title</Label>
                    <Input type={"text"} placeholder="Enter your course title" className={"w-auto"} value={courseTitle} onChange={(e)=>setCourseTitle(e.target.value)}/>
                </div>
                <div className='space-y-1'>
                    <Label name="category">Category</Label>
                    <Select onValueChange={handleSelectCategory}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a course category" />
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
                <div className='flex items-center gap-2' >
                    <Button variant={"outline"} className={'cursor-pointer'} onClick={()=>navigate("/admin/course")}>Back</Button>
                    <Button className={'cursor-pointer'} disabled={isLoading} onClick={createCourseHandler}>
                        {
                            isLoading ? (
                                <>
                                <Loader2 className='ml-2 w-4 h-4 animate-spin'/>
                                Please Wait....
                                </>
                            ):("create")
                        }
                    </Button>
                </div>
            </div>

        </div>
    )
}
