import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import CourseTab from './CourseTab'

export default function EditCourse() {
    return (
        <div className='flex-1'>
            <div className='flex justify-between items-center mb-5'>
                <h1 className='text-xl font-bold'> Add detail information regarding course</h1>
                <Link to="lecture">
                    <Button className="hover:text-blue-600 cursor-pointer" variant="link">Go to lectures page</Button>
                </Link>
            </div>
            <CourseTab/>
        </div>
    )
}
