import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialForm = {
    name: "",
    specialization: "",
    image: null,
};

const DepartmentsPage = () => {
    const [departments, setDepartments] = useState([]);
    const [form, setForm] = useState(initialForm);
    const [editingId, setEditingId] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/departments`);
            setDepartments(res.data);
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
        if (form.image) formData.append("image", form.image);

        try {
            if (editingId) {
                await axios.put(
                    `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/departments/${editingId}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                toast.success("Department updated");
            } else {
                await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/departments`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("Department added");
            }
            setForm(initialForm);
            setEditingId(null);
            fetchData();
        } catch (error) {
            console.error(error); // Log the error details
            toast.error("Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/departments/${id}`);
            toast.success("Department deleted");
            fetchData();
        } catch {
            toast.error("Delete failed");
        }
    };

    const startEdit = (dept) => {
        setForm({
            name: dept.name,
            specialization: dept.specialization,
            image: null, // will upload new one if needed
        });
        setEditingId(dept._id);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-purple-800">Department Management</h1>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-6 shadow-md rounded-lg border border-purple-100 max-w-md mb-8"
                encType="multipart/form-data"
            >
                <h2 className="text-xl font-semibold text-purple-700 mb-2">
                    {editingId ? "Update Department" : "Add New Department"}
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                        <input
                            type="text"
                            placeholder="Enter department name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full border border-purple-200 p-3 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                        <input
                            type="text"
                            placeholder="Enter specialization"
                            value={form.specialization}
                            onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                            className="w-full border border-purple-200 p-3 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                            className="w-full border border-purple-200 p-2 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full bg-purple-700 hover:bg-purple-600 text-white font-medium py-3 px-4 rounded-md transition-colors shadow-sm"
                    >
                        {editingId ? "Update Department" : "Add Department"}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            onClick={() => {
                                setForm(initialForm);
                                setEditingId(null);
                            }}
                            className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
                        >
                            Cancel Editing
                        </button>
                    )}
                </div>
            </form>

            {/* List */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden border border-purple-100">
                <h2 className="text-xl font-semibold text-purple-800 p-4 bg-purple-50 border-b border-purple-100">
                    Department List
                </h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-purple-100 text-purple-800">
                                <th className="py-3 px-4 text-left">Image</th>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Specialization</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-purple-100">
                            {departments.map((dept) => (
                                <tr key={dept._id} className="hover:bg-purple-50 transition-colors">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center">
                                            <img
                                                src={`${dept.image}`}
                                                alt={dept.name}
                                                className="w-12 h-12 object-cover rounded-full border-2 border-purple-200"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://via.placeholder.com/48x48?text=Dept";
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 font-medium">{dept.name}</td>
                                    <td className="py-3 px-4">{dept.specialization}</td>
                                    <td className="py-3 px-4 text-right space-x-2">
                                        <button
                                            onClick={() => startEdit(dept)}
                                            className="bg-purple-600 hover:bg-purple-700 text-white py-1 px-3 rounded-md text-sm transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(dept._id)}
                                            className="bg-white hover:bg-red-50 text-red-600 border border-red-200 py-1 px-3 rounded-md text-sm transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {departments.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="py-8 text-center text-gray-500">
                                        No departments found. Add your first department above.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DepartmentsPage;