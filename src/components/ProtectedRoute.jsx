import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRole }) {
  const { user } = useAuth();

  // 1. Authentication Check
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // 2. Authorization (RBAC) Check
  if (allowedRole && user.role !== allowedRole) {
    // If a seller tries to access the recycler portal, route them to their own dashboard
    return <Navigate to={user.role === 'seller' ? "/seller/dashboard" : "/recycler/portal"} replace />;
  }

  // 3. Render matched child route
  return <Outlet />;
}
