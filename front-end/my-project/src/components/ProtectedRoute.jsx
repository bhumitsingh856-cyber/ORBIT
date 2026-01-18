import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/context.jsx";

const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user?._id) {
    return <Navigate to="/auth/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
