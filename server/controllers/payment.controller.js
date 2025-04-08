import { Course } from '../Entities/Course.js';
import RazorPay from 'razorpay';
import crypto from 'crypto';
import { PaymentDetail } from '../Entities/PaymentDetail.js';
import { User } from '../Entities/user.js';

// Initialize Razorpay instance
const razorpay = new RazorPay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// ✅ Create Order API
export const createOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const { courseId } = req.body;

        // Validate Course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not Found',
            });
        }

        // Create order in Razorpay
        const options = {
            amount: course.coursePrice * 100, // Convert to paisa
            currency: 'INR',
            receipt: `order_rcptid_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        // Save order details to DB
        await PaymentDetail.create({
            courseId,
            userId,
            amount: course.coursePrice,
            orderId: order.id,
            status: "pending"
        });

        return res.status(200).json({ order });
    } catch (error) {
        console.error('Create Order Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create Order',
        });
    }
};

// ✅ Verify Payment API
export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        // Verify Signature
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: 'Invalid Payment Signature' });
        }
        console.log(req.courseId);
        // ✅ Update Payment Status
        const updatedPaymentDetails= await PaymentDetail.findOneAndUpdate(
            { orderId: razorpay_order_id },  // Find by Razorpay order ID
            { status: "completed",paymentId:razorpay_payment_id },
            { new: true }
        );
        const userId=req.userId;
        const user=await User.findById(userId);
        user.enrolledCourses.push(updatedPaymentDetails.courseId);
        user.save()
        return res.json({ success: true, message: 'Payment Verified Successfully' });
    } catch (error) {
        console.error('Verify Payment Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to Verify Payment',
        });
    }
};
export const handleFailedPayment=async (req,res)=>{
    try {
        const {orderId}=req.body
        const userId=req.userId
        const paymentDetails=await PaymentDetail.findOne({orderId,userId})
        if(!paymentDetails){
            return res.status(404).json({
                success:false,
                message:"Payment Details Not found"
            })
        }
        paymentDetails.status="failed";
        await paymentDetails.save()
        return res.status(200).json({
            message:'Payment Failed'
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to handle failed payment"
        })
    }
}
export const getAllPurchasedCourseOfACreator = async (req, res) => {
    try {
        const userId = req.userId;

        // Fetch completed payment details and populate courseId
        let data = await PaymentDetail.find({ status: "completed" }).populate({ path: "courseId" });

        // console.log(data);

        // Filter courses where the creator matches userId
        let purchased = data.filter(d => d?.courseId?.creator?.toString() === userId);

        // console.log(purchased);

        if (purchased.length === 0) {
            return res.status(404).json({
                success: true,
                courses: []
            });
        }

        return res.status(200).json({
            success: true,
            courses:purchased
        });

    } catch (error) {
        console.error("Error fetching purchased courses:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
