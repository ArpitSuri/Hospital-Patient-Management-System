import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Header from "./Header";
// import Footer from "./Footer";

const AppointmentForm = () => {
    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        patientName: "",
        patientEmail: "",
        department: "",
        doctor: "",
        appointmentDate: "",
        message: "",
    });
    const [formStage, setFormStage] = useState(1);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/departments`)
            .then(res => setDepartments(res.data))
            .catch(err => toast.error("Failed to fetch departments"));
    }, []);

    useEffect(() => {
        if (formData.department) {
            axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/doctors/department/${formData.department}`)
                .then(res => setDoctors(res.data))
                .catch(err => toast.error("Failed to fetch doctors"));
        }
    }, [formData.department]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const advanceForm = () => {
        setAnimating(true);
        setTimeout(() => {
            setFormStage(prev => prev + 1);
            setAnimating(false);
        }, 300);
    };

    const retreatForm = () => {
        setAnimating(true);
        setTimeout(() => {
            setFormStage(prev => prev - 1);
            setAnimating(false);
        }, 300);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/appointments`, formData)
            .then(res => {
                toast.success("Appointment Requested Successfully!");
                setFormData({
                    patientName: "",
                    patientEmail: "",
                    department: "",
                    doctor: "",
                    appointmentDate: "",
                    message: "",
                });
                setFormStage(3); // Success stage
            })
            .catch(err => {
                toast.error("Error: " + (err.response?.data?.error || err.message));
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // Calculate min date for appointment (today)
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    const minDate = today.toISOString().slice(0, 16);

    // Validate stage 1 form fields
    const isStage1Valid = formData.patientName && formData.patientEmail;
    // Validate stage 2 form fields
    const isStage2Valid = formData.department && formData.doctor && formData.appointmentDate;

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
            {/* <Header /> */}
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false}
                newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />

            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
                    <div className="px-8 pt-8 pb-10 bg-gradient-to-r from-blue-600 to-indigo-600">
                        <h2 className="text-4xl font-bold text-white text-center tracking-tight">Book an Appointment</h2>
                        <p className="text-blue-100 text-center mt-3">Fill out the form below to request an appointment with our specialists</p>

                        {/* Progress indicator */}
                        <div className="mt-6 flex justify-center">
                            <div className="flex items-center space-x-4">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full 
                                    ${formStage >= 1 ? 'bg-white text-blue-600' : 'bg-blue-400 text-white'} 
                                    border-2 border-white transition-all duration-300`}>
                                    <span className="font-bold">1</span>
                                </div>
                                <div className={`w-16 h-1 ${formStage >= 2 ? 'bg-white' : 'bg-blue-400'} transition-all duration-500`}></div>
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full 
                                    ${formStage >= 2 ? 'bg-white text-blue-600' : 'bg-blue-400 text-white'} 
                                    border-2 border-white transition-all duration-300`}>
                                    <span className="font-bold">2</span>
                                </div>
                                <div className={`w-16 h-1 ${formStage >= 3 ? 'bg-white' : 'bg-blue-400'} transition-all duration-500`}></div>
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full 
                                    ${formStage >= 3 ? 'bg-white text-blue-600' : 'bg-blue-400 text-white'} 
                                    border-2 border-white transition-all duration-300`}>
                                    <span className="font-bold">3</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        {/* Stage 1: Personal Information */}
                        <div className={`transition-all duration-300 transform ${animating ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'} 
                                        ${formStage === 1 ? 'block' : 'hidden'}`}>
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h3>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="patientName"
                                            name="patientName"
                                            placeholder="John Doe"
                                            className="pl-10 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            value={formData.patientName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="patientEmail" className="block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
                                            id="patientEmail"
                                            name="patientEmail"
                                            placeholder="you@example.com"
                                            className="pl-10 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            value={formData.patientEmail}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <button
                                        type="button"
                                        onClick={advanceForm}
                                        disabled={!isStage1Valid}
                                        className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 transform hover:translate-y-px"
                                    >
                                        Continue to Appointment Details
                                        <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Stage 2: Appointment Details */}
                        <div className={`transition-all duration-300 transform ${animating ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'} 
                                        ${formStage === 2 ? 'block' : 'hidden'}`}>
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">Appointment Details</h3>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                                        Department
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                            </svg>
                                        </div>
                                        <select
                                            id="department"
                                            name="department"
                                            className="pl-10 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            value={formData.department}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Department</option>
                                            {departments.map(dep => (
                                                <option key={dep._id} value={dep._id}>{dep.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
                                        Doctor
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <select
                                            id="doctor"
                                            name="doctor"
                                            className="pl-10 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            value={formData.doctor}
                                            onChange={handleChange}
                                            required
                                            disabled={!formData.department}
                                        >
                                            <option value="">Select Doctor</option>
                                            {doctors.map(doc => (
                                                <option key={doc._id} value={doc._id}>{doc.name}</option>
                                            ))}
                                        </select>
                                        {!formData.department && (
                                            <p className="text-xs text-gray-500 mt-1 ml-2">Please select a department first</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">
                                        Preferred Date & Time
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input
                                            type="datetime-local"
                                            id="appointmentDate"
                                            name="appointmentDate"
                                            className="pl-10 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            value={formData.appointmentDate}
                                            onChange={handleChange}
                                            required
                                            min={minDate}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                        Message <span className="text-gray-500 text-xs">(optional)</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        placeholder="Please describe your symptoms or reason for appointment"
                                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div className="flex justify-between pt-6 space-x-4">
                                    <button
                                        type="button"
                                        onClick={retreatForm}
                                        className="w-1/3 inline-flex justify-center items-center px-6 py-3 border border-gray-300 shadow-sm rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                    >
                                        <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading || !isStage2Valid}
                                        className="w-2/3 inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 transform hover:translate-y-px"
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Request Appointment
                                                <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Stage 3: Confirmation / Success */}
                        <div className={`transition-all duration-300 transform ${animating ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'} 
                                        ${formStage === 3 ? 'block' : 'hidden'}`}>
                            <div className="text-center py-6">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                                    <svg className="h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Appointment Requested!</h3>
                                <p className="text-gray-600 mb-6">We've received your appointment request and will contact you shortly via email to confirm.</p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFormStage(1);
                                    }}
                                    className="inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                >
                                    Book Another Appointment
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                        <div className="flex items-start space-x-3 text-sm text-gray-700">
                            <div className="flex-shrink-0 mt-1">
                                <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium">What happens next?</p>
                                <p className="text-gray-500 mt-1">Our team will review your request and confirm your appointment via email within 24 hours. You'll receive a confirmation with details and any pre-appointment instructions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </div>
    );
};

export default AppointmentForm;