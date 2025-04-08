import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";
import { paymentApi } from "@/features/api/paymentApi";
const store=configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware,courseApi.middleware,courseProgressApi.middleware,paymentApi.middleware),
})
export default store;
const initializeApp=async()=>{
    await store.dispatch(authApi.endpoints.getUser.initiate({},{forceRefetch:true}))
}
initializeApp()