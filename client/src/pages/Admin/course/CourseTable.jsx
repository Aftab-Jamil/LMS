import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetAllCoursesOfACreatorQuery } from '@/features/api/courseApi'
import { Edit, Loader2 } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CourseTable() {
  const navigate=useNavigate()
  const {data,isLoading}=useGetAllCoursesOfACreatorQuery();
  return (
    isLoading? (
      <div className='w-full flex justify-center items-center '><Loader2 className=' w-8 h-8 animate-spin'/></div>
    ):<div className='p-0.5 md:p-10'>
    <Button className={"cursor-pointer mb-5"} onClick={()=>{navigate("/admin/addCourse")}}>Create new course</Button>
    <Table className={'w-full'}>
      <TableCaption>A list of your recent courses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.courses?.map((course) => (
          <TableRow key={course._id}>
            <TableCell className="font-medium">{course.coursePrice?`₹ ${course.coursePrice}`:"NA"}</TableCell>
            <TableCell><Badge>{course.isPublished ? "Published" : "Draft"}</Badge></TableCell>
            <TableCell>{course.courseTitle}</TableCell>
            <TableCell className="text-right">
            <Button size='sm' className={'cursor-pointer'}  variant='ghost' onClick={() => navigate(`${course._id}`)}><Edit/></Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
     
    </Table>
  </div>
    
  )
}
