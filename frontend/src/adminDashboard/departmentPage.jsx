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
            const res = await axios.get("http://localhost:8080/api/departments");
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
                    `http://localhost:8080/api/departments/${editingId}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                toast.success("Department updated");
            } else {
                await axios.post("http://localhost:8080/api/departments", formData, {
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
            await axios.delete(`http://localhost:8080/api/departments/${id}`);
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
            <h1 className="text-2xl font-bold mb-4">Department Management</h1>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-4 shadow-md rounded-md max-w-md mb-6"
                encType="multipart/form-data"
            >
                <input
                    type="text"
                    placeholder="Department Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border p-2"
                    required
                />
                <input
                    type="text"
                    placeholder="Specialization"
                    value={form.specialization}
                    onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                    className="w-full border p-2"
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                    className="w-full border p-2"
                />

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    {editingId ? "Update Department" : "Add Department"}
                </button>
            </form>

            {/* List */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">Image</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Specialization</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((dept) => (
                            <tr key={dept._id} className="border-b text-center">
                                <td className="p-2">
                                    <img
                                        src={`http://localhost:8080/uploads/${dept.image}`}
                                        alt="Department"
                                        className="w-12 h-12 object-cover rounded-full mx-auto"
                                    />
                                </td>
                                <td className="p-2">{dept.name}</td>
                                <td className="p-2">{dept.specialization}</td>
                                <td className="p-2 space-x-2">
                                    <button onClick={() => startEdit(dept)} className="text-blue-600">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(dept._id)} className="text-red-600">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DepartmentsPage;
