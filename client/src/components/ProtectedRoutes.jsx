import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// ✅ Fixed ProtectedRoute
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticate } = useSelector((store) => store.auth);
  console.log(isAuthenticate)
  if (!isAuthenticate) {
    return (<Navigate to="/login" />)
  }

  return children;
};

// ✅ Fixed AuthenticatedUser (Prevents logged-in users from accessing login/signup pages)
export const AuthenticatedUser = ({ children }) => {
  const { isAuthenticate } = useSelector(store=> store.auth);

  if (isAuthenticate) {
    return <Navigate to="/" />;
  }

  return children;
};

// ✅ Fixed AdminRoutes (Restricts access to admin pages)
export const AdminRoutes = ({ children }) => {
  const { user, isAuthenticate } = useSelector(store => store.auth);
  console.log(user,isAuthenticate)
  if (!isAuthenticate) {
    return (<Navigate to="/login" />)
  }

  if (!user || user.role !== "instructor") {
    return <Navigate to="/" />;
  }

  return children;
};
