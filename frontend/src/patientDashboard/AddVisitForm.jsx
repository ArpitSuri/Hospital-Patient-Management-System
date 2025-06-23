import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, FileText, Building2, UserRound, FileImage, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import ToothChart from './ToothChart';

const AddVisitForm = ({ patientId, refreshPatient }) => {
    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedDept, setSelectedDept] = useState('');
    const [doctor, setDoctor] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [visitDate, setVisitDate] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [toothNumbers, setToothNumbers] = useState([]);

    // const toothOptions = [
    //     'UR-1', 'UR-2', 'UR-3', 'UR-4', 'UR-5', 'UR-6', 'UR-7', 'UR-8',
    //     'UL-1', 'UL-2', 'UL-3', 'UL-4', 'UL-5', 'UL-6', 'UL-7', 'UL-8',
    //     'BR-1', 'BR-2', 'BR-3', 'BR-4', 'BR-5', 'BR-6', 'BR-7', 'BR-8',
    //     'BL-1', 'BL-2', 'BL-3', 'BL-4', 'BL-5', 'BL-6', 'BL-7', 'BL-8'
    // ];
    

    useEffect(() => {
        const fetchDepartments = async () => {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/departments`);
            setDepartments(res.data);
        };
        fetchDepartments();
    }, []);

    useEffect(() => {
        const fetchDoctors = async () => {
            if (selectedDept) {
                const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/doctors/department/${selectedDept}`);
                setDoctors(res.data);
            } else {
                setDoctors([]);
            }
        };
        fetchDoctors();
    }, [selectedDept]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            // Create a preview URL for the selected image
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImage(null);
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('diagnosis', diagnosis);
        formData.append('visitDate', visitDate);
        formData.append('departmentId', selectedDept);
        formData.append('doctorId', doctor);
        // toothNumbers.forEach((tooth) => formData.append('toothNumbers', tooth));
        toothNumbers.forEach(tooth => formData.append('toothNumbers', tooth));

        if (image) formData.append('prescriptionImage', image);

        try {
            await axios.post(` ${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/patients/${patientId}/add-visit`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            refreshPatient();
            setDiagnosis('');
            setVisitDate('');
            setImage(null);
            setImagePreview(null);
            setSelectedDept('');
            setDoctor('');
            setToothNumbers([]);
             setLoading(false);
        } catch (err) {
            console.error(err);
            toast('Failed to add visit.');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
            {/* Visit Date Field */}
            <div>
                <label className="  mb-1 text-sm font-medium text-purple-700 flex items-center">
                    <Calendar size={16} className="mr-1" />
                    Visit Date:
                </label>
                <input
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
            </div>

            {/* Diagnosis Field */}
            <div>
                <label className="  mb-1 text-sm font-medium text-purple-700 flex items-center">
                    <FileText size={16} className="mr-1" />
                    Diagnosis:
                </label>
                <input
                    type="text"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    placeholder="Enter diagnosis"
                    required
                    className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
            </div>

            {/* Department Selection */}
            <div>
                <label className="  mb-1 text-sm font-medium text-purple-700 flex items-center">
                    <Building2 size={16} className="mr-1" />
                    Clinics:
                </label>
                <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                >
                    <option value="">Select Clinics</option>
                    {departments.map((d) => (
                        <option key={d._id} value={d._id}>{d.name}</option>
                    ))}
                </select>
            </div>

            {/* Doctor Selection */}
            <div>
                <label className="  mb-1 text-sm font-medium text-purple-700 flex items-center">
                    <UserRound size={16} className="mr-1" />
                    Doctor:
                </label>
                <select
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    required
                    disabled={!selectedDept}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white ${!selectedDept ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed' : 'border-purple-200'
                        }`}
                >
                    <option value="">Select Doctor</option>
                    {doctors.map((doc) => (
                        <option key={doc._id} value={doc._id}>{doc.name}</option>
                    ))}
                </select>
                {!selectedDept && (
                    <p className="mt-1 text-xs text-purple-600">Please select a Clinics first</p>
                )}
            </div>

            {/* Tooth Numbers Selection */}
            {/* <div>
                <label className="mb-1 text-sm font-medium text-purple-700 flex items-center">
                    🦷 Tooth Numbers:
                </label>
                <select
                    multiple
                    value={toothNumbers}
                    onChange={(e) =>
                        setToothNumbers(Array.from(e.target.selectedOptions, option => option.value))
                    }
                    className="w-full h-32 px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                >
                    {toothOptions.map((tooth) => (
                        <option key={tooth} value={tooth}>
                            {tooth}
                        </option>
                    ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Hold Ctrl (Windows) or Cmd (Mac) to select multiple.</p>
            </div> */}

            <ToothChart selectedTeeth={toothNumbers} setSelectedTeeth={setToothNumbers} />



            {/* Prescription Image Upload */}
            <div>
                <label className="  mb-1 text-sm font-medium text-purple-700 flex items-center">
                    <FileImage size={16} className="mr-1" />
                    Prescription Image:
                </label>
                <div className="flex items-start space-x-3">
                    <div className="flex-1">
                        <label className="flex flex-col items-center px-4 py-3 bg-white text-purple-500 rounded-lg border border-purple-200 border-dashed cursor-pointer hover:bg-purple-50 transition-colors">
                            <FileImage className="w-8 h-8" />
                            <span className="mt-2 text-sm font-medium">Select Image</span>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>

                    {imagePreview && (
                        <div className="flex-1">
                            <div className="border border-purple-200 rounded-lg p-1 bg-white">
                                <img
                                    src={imagePreview}
                                    alt="Prescription Preview"
                                    className="h-24 w-full object-cover rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImage(null);
                                        setImagePreview(null);
                                    }}
                                    className="mt-1 w-full text-xs text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
                <button
                    type="submit"
                    className={`w-full flex items-center justify-center px-4 py-2 rounded-md font-medium text-white transition-colors ${loading
                            ? 'bg-purple-400 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
                        }`}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </>
                    ) : (
                        <>
                            <Plus size={18} className="mr-1" />
                            Add Visit
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default AddVisitForm;