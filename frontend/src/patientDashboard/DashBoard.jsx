import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PatientForm from './PatientForm';
import PatientProfile from './PatientProfile';
import PatientList from './PateintList';

const PatientRecordDashboard = () => {
    const [patients, setPatients] = useState([]);
    const [selected, setSelected] = useState(null);
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPatients = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/patients`
            );
            setPatients(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching patients:', err);
            setError('Failed to load patient data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    return (
        <div className="space-y-6 px-4 sm:px-6 md:px-8 py-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-purple-200 gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-purple-900">Patient Management</h1>
                {selected && (
                    <button
                        onClick={() => setSelected(null)}
                        className="flex items-center gap-2 bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2 rounded-md transition-colors"
                    >
                        <span>←</span> Back to List
                    </button>
                )}
            </div>

            {/* Loading */}
            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="text-purple-600 animate-pulse text-lg font-medium">Loading patient data...</div>
                </div>
            ) : error ? (
                // Error
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                    {error}
                    <button
                        onClick={fetchPatients}
                        className="ml-4 underline text-red-600 hover:text-red-800"
                    >
                        Retry
                    </button>
                </div>
            ) : !selected ? (
                // Patient Form and List (2-column layout on large screens)
                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <PatientForm
                            patient={editing}
                            fetchPatients={fetchPatients}
                            setEditing={setEditing}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <PatientList
                            patients={patients}
                            fetchPatients={fetchPatients}
                            setSelected={setSelected}
                            setEditing={setEditing}
                        />
                    </div>
                </div>
            ) : (
                // Patient Profile view
                <div className="bg-white rounded-lg shadow-md border border-purple-100 p-4 sm:p-6">
                    <PatientProfile patient={selected} clearSelected={() => setSelected(null)} />
                </div>
            )}
        </div>
    );
};

export default PatientRecordDashboard;
