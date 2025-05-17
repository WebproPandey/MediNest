import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { admin } = useSelector((state) => state.auth);
  return admin ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
