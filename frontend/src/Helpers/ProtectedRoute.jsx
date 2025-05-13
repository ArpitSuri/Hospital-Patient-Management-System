import { Navigate } from "react-router-dom";
import { getUserRole } from "./auth";



const ProtectedRoute = ({ allowedRole, children }) => {
    const role = getUserRole(); // Get role from token

    if (!role) {
        return <Navigate to="/" />;
    }

    return role === allowedRole ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
