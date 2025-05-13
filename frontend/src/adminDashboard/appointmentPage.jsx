import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentsPage = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/appointments`)
            .then((res) => setAppointments(res.data))
            .catch(() => toast.error("Failed to load appointments"));
    }, []);

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.put(`${ import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL }/api/appointments/${id}/status`, { status: newStatus });
            toast.success("Status updated and mail sent successfully");
            setAppointments((prev) =>
                prev.map((appt) =>
                    appt._id === id ? { ...appt, status: newStatus } : appt
                )
            );
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">All Appointments</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">Patient</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Doctor</th>
                            <th className="p-2">Department</th>
                            <th className="p-2">Date</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((a) => (
                            <tr key={a._id} className="border-b text-center">
                                <td className="p-2">{a.patientName}</td>
                                <td className="p-2">{a.patientEmail}</td>
                                <td className="p-2">{a.doctor?.name}</td>
                                <td className="p-2">{a.department?.name}</td>
                                <td className="p-2">
                                    {new Date(a.appointmentDate).toLocaleString()}
                                </td>
                                <td className="p-2 capitalize">{a.status}</td>
                                <td className="p-2">
                                    <select
                                        value={a.status}
                                        onChange={(e) => updateStatus(a._id, e.target.value)}
                                        className="border p-1 rounded"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="visited">Visited</option>
                                        <option value="deleted">Deleted</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppointmentsPage;
