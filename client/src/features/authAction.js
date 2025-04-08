import axios from "axios";
import { userLoggedIn, userLoggedOut } from "../features/authSlice"; // Import Redux actions

export const loadUser = () => async (dispatch) => {
    try {
        const { data } = await axios.get("http://localhost:8080/api/v1/user/profile", {
            withCredentials: true, // Important! This sends cookies
        });

        dispatch(userLoggedIn({ user: data.user })); // Update Redux state
    } catch (error) {
        dispatch(userLoggedOut()); // Logout user if error occurs
    }
};
