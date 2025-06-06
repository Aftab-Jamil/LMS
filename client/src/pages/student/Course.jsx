import { AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import React from 'react'
import { Badge } from '@/components/ui/badge'

export default function Course({course}) {
    return (
        <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className='relative'>
                <img src={course?.courseThumbnail} alt="image" className='h-36 w-full object-cover rounded-t-lg' />
            </div>
            <CardContent className="px-5 py-4 space-y-3">
                <h2 className='hover:underline font-bold text-lg truncate'>{course?.courseTitle}</h2>
                <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <Avatar className='h-8 w-8'>
                        <AvatarImage src={course?.creator?.photoUrl ||"https://github.com/shadcn.png" }/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1 className='font-medium text-sm'>{course?.creator?.name}</h1>
                </div>
                <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">{course?.courseLevel}</Badge>
                </div>
                <div className='text-lg font-bold'>
                ₹ {course.coursePrice}
                </div>
                
            </CardContent>

        </Card>
    )
}
