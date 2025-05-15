// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const AdminHome = () => {
//     const [stats, setStats] = useState({
//         appointments: 0,
//         visits: 0,
//         patients: 0,
//         doctors: 0,
//     });

//     const fetchStats = async () => {
//         try {
//             const res = await axios.get("http://localhost:8080/api/admin/stats");
//             setStats(res.data);
//         } catch (err) {
//             console.error("Failed to fetch stats");
//         }
//     };

//     useEffect(() => {
//         fetchStats();
//     }, []);

//     return (
//         <div className="p-6">
//             <h1 className="text-3xl font-bold mb-6">Welcome, Admin 👋</h1>

//             {/* Stats Section */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
//                 <Card label="Appointments" count={stats.appointments} />
//                 <Card label="Completed Visits" count={stats.visits} />
//                 <Card label="Patients" count={stats.patients} />
//                 <Card label="Doctors" count={stats.doctors} />
//             </div>

//             {/* Quick Actions */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <ActionCard title="Manage Appointments" to="/adminDashboard/appointments" />
//                 <ActionCard title="Manage Patients" to="/adminDashboard/patientRecord" />
//                 <ActionCard title="Manage Doctors" to="/adminDashboard/doctors" />
//                 <ActionCard title="Manage Departments" to="/adminDashboard/departments" />
//             </div>
//         </div>
//     );
// };

// const Card = ({ label, count }) => (
//     <div className="bg-white p-6 shadow rounded-lg text-center">
//         <h2 className="text-4xl font-bold text-blue-600">{count}</h2>
//         <p className="text-gray-600 mt-2">{label}</p>
//     </div>
// );

// const ActionCard = ({ title, to }) => (
//     <Link to={to}>
//         <div className="p-6 bg-blue-100 hover:bg-blue-200 transition rounded-lg text-center shadow cursor-pointer">
//             <h3 className="text-xl font-semibold">{title}</h3>
//         </div>
//     </Link>
// );

// export default AdminHome;


