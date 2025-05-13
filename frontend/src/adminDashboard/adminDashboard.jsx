import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminHome = () => {
    const [stats, setStats] = useState({
        appointments: 0,
        visits: 0,
        patients: 0,
        doctors: 0,
    });

    const fetchStats = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/admin/stats");
            setStats(res.data);
        } catch (err) {
            console.error("Failed to fetch stats");
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Welcome, Admin 👋</h1>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <Card label="Appointments" count={stats.appointments} />
                <Card label="Completed Visits" count={stats.visits} />
                <Card label="Patients" count={stats.patients} />
                <Card label="Doctors" count={stats.doctors} />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ActionCard title="Manage Appointments" to="/adminDashboard/appointments" />
                <ActionCard title="Manage Patients" to="/adminDashboard/patientRecord" />
                <ActionCard title="Manage Doctors" to="/adminDashboard/doctors" />
                <ActionCard title="Manage Departments" to="/adminDashboard/departments" />
            </div>
        </div>
    );
};

const Card = ({ label, count }) => (
    <div className="bg-white p-6 shadow rounded-lg text-center">
        <h2 className="text-4xl font-bold text-blue-600">{count}</h2>
        <p className="text-gray-600 mt-2">{label}</p>
    </div>
);

const ActionCard = ({ title, to }) => (
    <Link to={to}>
        <div className="p-6 bg-blue-100 hover:bg-blue-200 transition rounded-lg text-center shadow cursor-pointer">
            <h3 className="text-xl font-semibold">{title}</h3>
        </div>
    </Link>
);

export default AdminHome;
