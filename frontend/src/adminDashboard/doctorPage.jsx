import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

const initialForm = {
    name: "",
    specialization: "",
    department: "",
    profileImage: null,
};

const DoctorsPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [form, setForm] = useState(initialForm);
    const [editingId, setEditingId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    // Purple theme colors
    const theme = {
        primary: "#6B46C1", // Deep purple
        primaryLight: "#9F7AEA", // Light purple
        primaryDark: "#553C9A", // Dark purple
        accent: "#E9D8FD", // Very light purple
        text: "#2D3748", // Dark gray for text
        background: "#FAF5FF", // Very light purple background
    };

    const fetchData = async () => {
        try {
            const [docRes, deptRes] = await Promise.all([
                axios.get(` ${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/doctors`),
                axios.get(` ${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/departments`),
            ]);
            setDoctors(docRes.data);
            setDepartments(deptRes.data);
        } catch {
            toast.error("Failed to load data");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("specialization", form.specialization);
        formData.append("department", form.department);
        if (form.profileImage) formData.append("profileImage", form.profileImage);

        try {
            if (editingId) {
                await axios.put(
                    ` ${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/doctors/${editingId}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                toast.success("Doctor updated successfully!");
            } else {
                await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/doctors`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("Doctor added successfully!");
            }
            setForm(initialForm);
            setEditingId(null);
            setIsFormVisible(false);
            fetchData();
        } catch (error) {
            console.error(error);
            toast.error("Operation failed. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this doctor?")) return;
        try {
            await axios.delete(` ${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/doctors/${id}`);
            toast.success("Doctor deleted successfully!");
            fetchData();
        } catch {
            toast.error("Delete operation failed. Please try again.");
        }
    };

    const startEdit = (doc) => {
        setForm({
            name: doc.name,
            specialization: doc.specialization,
            department: doc.department._id,
            profileImage: null,
        });
        setEditingId(doc._id);
        setIsFormVisible(true);
    };

    const cancelEdit = () => {
        setForm(initialForm);
        setEditingId(null);
        setIsFormVisible(false);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
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

    const formVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
            },
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
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
                className="flex justify-between items-center mb-6"
            >
                <h1
                    className="text-3xl font-bold"
                    style={{ color: theme.primaryDark }}
                >
                    Doctor Management
                </h1>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsFormVisible(!isFormVisible)}
                    className="px-4 py-2 rounded-lg shadow-md"
                    style={{
                        backgroundColor: isFormVisible ? theme.primaryLight : theme.primary,
                        color: "white",
                    }}
                >
                    {isFormVisible
                        ? editingId
                            ? "Cancel Edit"
                            : "Hide Form"
                        : "Add New Doctor"}
                </motion.button>
            </motion.div>

            {/* Form Section */}
            <AnimatePresence>
                {isFormVisible && (
                    <motion.div
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mb-8"
                    >
                        <motion.form
                            onSubmit={handleSubmit}
                            className="space-y-4 p-6 rounded-lg shadow-lg"
                            style={{ backgroundColor: "white", borderTop: `4px solid ${theme.primary}` }}
                            encType="multipart/form-data"
                        >
                            <h2
                                className="text-xl font-semibold mb-4"
                                style={{ color: theme.primary }}
                            >
                                {editingId ? "Edit Doctor Details" : "Add New Doctor"}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        className="block text-sm font-medium mb-1"
                                        style={{ color: theme.text }}
                                    >
                                        Doctor Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter doctor's name"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2"
                                        style={{
                                            borderColor: theme.accent,
                                            focusRing: theme.primaryLight,
                                        }}
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        className="block text-sm font-medium mb-1"
                                        style={{ color: theme.text }}
                                    >
                                        Specialization
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter specialization"
                                        value={form.specialization}
                                        onChange={(e) =>
                                            setForm({ ...form, specialization: e.target.value })
                                        }
                                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2"
                                        style={{
                                            borderColor: theme.accent,
                                            focusRing: theme.primaryLight,
                                        }}
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        className="block text-sm font-medium mb-1"
                                        style={{ color: theme.text }}
                                    >
                                        Department
                                    </label>
                                    <select
                                        value={form.department}
                                        onChange={(e) =>
                                            setForm({ ...form, department: e.target.value })
                                        }
                                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2"
                                        style={{
                                            borderColor: theme.accent,
                                            focusRing: theme.primaryLight,
                                        }}
                                        required
                                    >
                                        <option value="">Select Department</option>
                                        {departments.map((d) => (
                                            <option key={d._id} value={d._id}>
                                                {d.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label
                                        className="block text-sm font-medium mb-1"
                                        style={{ color: theme.text }}
                                    >
                                        Profile Image
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setForm({ ...form, profileImage: e.target.files[0] })
                                        }
                                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2"
                                        style={{
                                            borderColor: theme.accent,
                                            focusRing: theme.primaryLight,
                                        }}
                                    />
                                    {editingId && (
                                        <span className="text-xs text-gray-500 mt-1">
                                            Leave empty to keep current image
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <motion.button
                                    type="button"
                                    onClick={cancelEdit}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 rounded-md"
                                    style={{ color: theme.primary, border: `1px solid ${theme.primary}` }}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 rounded-md"
                                    style={{ backgroundColor: theme.primary, color: "white" }}
                                >
                                    {editingId ? "Update Doctor" : "Add Doctor"}
                                </motion.button>
                            </div>
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Doctors List */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
                <div
                    className="py-3 px-4 font-semibold"
                    style={{ backgroundColor: theme.primary, color: "white" }}
                >
                    <h2 className="text-xl">Doctors Directory</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr style={{ backgroundColor: theme.accent }}>
                                <th className="p-3 text-left">Image</th>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Specialization</th>
                                <th className="p-3 text-left">Department</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {doctors.map((doc) => (
                                    <motion.tr
                                        key={doc._id}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit={{ opacity: 0, x: -100 }}
                                        className="border-b hover:bg-purple-50"
                                        style={{ borderColor: theme.accent }}
                                        layout
                                    >
                                        <td className="p-3">
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                className="w-12 h-12 rounded-full overflow-hidden"
                                                style={{ border: `2px solid ${theme.primaryLight}` }}
                                            >
                                                <img
                                                    src={`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/uploads/${doc.profileImage}`}
                                                    alt={doc.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                            doc.name
                                                        )}&background=9F7AEA&color=fff`;
                                                    }}
                                                />
                                            </motion.div>
                                        </td>
                                        <td className="p-3 font-medium" style={{ color: theme.text }}>
                                            {doc.name}
                                        </td>
                                        <td className="p-3" style={{ color: theme.text }}>
                                            {doc.specialization}
                                        </td>
                                        <td className="p-3" style={{ color: theme.text }}>
                                            {doc.department?.name || "N/A"}
                                        </td>
                                        <td className="p-3">
                                            <div className="flex justify-center space-x-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => startEdit(doc)}
                                                    className="p-2 rounded-full"
                                                    style={{ backgroundColor: theme.accent }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill={theme.primary}
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                    </svg>
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleDelete(doc._id)}
                                                    className="p-2 rounded-full"
                                                    style={{ backgroundColor: "#FED7D7" }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="#E53E3E"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                                        />
                                                    </svg>
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>

                            {doctors.length === 0 && (
                                <motion.tr
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <td colSpan="5" className="p-6 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="48"
                                                height="48"
                                                fill={theme.primaryLight}
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                                            </svg>
                                            <p style={{ color: theme.text }}>No doctors found</p>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setIsFormVisible(true)}
                                                className="px-4 py-2 rounded-md"
                                                style={{ backgroundColor: theme.primary, color: "white" }}
                                            >
                                                Add Your First Doctor
                                            </motion.button>
                                        </div>
                                    </td>
                                </motion.tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default DoctorsPage;