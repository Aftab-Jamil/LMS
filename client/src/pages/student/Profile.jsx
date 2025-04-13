import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import Course from './Course'
import CourseSkeleton from '../CourseSkeleton'
import { useGetUserQuery, useUpdataProfileMutation } from '@/features/api/authApi'
import { Loader2 } from 'lucide-react'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

export default function Profile() {
    // const user= useSelector((state)=>state.auth)
    const {data,isLoading,refetch}=useGetUserQuery();
    const [updataProfile,{data:updatedProfileData,isLoading:profileUpdateIsLoading,isError,isSuccess}]=useUpdataProfileMutation()
    const [name,setName]=useState("")
    const [profilePhoto,setProfilePhoto]=useState("")
    const handlefileChange=(e)=>{
      const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
    }
    const handleUpdateUserProfile=async()=>{
      const formdata=new FormData(); 
      formdata.append("name",name);
      formdata.append("profilePhoto",profilePhoto)
      console.log(formdata)
      await updataProfile(formdata)     
    }
    useEffect(()=>{
      refetch();
    },[])
    useEffect(()=>{
      if(isSuccess){
        refetch()
        toast.success(updatedProfileData.message || "successfully updated")
      }
      if(isError){
        toast.error("Unable to update profile")
      }
    },[updatedProfileData,isError,isSuccess])
  return (
    <div className='max-w-4xl mx-auto px-4 my-10'>
      <h1 className='md:text-2xl font-bold text-center md:text-left mt-20 text-xl'>Profile :</h1>
      <div className='flex flex-col  md:flex-row items-center md:items-start gap-8 my-5'> 
            <div className='flex flex-col items-center'>
            <Avatar className='h-24 w-24'>
                        <AvatarImage src={data?.user?.photoUrl || "https://github.com/shadcn.png"} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
            </div>

            <div>
                <div className='font-semibold text-gray-900 dark:text-gray-100 '>
                    Name&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className='font-normal text-gray-700 dark:text-gray-300'>: {data?.user?.name}</span>
                </div>
                <div className='font-semibold text-gray-900 dark:text-gray-100 '>
                    Email&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className='font-normal text-gray-700 dark:text-gray-300'>: {data?.user?.email}</span>
                </div>
                <div className='font-semibold text-gray-900 dark:text-gray-100 '>
                    Role&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className='font-normal text-gray-700 dark:text-gray-300'>: {data?.user?.role.toUpperCase()}</span>
                </div>
                <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={'mt-5 cursor-pointer'}>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input type={'text'} id="name" name="name" value={name} className="col-span-3" onChange={(e)=>setName(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profilePhoto" className="">
                Profile Pic
            </Label>
            <Input type={"file"} id="profilePhoto" accept="image/*"  className="col-span-3" onChange={handlefileChange}/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className={"hover: cursor-pointer"} size={"lg"} disabled={profileUpdateIsLoading} onClick={handleUpdateUserProfile}>
            {
              profileUpdateIsLoading ? (<div className='flex gap-2 justify-center items-center'><Loader2 className='w-4 h-4 animate-spin'/> please wait...</div>):(
                <div>Save Changes</div>
              )
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
            </div>
            
      </div>
      <h1 className='text-xl font-bold text-gray-800 mb-3 dark:text-gray-300'>Courses you are Enrolled in</h1>
      {
        data?.user?.enrolledCourses?.length===0?
        (<h1 className='text-gray-800 dark:text-gray-300'>You haven't Enrolled in any Courses</h1>):
        (  isLoading?(<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
               {Array.from({length: 3}).map((_,index)=><CourseSkeleton key={index}/>)}
                        </div>
                    ):(<div className='grid grid-cols-1 md:grid-cols-3  gap-3'>
            {data?.user?.enrolledCourses.map((course)=>
            <Link to={`/course/${course._id}`}>
            <Course course={course} key={course._id}/>
            </Link>
            ) }
            </div>)
        
        )
      }
    </div>
  )
}
