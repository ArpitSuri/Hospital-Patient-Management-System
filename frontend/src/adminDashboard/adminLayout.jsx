import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const AdminDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLinkClick = () => {
        // Only close sidebar on small screens
        if (window.innerWidth < 768) setIsSidebarOpen(false);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between bg-purple-800 text-white px-4 py-3 shadow-md">
                <h2 className="text-xl font-bold">Admin Portal</h2>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`bg-purple-800 text-white p-5 space-y-5 shadow-lg w-full md:w-64 md:block ${isSidebarOpen ? "block" : "hidden"
                    } md:relative fixed md:static top-0 left-0 h-full z-50 md:h-auto`}
            >
                <Link to="/adminDashboard" onClick={handleLinkClick}>
                    <h2 className="text-2xl font-bold mb-6 border-b border-purple-600 pb-3">Admin Portal</h2>
                </Link>

                <nav className="flex flex-col gap-4">
                    <Link
                        to="appointments"
                        onClick={handleLinkClick}
                        className="flex items-center py-2 px-3 rounded-md hover:bg-purple-700 transition-colors"
                    >
                        <span className="mr-2">📅</span> Appointments
                    </Link>
                    <Link
                        to="doctors"
                        onClick={handleLinkClick}
                        className="flex items-center py-2 px-3 rounded-md hover:bg-purple-700 transition-colors"
                    >
                        <span className="mr-2">👨‍⚕️</span> Doctors
                    </Link>
                    <Link
                        to="departments"
                        onClick={handleLinkClick}
                        className="flex items-center py-2 px-3 rounded-md hover:bg-purple-700 transition-colors"
                    >
                        <span className="mr-2">🏥</span> Clinics
                    </Link>
                </nav>

                <div className="mt-6 pt-4 border-t border-purple-600">
                    <Link
                        to="patientRecord"
                        onClick={handleLinkClick}
                        className="bg-white text-purple-800 px-4 py-2 rounded-md font-medium flex items-center justify-center hover:bg-purple-100 transition-colors"
                    >
                        <span className="mr-2">👤</span> Patient Records
                    </Link>
                </div>

                <div className="pt-8">
                    <button
                        className="bg-purple-600 hover:bg-purple-500 text-white w-full px-4 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
                        onClick={logout}
                    >
                        <span className="mr-2">🚪</span> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-white p-4 md:p-8 mt-16 md:mt-0">
                <div className="bg-purple-50 rounded-lg shadow-sm p-4 md:p-6 min-h-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
