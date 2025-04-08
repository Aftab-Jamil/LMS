import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { Login } from './pages/Login'
import Navbar from './components/Navbar'
import HeroSection from './pages/student/HeroSection'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Courses from './pages/student/courses'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import AddCourse from './pages/Admin/course/AddCourse'
import Sidebar from './pages/Admin/Sidebar'
import Dashboard from './pages/Admin/Dashboard'
import CourseTable from './pages/Admin/course/courseTable'
import EditCourse from './pages/Admin/course/EditCourse'
import CreateLecture from './pages/Admin/lecture/CreateLecture'
import EditLecture from './pages/Admin/lecture/EditLecture'
import CourseDetails from './pages/student/CourseDetails'
import CourseProgress from './pages/student/CourseProgress'
import SearchResult from './pages/student/SearchResult'
import SearchPage from './pages/student/SearchPage'
import Filter from './pages/student/Filter'
import { AdminRoutes, AuthenticatedUser, ProtectedRoute } from './components/ProtectedRoutes'
import axios from "axios";
import { userLoggedIn, userLoggedOut } from "../src/features/authSlice";
import { useDispatch } from 'react-redux'
import { loadUser } from './features/authAction'
import { PurchasedCourseProtectedRoute } from './components/PurchasedCourseProtectedRoute'
import { ThemeProvider } from './components/ThemeProvider'
const router=createBrowserRouter([
  {
    path:"/",
    element: <MainLayout/>,
    children:[
     {
      path: "/",
      element:<><HeroSection/><Courses/> </>
     },
     {
      path:"/login",
      element:<><AuthenticatedUser><Login/></AuthenticatedUser></>
     },
     {
      path:"/my-learning",
      element:<><ProtectedRoute><MyLearning/></ProtectedRoute></>
     },
     {
      path:"/profile",
      element:<><ProtectedRoute><Profile/></ProtectedRoute></>
     },
     {
      path: "/admin",
      element :(<AdminRoutes><Sidebar/></AdminRoutes>),
      children:[
        {
          path: "dashboard",
          element : <Dashboard/>
        },
        {
          path: "course",
          element: <CourseTable/>
        },
        {
          path: "addCourse",
          element:<AddCourse/>
        },
        {
          path: "course/:courseId",
          element:<EditCourse/>
        },
        {
          path: "course/:courseId/lecture",
          element:<CreateLecture/>
        },
        {
          path: "course/:courseId/lecture/:lectureId",
          element:<EditLecture/>
        }
      ]
     },
     {
      path:"/course/:courseId",
      element:<CourseDetails/>
     },
     {
      path:"/course-progress/:courseId",
      element:<ProtectedRoute><PurchasedCourseProtectedRoute><CourseProgress/></PurchasedCourseProtectedRoute></ProtectedRoute>
     },
     {
      path:"/course/search",
      element: <SearchPage/>
     }

    ]
  },
])
function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(loadUser()).finally(() => setLoading(false)); // Wait for user data
  }, [dispatch]);

  if (loading) return <h1>Loading...</h1>; // Show loading screen before routes
  return (
    <RouterProvider router={router}/>
  )
}

export default App
