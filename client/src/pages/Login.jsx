import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function Login() {
    const initialLoginData = { email: "", password: "" }
    const initialSignupData = { name: "", email: "", password: "", confirmPassword: "" }
    const [loginData, setLoginData] = useState(initialLoginData)
    const [signupData, setSignupData] = useState(initialSignupData)
    const [error, setError] = useState("")
    const [fieldError, setFieldError] = useState({})
    const [registerUser, { isLoading: rIsLoading, data: rData, isError: rIsError, isSuccess: rIsSuccess }] = useRegisterUserMutation()
    const [loginUser, { isLoading: lIsLoading, data: lData, isError: lIsError, isSuccess: lIsSuccess }] = useLoginUserMutation()
    const navigate=useNavigate()
    const handleInputChange = (e, which) => {
        const name = e.target.name;
        if (which === "signup") {
            setSignupData({ ...signupData, [name]: e.target.value })
        } else {
            setLoginData({ ...loginData, [name]: e.target.value })
        }
    }
    const handleSubmit = async (which) => {
        setFieldError({})
        setError("")
        try {
            const data = which === "signup" ? signupData : loginData;
            const action = which === "signup" ? registerUser : loginUser;
            // Validate password and confirmPassword
            if (which === "signup" && signupData.password !== signupData.confirmPassword) {
                toast.error("Password and Confirm Password do not match");
                return; // Stop execution if passwords don't match
            }

            // Await the API call
            const res = await action(data);

            if (res.error) {
                setFieldError(res.error?.data?.errors || {});
                setError(res.error?.data?.message || "Something went wrong!");
                toast.error(res.error?.data?.message || "something went wrong");
                return;
            } else {
                console.log(res)
                which==="signup"?navigate("/login"):navigate("/")
                // toast.success(res.data?.message || "Login Successful")
                toast.success(res.data?.message || "Login Successful")
                setLoginData(initialLoginData)
                setSignupData(initialSignupData)
            }
        } catch (err) {

            toast.error(err.error?.data?.message || 
                "something went wrong"
            );
        }

    }
    return (
        <div className="flex justify-center align-items-center p-2">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className='text-xl'>Login</CardTitle>
                            <CardDescription>
                                Please enter your credentials to login
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="email" >email</Label>
                                <Input type="text" id="email" placeholder="eg: xyz2@gmail.com" required name="email" value={loginData.email} onChange={(e) => handleInputChange(e, "login")} />
                                {fieldError.email && <p className="text-red-500 text-sm">{fieldError.email}</p>}
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="eg: 1234uxor" required name="password" value={loginData.password} onChange={(e) => handleInputChange(e, "login")} />
                                {fieldError.password && <p className="text-red-500 text-sm">{fieldError.password}</p>}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <Button disabled={lIsLoading} onClick={() => handleSubmit("login")}>{
                                lIsLoading ? (<>
                                    <Loader2 className="m-2 w-4 h-4 animate-spin" /> Loading...
                                </>) : "Login"
                            }
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="sign-up">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Sign Up</CardTitle>
                            <CardDescription>
                                Create your new account and get start your journey with us today ...
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" type="text" required placeholder="eg: patel kumar" name="name" value={signupData.name} onChange={(e) => handleInputChange(e, "signup")} />
                                {fieldError.name && <p className="text-red-500 text-sm">{fieldError.name}</p>}
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="eg: patel@gmail.com" required name="email" value={signupData.email} onChange={(e) => handleInputChange(e, "signup")} />
                                {fieldError.email && <p className="text-red-500 text-sm">{fieldError.email}</p>}
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="eg: 1234uxor" required={true} name="password" value={signupData.password} onChange={(e) => handleInputChange(e, "signup")} />
                                {fieldError.password && <p className="text-red-500 text-sm">{fieldError.password}</p>}
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input id="confirm-password" type="password" placeholder="eg: 1234uxor" required name="confirmPassword" value={signupData.confirmPassword} onChange={(e) => handleInputChange(e, "signup")} />
                                {fieldError.password && <p className="text-red-500 text-sm">{fieldError.password}</p>}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <Button disabled={rIsLoading} onClick={() => handleSubmit("signup")}>{
                                rIsLoading ? (<>
                                    <Loader2 className="m-2 w-4 h-4 animate-spin" /> Loading...
                                </>) : "SignUp"
                            }</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
