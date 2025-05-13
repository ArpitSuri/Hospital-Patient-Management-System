import { jwtDecode } from "jwt-decode";

export const getUserRole = () => {
    const token = localStorage.getItem("authToken"); // Match with login function

    if (!token) {
        console.log("No token found in localStorage");
        return null;
    }

    try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);
        return decoded.role;
    } catch (error) {
        console.error("Invalid Token:", error);
        return null;
    }
};