import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AdminHome = () => {
    const [stats, setStats] = useState({
        appointments: 0,
        visits: 0,
        patients: 0,
        doctors: 0,
    });
    const [loading, setLoading] = useState(true);

    // Purple theme colors - matching the other pages
    const theme = {
        primary: "#6B46C1", // Deep purple
        primaryLight: "#9F7AEA", // Light purple
        primaryDark: "#553C9A", // Dark purple
        accent: "#E9D8FD", // Very light purple
        text: "#2D3748", // Dark gray for text
        background: "#FAF5FF", // Very light purple background
    };

    const fetchStats = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:8080/api/admin/stats");
            // Add a slight delay for animation purposes
            setTimeout(() => {
                setStats(res.data);
                setLoading(false);
            }, 300);
        } catch (err) {
            console.error("Failed to fetch stats");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
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

    // Icons for the stats cards
    const statsIcons = {
        appointments: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
        ),
        visits: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 11 12 14 22 4"></polyline>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
        ),
        patients: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
        ),
        doctors: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 21h8a2 2 0 0 0 2-2v-2H6v2a2 2 0 0 0 2 2Z"></path>
                <path d="M15 5H9a2 2 0 0 0-2 2v2h10V7a2 2 0 0 0-2-2Z"></path>
                <path d="M19 9H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Z"></path>
            </svg>
        ),
    };

    // Quick action cards data
    const quickActions = [
        {
            title: "Manage Appointments",
            to: "/adminDashboard/appointments",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
            ),
            description: "View and manage upcoming appointments",
        },
        {
            title: "Manage Patients",
            to: "/adminDashboard/patientRecord",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            ),
            description: "View and edit patient records",
        },
        {
            title: "Manage Doctors",
            to: "/adminDashboard/doctors",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 21h8a2 2 0 0 0 2-2v-2H6v2a2 2 0 0 0 2 2Z"></path>
                    <path d="M15 5H9a2 2 0 0 0-2 2v2h10V7a2 2 0 0 0-2-2Z"></path>
                    <path d="M19 9H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Z"></path>
                </svg>
            ),
            description: "Add, edit and manage doctor profiles",
        },
        {
            title: "Manage Departments",
            to: "/adminDashboard/departments",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
            ),
            description: "Manage hospital departments",
        },
    ];

    return (
        <div
            style={{ backgroundColor: theme.background }}
            className="min-h-screen p-6"
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center mb-8">
                    <h1
                        className="text-3xl font-bold"
                        style={{ color: theme.primaryDark }}
                    >
                        Welcome, Admin
                    </h1>
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: [0, 14, -8, 14, 0] }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                    >
                        <span className="text-3xl ml-2">👋</span>
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                >
                    <StatsCard
                        label="Appointments"
                        count={stats.appointments}
                        icon={statsIcons.appointments}
                        loading={loading}
                        theme={theme}
                        variants={itemVariants}
                    />
                    <StatsCard
                        label="Completed Visits"
                        count={stats.visits}
                        icon={statsIcons.visits}
                        loading={loading}
                        theme={theme}
                        variants={itemVariants}
                    />
                    <StatsCard
                        label="Patients"
                        count={stats.patients}
                        icon={statsIcons.patients}
                        loading={loading}
                        theme={theme}
                        variants={itemVariants}
                    />
                    <StatsCard
                        label="Doctors"
                        count={stats.doctors}
                        icon={statsIcons.doctors}
                        loading={loading}
                        theme={theme}
                        variants={itemVariants}
                    />
                </motion.div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-xl font-semibold mb-4"
                        style={{ color: theme.primaryDark }}
                    >
                        Quick Actions
                    </motion.h2>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                        {quickActions.map((action, index) => (
                            <ActionCard
                                key={index}
                                title={action.title}
                                to={action.to}
                                icon={action.icon}
                                description={action.description}
                                theme={theme}
                                variants={itemVariants}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Recent Activity Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="bg-white p-6 rounded-lg shadow-md"
                    style={{ borderTop: `4px solid ${theme.primary}` }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2
                            className="text-xl font-semibold"
                            style={{ color: theme.primaryDark }}
                        >
                            Hospital Overview
                        </h2>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-sm px-3 py-1 rounded"
                            style={{ backgroundColor: theme.accent, color: theme.primaryDark }}
                        >
                            View Reports
                        </motion.button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded" style={{ backgroundColor: theme.accent }}>
                            <h3 className="font-medium mb-2" style={{ color: theme.primaryDark }}>
                                Today's Appointment Rate
                            </h3>
                            <div className="flex items-center">
                                <div className="text-2xl font-bold" style={{ color: theme.primary }}>
                                    87%
                                </div>
                                <div className="ml-2 text-green-600 text-sm">+2.5%</div>
                            </div>
                        </div>

                        <div className="p-4 rounded" style={{ backgroundColor: theme.accent }}>
                            <h3 className="font-medium mb-2" style={{ color: theme.primaryDark }}>
                                Patient Satisfaction
                            </h3>
                            <div className="flex items-center">
                                <div className="text-2xl font-bold" style={{ color: theme.primary }}>
                                    92%
                                </div>
                                <div className="ml-2 text-green-600 text-sm">+1.2%</div>
                            </div>
                        </div>

                        <div className="p-4 rounded" style={{ backgroundColor: theme.accent }}>
                            <h3 className="font-medium mb-2" style={{ color: theme.primaryDark }}>
                                Doctor Availability
                            </h3>
                            <div className="flex items-center">
                                <div className="text-2xl font-bold" style={{ color: theme.primary }}>
                                    78%
                                </div>
                                <div className="ml-2 text-red-500 text-sm">-3.7%</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

const StatsCard = ({ label, count, icon, loading, theme, variants }) => (
    <motion.div
        variants={variants}
        className="bg-white p-6 rounded-lg shadow-md overflow-hidden relative"
        whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
        style={{ borderLeft: `4px solid ${theme.primary}` }}
    >
        {loading ? (
            <div className="flex flex-col items-center justify-center h-32">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-4 rounded-full border-t-transparent"
                    style={{ borderColor: `${theme.accent} transparent ${theme.primary} transparent` }}
                />
            </div>
        ) : (
            <>
                <div className="flex justify-between items-center mb-4">
                    <div
                        className="p-3 rounded-md"
                        style={{ backgroundColor: theme.accent, color: theme.primary }}
                    >
                        {icon}
                    </div>
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="text-xs font-medium px-2 py-1 rounded"
                        style={{ backgroundColor: theme.accent, color: theme.primary }}
                    >
                        Last 30 days
                    </motion.span>
                </div>
                <div className="flex flex-col">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl font-bold mb-1"
                        style={{ color: theme.primary }}
                    >
                        {count}
                    </motion.h2>
                    <p className="text-gray-600">{label}</p>
                </div>
                {/* Decorative element */}
                <div
                    className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-10"
                    style={{ backgroundColor: theme.primary }}
                ></div>
            </>
        )}
    </motion.div>
);

const ActionCard = ({ title, to, icon, description, theme, variants }) => (
    <motion.div variants={variants}>
        <Link to={to} className="block h-full">
            <motion.div
                className="p-6 rounded-lg shadow-md h-full flex flex-col"
                style={{
                    backgroundColor: "white",
                    borderTop: `4px solid ${theme.primaryLight}`
                }}
                whileHover={{
                    y: -5,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    backgroundColor: theme.accent
                }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <div
                    className="p-3 rounded-md mb-4 self-start"
                    style={{ backgroundColor: theme.accent, color: theme.primary }}
                >
                    {icon}
                </div>
                <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: theme.primaryDark }}
                >
                    {title}
                </h3>
                <p className="text-gray-600 text-sm flex-grow">{description}</p>
                <div className="mt-4 flex justify-end">
                    <motion.div
                        className="flex items-center text-sm font-medium"
                        style={{ color: theme.primary }}
                        whileHover={{ x: 5 }}
                    >
                        Go to {title.split(" ")[1]}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ml-1"
                        >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </motion.div>
                </div>
            </motion.div>
        </Link>
    </motion.div>
);

export default AdminHome;