
import { Outlet, Link } from "react-router-dom";

const AdminDashboard = () => {
    const logout = () => {
        // Clear token from localStorage
        localStorage.removeItem("authToken");
        // Redirect to login page
        window.location.href = "/login";
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-purple-800 text-white p-5 space-y-5 shadow-lg">
                <Link to="/adminDashboard">
                    <h2 className="text-2xl font-bold mb-6 border-b border-purple-600 pb-3">Admin Portal</h2>
                </Link>

                <nav className="flex flex-col gap-4">
                    <Link
                        to="appointments"
                        className="flex items-center py-2 px-3 rounded-md hover:bg-purple-700 transition-colors"
                    >
                        <span className="mr-2">📅</span> Appointments
                    </Link>
                    <Link
                        to="doctors"
                        className="flex items-center py-2 px-3 rounded-md hover:bg-purple-700 transition-colors"
                    >
                        <span className="mr-2">👨‍⚕️</span> Doctors
                    </Link>
                    <Link
                        to="departments"
                        className="flex items-center py-2 px-3 rounded-md hover:bg-purple-700 transition-colors"
                    >
                        <span className="mr-2">🏥</span> Departments
                    </Link>
                </nav>

                <div className="mt-6 pt-4 border-t border-purple-600">
                    <Link
                        className="bg-white text-purple-800 px-4 py-2 rounded-md font-medium flex items-center justify-center hover:bg-purple-100 transition-colors"
                        to="patientRecord"
                    >
                        <span className="mr-2">👤</span> Patient Records
                    </Link>
                </div>

                <div className="mt-auto pt-8">
                    <button
                        className="bg-purple-600 hover:bg-purple-500 text-white w-full px-4 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
                        onClick={logout}
                    >
                        <span className="mr-2">🚪</span> Logout
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 bg-white p-8">
                <div className="bg-purple-50 rounded-lg shadow-sm p-6 min-h-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;