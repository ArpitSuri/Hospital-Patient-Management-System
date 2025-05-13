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
            <aside className="w-64 bg-gray-900 text-white p-5 space-y-4">
                <Link to="/adminDashboard"><h2 className="text-xl font-bold mb-3">Admin Dashboard</h2></Link>
                <nav className="flex flex-col gap-3">
                    <Link to="/adminDashboard">Appointments</Link>
                    <Link to="doctors">Doctors</Link>
                    <Link to="departments">Departments</Link>
                </nav>
                <div className="mt-5">
                    <Link className="bg-purple-600 text-white px-4 py-2 rounded" to="patientRecord">Patient Record</Link>
                </div>
                <div className="mt-5">
                    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={logout}>Logout</button>
                </div>

            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 bg-gray-100">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;
