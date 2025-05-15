
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

const AppointmentsPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    // Purple theme colors - matching the DoctorsPage theme
    const theme = {
        primary: "#6B46C1", // Deep purple
        primaryLight: "#9F7AEA", // Light purple
        primaryDark: "#553C9A", // Dark purple
        accent: "#E9D8FD", // Very light purple
        text: "#2D3748", // Dark gray for text
        background: "#FAF5FF", // Very light purple background
    };

    // Status color mapping
    const statusColors = {
        pending: { bg: "#FEF3C7", text: "#D97706" }, // Amber
        confirmed: { bg: "#DCFCE7", text: "#16A34A" }, // Green
        visited: { bg: "#DBEAFE", text: "#2563EB" }, // Blue
        deleted: { bg: "#FEE2E2", text: "#DC2626" }, // Red
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/appointments`)
            .then((res) => {
                setAppointments(res.data);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to load appointments");
                setLoading(false);
            });
    }, []);

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/appointments/${id}/status`,
                { status: newStatus }
            );

            // Create success toast with animation
            toast.success("Status updated and email sent successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            // Update local state with animation
            setAppointments((prev) =>
                prev.map((appt) =>
                    appt._id === id ? { ...appt, status: newStatus } : appt
                )
            );
        } catch (error) {
            toast.error("Failed to update appointment status");
        }
    };

    // Filter appointments based on selected status
    const filteredAppointments = filter === "all"
        ? appointments
        : appointments.filter(a => a.status === filter);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    return (
        <div
            className="p-6 min-h-screen"
            style={{ backgroundColor: theme.background }}
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
            >
                <h1
                    className="text-3xl font-bold mb-2"
                    style={{ color: theme.primaryDark }}
                >
                    Appointment Management
                </h1>
                <p className="text-gray-600">
                    View and manage all patient appointments
                </p>
            </motion.div>

            {/* Status Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-6 flex flex-wrap gap-2"
            >
                {["all", "pending", "confirmed", "visited", "deleted"].map((status) => (
                    <motion.button
                        key={status}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilter(status)}
                        className="px-4 py-2 rounded-md capitalize text-sm font-medium"
                        style={{
                            backgroundColor:
                                filter === status
                                    ? theme.primary
                                    : "white",
                            color:
                                filter === status
                                    ? "white"
                                    : theme.text,
                            border: `1px solid ${theme.accent}`,
                            boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                        }}
                    >
                        {status === "all" ? "All Appointments" : status}
                    </motion.button>
                ))}
            </motion.div>

            {/* Appointments Table */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
                <div
                    className="py-3 px-4 font-semibold flex justify-between items-center"
                    style={{ backgroundColor: theme.primary, color: "white" }}
                >
                    <h2 className="text-xl">Appointments</h2>
                    <div className="text-sm bg-white px-3 py-1 rounded-full" style={{ color: theme.primaryDark }}>
                        {filteredAppointments.length} {filteredAppointments.length === 1 ? "appointment" : "appointments"}
                    </div>
                </div>

                {loading ? (
                    <div className="p-8 flex justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 border-4 rounded-full"
                            style={{ borderColor: `${theme.accent} transparent ${theme.primary} transparent` }}
                        />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        {filteredAppointments.length > 0 ? (
                            <table className="min-w-full">
                                <thead>
                                    <tr style={{ backgroundColor: theme.accent }}>
                                        <th className="p-3 text-left font-semibold" style={{ color: theme.primaryDark }}>Patient</th>
                                        <th className="p-3 text-left font-semibold" style={{ color: theme.primaryDark }}>Email</th>
                                        <th className="p-3 text-left font-semibold" style={{ color: theme.primaryDark }}>Doctor</th>
                                        <th className="p-3 text-left font-semibold" style={{ color: theme.primaryDark }}>Department</th>
                                        <th className="p-3 text-left font-semibold" style={{ color: theme.primaryDark }}>Date & Time</th>
                                        <th className="p-3 text-left font-semibold" style={{ color: theme.primaryDark }}>Status</th>
                                        <th className="p-3 text-center font-semibold" style={{ color: theme.primaryDark }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence>
                                        {filteredAppointments.map((appointment) => (
                                            <motion.tr
                                                key={appointment._id}
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit={{ opacity: 0, x: -100 }}
                                                className="border-b hover:bg-purple-50"
                                                style={{ borderColor: theme.accent }}
                                                layout
                                            >
                                                <td className="p-3 font-medium" style={{ color: theme.text }}>
                                                    {appointment.patientName}
                                                </td>
                                                <td className="p-3" style={{ color: theme.text }}>
                                                    <a
                                                        href={`mailto:${appointment.patientEmail}`}
                                                        className="hover:underline"
                                                        style={{ color: theme.primary }}
                                                    >
                                                        {appointment.patientEmail}
                                                    </a>
                                                </td>
                                                <td className="p-3" style={{ color: theme.text }}>
                                                    {appointment.doctor?.name || "Not assigned"}
                                                </td>
                                                <td className="p-3" style={{ color: theme.text }}>
                                                    {appointment.department?.name || "Not specified"}
                                                </td>
                                                <td className="p-3" style={{ color: theme.text }}>
                                                    <div className="flex flex-col">
                                                        <span>
                                                            {new Date(appointment.appointmentDate).toLocaleDateString()}
                                                        </span>
                                                        <span className="text-sm text-gray-500">
                                                            {new Date(appointment.appointmentDate).toLocaleTimeString()}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-3">
                                                    <motion.span
                                                        whileHover={{ scale: 1.05 }}
                                                        className="px-3 py-1 rounded-full text-xs font-medium capitalize"
                                                        style={{
                                                            backgroundColor: statusColors[appointment.status]?.bg || theme.accent,
                                                            color: statusColors[appointment.status]?.text || theme.text,
                                                            display: "inline-block"
                                                        }}
                                                    >
                                                        {appointment.status}
                                                    </motion.span>
                                                </td>
                                                <td className="p-3">
                                                    <motion.div
                                                        whileHover={{ scale: 1.02 }}
                                                        className="relative"
                                                    >
                                                        <select
                                                            value={appointment.status}
                                                            onChange={(e) => updateStatus(appointment._id, e.target.value)}
                                                            className="w-full py-2 pl-3 pr-8 border rounded-md cursor-pointer focus:outline-none focus:ring-2 appearance-none"
                                                            style={{
                                                                borderColor: theme.accent,
                                                                color: theme.text,
                                                                background: "white",
                                                                focusRing: theme.primaryLight
                                                            }}
                                                        >
                                                            <option value="pending">Pending</option>
                                                            <option value="confirmed">Confirmed</option>
                                                            <option value="visited">Visited</option>
                                                            <option value="deleted">Deleted</option>
                                                        </select>
                                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                            <svg className="w-4 h-4" style={{ fill: theme.primary }} viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                                            </svg>
                                                        </div>
                                                    </motion.div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="p-12 flex flex-col items-center justify-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="64"
                                    height="64"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke={theme.primaryLight}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M8 2v4"></path>
                                    <path d="M16 2v4"></path>
                                    <rect x="2" y="6" width="20" height="16" rx="2"></rect>
                                    <path d="M12 16h.01"></path>
                                    <path d="M8 12h.01"></path>
                                    <path d="M16 12h.01"></path>
                                </svg>
                                <p className="mt-4 text-lg" style={{ color: theme.primaryDark }}>
                                    {filter === "all"
                                        ? "No appointments found"
                                        : `No ${filter} appointments found`}
                                </p>
                                {filter !== "all" && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setFilter("all")}
                                        className="mt-4 px-4 py-2 text-sm rounded"
                                        style={{ backgroundColor: theme.primary, color: "white" }}
                                    >
                                        Show All Appointments
                                    </motion.button>
                                )}
                            </motion.div>
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default AppointmentsPage;