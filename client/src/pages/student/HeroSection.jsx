import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowBigRightDashIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HeroSection() {
  const [searchQuery,setSearchQuery]=useState("")
  const navigate=useNavigate()
  const searchHandler=(e)=>{
    e.preventDefault();
    if(searchQuery.trim() !== ""){
      navigate(`/course/search?query=${searchQuery}`)
    }
    setSearchQuery("");
  }
  return (
    <div className='relative bg-gradient-to-r from-blue-500 to bg-green-600 dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center'>
        <div className='max-w-3xl mx-auto'>
        <h1 className='text-white text-4xl font-bold mb-4'>Find the best courses for you</h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8">Discover, Learn, UpSkills with our wide range of courses</p>
        <form action="" className='flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6'>
            <Input type="text" className='flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500' placeholder="search for courses" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
            <Button type="submit" className="bg-green-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800 cursor-pointer" onClick={searchHandler}>Search</Button>
        </form>
        <Button className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200 cursor-pointer">Explore Courses <ArrowBigRightDashIcon/> </Button>
        </div>
      
    </div>
  )
}
