import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
export default function PaymentButton({coursePrice,refetch}) {
    const { courseId } = useParams();

    const navigate=useNavigate()
    const [isLoading,setIsLoading]=useState(false)

    const handlePayment = async () => {
        setIsLoading(true) 
        try {
            // Step 1: Create Order from Backend
            const { data } = await axios.post(
                "https://lms-wizh.onrender.com/api/v1/payment/create-order",
                { courseId },
                { withCredentials: true }
            );
             
            var options = {
                key: "rzp_test_bz6KxeRkMV1MiJ", // Replace with your test key
                amount: data.order.amount, // Make sure this is correct
                currency: data.order.currency,
                name: "E-Learning",
                description: "Course Payment",
                order_id: data.order.id, // Fix order ID here
                image: "https://example.com/your_logo",
                handler: async function (response) {
                    // Step 2: Verify Payment
                    const verifyRes = await axios.post(
                        "https://lms-wizh.onrender.com/api/v1/payment/verify-payment",
                        response,
                        { withCredentials: true }
                    );
                    refetch()
                    setIsLoading(false)
                },
                prefill: {
                    name: "User Name",
                    email: "user@example.com",
                    contact: "9999999999",
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#3399cc",
                },
                modal: {
                    escape: true, // Allows closing with Esc key
                    ondismiss: function () {
                        toast.info("Payment process was not completed!");
                        setIsLoading(false); // Reset loading state when closed
                    }
                }

            };
    
            var rzp1 = new window.Razorpay(options); // Use window.Razorpay instead
    
            rzp1.on("payment.failed",async function () {
                const res = await axios.post(
                    "https://lms-wizh.onrender.com/api/v1/payment/handle-failed-payment",
                    { orderId: data.order.id },
                    { withCredentials: true }
                );
                setIsLoading(false)
            });
    
            // Step 3: Open Razorpay Checkout
            rzp1.open();
        } catch (error) {
            console.error("❌ Payment Error:", error);
            if(error?.response?.data?.message==="User not authenticated"){
                navigate("/login")
                toast.info("please login to purchase course")
            }
            setIsLoading(false)
        }
    };
    

    return (
     
            <Button className="w-full cursor-pointer" disabled={isLoading} onClick={handlePayment}>
               {isLoading ? <><Loader2 className='ml-2 w-4 h-4 animate-spin'/> please wait</>: `Pay ₹ ${coursePrice}`}
            </Button>
       
    );
}
