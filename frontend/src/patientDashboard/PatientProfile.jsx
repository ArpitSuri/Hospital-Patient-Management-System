import React, { useEffect, useState } from 'react';
import AddVisitForm from './AddVisitForm';
import axios from 'axios';
import { CalendarDays, Phone, ArrowLeft, FilePlus } from 'lucide-react';

const PatientProfile = ({ patient, clearSelected }) => {
    const [fullPatient, setFullPatient] = useState(null);
    const [selectedVisit, setSelectedVisit] = useState(null);

    const refresh = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/patients/${patient._id}`);
        setFullPatient(data);
    };

    useEffect(() => {
        if (patient) refresh();
    }, [patient]);

    if (!fullPatient) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="bg-purple-100 p-8 rounded-lg shadow-md">
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-purple-300 h-12 w-12"></div>
                        <div className="flex-1 space-y-4 py-1">
                            <div className="h-4 bg-purple-300 rounded w-3/4"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-purple-300 rounded"></div>
                                <div className="h-4 bg-purple-300 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                    <p className="text-purple-700 mt-4 text-center">Loading patient data...</p>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="border-b border-purple-200 pb-4 mb-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-purple-800">{fullPatient.name}'s Profile</h2>
                    <button
                        onClick={clearSelected}
                        className="flex items-center px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-md transition-colors"
                    >
                        <ArrowLeft size={18} className="mr-2" />
                        Back
                    </button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center text-purple-700">
                        <CalendarDays className="mr-2" size={18} />
                        <span>Age: {fullPatient.age} | Gender: {fullPatient.gender}</span>
                    </div>
                    <div className="flex items-center text-purple-700">
                        <Phone className="mr-2" size={18} />
                        <span>Contact: {fullPatient.contact}</span>
                    </div>
                </div>
            </div>

            {/* Add Visit Form */}
            <div className="bg-purple-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-medium text-purple-800 mb-3 flex items-center">
                    <FilePlus size={20} className="mr-2" />
                    Add New Visit
                </h3>
                <AddVisitForm patientId={fullPatient._id} refreshPatient={refresh} />
            </div>

            {/* Visit History */}
            <div>
                <h3 className="text-lg font-medium text-purple-800 mb-4">Visit History</h3>

                {fullPatient.visits.length === 0 ? (
                    <p className="text-gray-500 italic text-center py-4">No visit records found.</p>
                ) : (
                    <div className="space-y-4">
                        {fullPatient.visits.map((visit, i) => (
                            <div
                                key={i}
                                className="border border-purple-100 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => setSelectedVisit(selectedVisit === i ? null : i)}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-purple-700">{formatDate(visit.visitDate)}</p>
                                        <p className="text-gray-700">{visit.diagnosis}</p>
                                    </div>
                                    <div className="flex items-center">
                                        {visit.prescriptionImageUrl && (
                                            <div className="bg-purple-100 p-1 rounded">
                                                <img
                                                    src={`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}${visit.prescriptionImageUrl}`}
                                                    alt="Prescription"
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {selectedVisit === i && (
                                    <div className="mt-4 pt-4 border-t border-purple-100">
                                        <p className="text-sm text-gray-600 mb-2">
                                            <span className="font-medium text-purple-700">Notes:</span>
                                            {visit.notes || "No additional notes"}
                                        </p>
                                        {visit.prescriptionImageUrl && (
                                            <div className="mt-3">
                                                <p className="text-sm font-medium text-purple-700 mb-2">Prescription:</p>
                                                <div className="flex justify-center bg-purple-50 p-2 rounded-lg">
                                                    <img
                                                        src={`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}${visit.prescriptionImageUrl}`}
                                                        alt="Full prescription"
                                                        className="max-w-full max-h-64 object-contain"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientProfile;