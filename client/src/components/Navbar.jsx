import { Menu, Moon, School, Sun, User } from 'lucide-react'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import DarkMode from '@/DarkMode'
import { Label } from './ui/label'
import { Input } from './ui/input'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from '@radix-ui/react-dropdown-menu'
import { useGetUserQuery, useLogoutMutation } from '@/features/api/authApi'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'


export default function Navbar() {
    const {user}=useSelector((store)=>store.auth)
    // const {data:userData,isSuccess:isUserGetSuccess}=useGetUserQuery()
    const [Logout,{data,isSuccess}]=useLogoutMutation();
    const handleLogout=async()=>{
       await Logout();
    }
    const navigate=useNavigate()
    useEffect(()=>{
        if(isSuccess){
            toast.success("logout successful")
            navigate("/login")
        }
    },[isSuccess])
    return (
        <div className='px-5 md:px-10 h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10' >
            {/* desktop */}
            <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
                <div className="flex items-center gap-2 h-full">
                    <School size={"30"} />
                    <Link to="/">
                        <h1 className='hidden md:block font-extrabold text-2xl'>E-Learning</h1>
                    </Link>
                </div>
                {/* user icons and dark mode */}
                <div className='flex items-center gap-3'>
                    {user ? (<div>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src={user.photoUrl || "https://github.com/shadcn.png"} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link to="my-learning">
                                <DropdownMenuItem className={"hover: cursor-pointer"}>
                                    My Learnigs
                                </DropdownMenuItem>
                                </Link>
                                <Link to="profile">
                                <DropdownMenuItem className={"hover: cursor-pointer"}>
                                   Edit Profile
                                </DropdownMenuItem>
                                </Link>
                             
                                <DropdownMenuItem className={"hover: cursor-pointer"} onClick={handleLogout}>
                                    LogOut
                                </DropdownMenuItem>
                                
                                {user.role === "instructor" && (
                                    <>
                                        <DropdownMenuSeparator />
                                        <Link to="/admin/dashboard">
                                        <DropdownMenuItem className={"cursor-pointer"}>
                                            Dashboard
                                        </DropdownMenuItem>
                                        </Link>
                                    </>
                                )

                                }
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                    ) : (
                        <>
                            <div className='flex items-center gap-2'>
                                <Link to='/login' className='flex items-center gap-3'>
                                
                                <Button variant="outline" className="cursor-pointer">
                                    Login
                                </Button>
                                <Button className="cursor-pointer">Signup</Button>
                                </Link>
                            </div>
                        </>
                    )}
                    <DarkMode />
                </div>

            </div>
            {/* mobile */}
            <div className='flex md:hidden justify-between items-center h-full w-full'>
            <Link to="/">
                <h1 className='font-extrabold text-2xl'>E-Learning</h1>
            </Link>
                
                {
                   user?(<MobileNavbar user={user} logout={handleLogout}/>):(
                        <Link to='/login'>
                                
                                <Button variant="outline" className="cursor-pointer">
                                    Login
                                </Button>
                                </Link>
                    )
                }
            </div>
        </div>

    )
}
const MobileNavbar = (props) => {
    const navigate=useNavigate();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    className="rounded-full hover:bg-gray-200"
                    variant="outline"
                >
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="flex flex-row justify-between items-center mt-8">
                <Link to="/">
                    <SheetTitle>E-Learning</SheetTitle>
                    </Link>
                    <DarkMode />
                </SheetHeader>
                {/* <Separator className='mr-2'/> */}
                <nav className='flex flex-col'>
                    <Link to="my-learning" className='w-full hover:bg-gray-200 px-4 py-3 hover:cursor-pointer'>My Learning</Link>
                    <Link to="profile" className='w-full hover:bg-gray-200 px-4 py-3 hover:cursor-pointer'>Edit Profile</Link>
                    <p className='w-full hover:bg-gray-200 px-4 py-3 hover:cursor-pointer' onClick={props.logout}>Logout</p>
                    {
                        props.user.role === "instructor" && (
                            <Button type="submit" className="mx-4 my-1 hover:cursor-pointer" onClick={()=>navigate("/admin/dashboard")}>Dashboard</Button>
                        )
                    }

                </nav>
            </SheetContent>
        </Sheet>
                
    )
}
