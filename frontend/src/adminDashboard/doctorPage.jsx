import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    const fetchData = async () => {
        try {
            const [docRes, deptRes] = await Promise.all([
                axios.get("http://localhost:8080/api/doctors"),
                axios.get("http://localhost:8080/api/departments"),
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
                    `http://localhost:8080/api/doctors/${editingId}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                toast.success("Doctor updated");
            } else {
                await axios.post("http://localhost:8080/api/doctors", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("Doctor added");
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
            await axios.delete(`http://localhost:8080/api/doctors/${id}`);
            toast.success("Doctor deleted");
            fetchData();
        } catch {
            toast.error("Delete failed");
        }
    };

    const startEdit = (doc) => {
        setForm({
            name: doc.name,
            specialization: doc.specialization,
            department: doc.department,
            profileImage: null, // will upload new one if needed
        });
        setEditingId(doc._id);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Doctor Management</h1>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-4 shadow-md rounded-md max-w-md mb-6"
                encType="multipart/form-data"
            >
                <input
                    type="text"
                    placeholder="Doctor Name"
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
                <select
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full border p-2"
                    required
                >
                    <option value="">Select Department</option>
                    {departments.map((d) => (
                        <option key={d._id} value={d._id}>
                            {d.name}
                        </option>
                    ))}
                </select>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setForm({ ...form, profileImage: e.target.files[0] })}
                    className="w-full border p-2"
                />

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    {editingId ? "Update Doctor" : "Add Doctor"}
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
                            <th className="p-2">Department</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doc) => (
                            <tr key={doc._id} className="border-b text-center">
                                <td className="p-2">
                                    <img
                                        src={`http://localhost:8080/uploads/${doc.profileImage}`}
                                        alt="Profile"
                                        className="w-12 h-12 object-cover rounded-full mx-auto"
                                    />
                                </td>
                                <td className="p-2">{doc.name}</td>
                                <td className="p-2">{doc.specialization}</td>
                                <td className="p-2">
                                    {departments.find((d) => d._id === doc.department._id)?.name || "N/A"}
                                </td>
                                <td className="p-2 space-x-2">
                                    <button onClick={() => startEdit(doc)} className="text-blue-600">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(doc._id)} className="text-red-600">
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

export default DoctorsPage;
