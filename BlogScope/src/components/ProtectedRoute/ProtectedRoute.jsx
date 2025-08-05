import { Navigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { loggedInUser } = useAuth();

  if (!loggedInUser) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};


export default ProtectedRoute;
