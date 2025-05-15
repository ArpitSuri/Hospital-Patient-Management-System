import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientForm = ({ patient, fetchPatients, setEditing }) => {
    const [form, setForm] = useState({
        name: '',
        age: '',
        gender: '',
        contact: '',
        address: ''
    });

    useEffect(() => {
        if (patient) setForm(patient);
    }, [patient]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (patient) {
                await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/patients/${patient._id}`, form);
                setEditing(false);
            } else {
                await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/patients`, form);
            }
            fetchPatients();
            setForm({ name: '', age: '', gender: '', contact: '', address: '' });
        } catch (error) {
            console.error('Error saving patient:', error);
            // You could add toast notifications here
        }
    };

    const handleCancel = () => {
        setForm({ name: '', age: '', gender: '', contact: '', address: '' });
        if (patient) setEditing(false);
    };

    // Field configuration for cleaner rendering
    const fields = [
        { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter patient name' },
        { name: 'age', label: 'Age', type: 'number', placeholder: 'Enter age' },
        { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
        { name: 'contact', label: 'Contact Number', type: 'tel', placeholder: 'Enter contact number' },
        { name: 'address', label: 'Address', type: 'textarea', placeholder: 'Enter patient address' }
    ];

    return (
        <div className="bg-white rounded-lg shadow-md border border-purple-100 p-6 mb-8">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">
                {patient ? 'Edit Patient Details' : 'Register New Patient'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map((field) => (
                    <div key={field.name} className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            {field.label}
                        </label>

                        {field.type === 'select' ? (
                            <select
                                name={field.name}
                                value={form[field.name]}
                                onChange={handleChange}
                                className="w-full border border-purple-200 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
                                required
                            >
                                <option value="">Select {field.label}</option>
                                {field.options.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : field.type === 'textarea' ? (
                            <textarea
                                name={field.name}
                                placeholder={field.placeholder}
                                value={form[field.name]}
                                onChange={handleChange}
                                rows="3"
                                className="w-full border border-purple-200 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
                                required
                            />
                        ) : (
                            <input
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={form[field.name]}
                                onChange={handleChange}
                                className="w-full border border-purple-200 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
                                required
                            />
                        )}
                    </div>
                ))}

                <div className="flex gap-3 pt-3">
                    <button
                        type="submit"
                        className="bg-purple-700 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-md transition-colors shadow-sm flex-grow"
                    >
                        {patient ? 'Update Patient' : 'Register Patient'}
                    </button>

                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-md transition-colors border border-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PatientForm;