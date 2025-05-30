// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const PatientList = ({ patients, fetchPatients, setSelected, setEditing }) => {
//     const [searchQuery, setSearchQuery] = useState('');

//     const filteredPatients = patients.filter((p) =>
//         p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         p.contact?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         p.gender?.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this patient?')) {
//             try {
//                 await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/patients/${id}`);
//                 fetchPatients();
//                 // Would be better with toast notification
//                 toast.error('Patient deleted successfully.');
//             } catch (error) {
//                 console.error('Error deleting patient:', error);
//                 toast.error('Failed to delete patient. Try again.');
//             }
//         }
//     };

//     return (
//         <div className="bg-white rounded-lg shadow-md border border-purple-100 overflow-hidden">
//             <div className="p-4 bg-purple-50 border-b border-purple-100 flex justify-between items-center">
//                 <h2 className="text-xl font-semibold text-purple-800">Patient Registry</h2>

//                 <div className="relative">
//                     <input
//                         type="text"
//                         placeholder="Search patients..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="pl-10 pr-4 py-2 border border-purple-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors w-64"
//                     />
//                     <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
//                 </div>
//             </div>

//             {filteredPatients.length === 0 ? (
//                 <div className="p-8 text-center text-gray-500 bg-gray-50">
//                     <div className="text-5xl mb-3">📋</div>
//                     <p className="text-lg font-medium">No patients found</p>
//                     <p className="text-sm">Try a different search or add a new patient record</p>
//                 </div>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-purple-100">
//                         <thead>
//                             <tr className="bg-purple-50">
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Age</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Gender</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Contact</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">Address</th>
//                                 <th className="px-6 py-3 text-right text-xs font-medium text-purple-800 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-purple-50">
//                             {filteredPatients.map((p) => (
//                                 <tr key={p._id} className="hover:bg-purple-50 transition-colors">
//                                     <td className="px-6 py-4 whitespace-nowrap font-medium">{p.name}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{p.age}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                                             ${p.gender === 'Male' ? 'bg-blue-100 text-blue-800' :
//                                                 p.gender === 'Female' ? 'bg-pink-100 text-pink-800' :
//                                                     'bg-purple-100 text-purple-800'}`}>
//                                             {p.gender}
//                                         </span>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{p.contact}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap truncate max-w-xs">{p.address}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
//                                         <button
//                                             onClick={() => setSelected(p)}
//                                             className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-3 py-1 rounded-md mr-2 transition-colors"
//                                         >
//                                             View
//                                         </button>
//                                         <button
//                                             onClick={() => setEditing(p)}
//                                             className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-md mr-2 transition-colors"
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() => handleDelete(p._id)}
//                                             className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded-md transition-colors"
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PatientList;


import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PatientList = ({ patients, fetchPatients, setSelected, setEditing }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPatients = patients.filter((p) =>
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.contact?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.gender?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            try {
                await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/api/patients/${id}`);
                fetchPatients();
                toast.error('Patient deleted successfully.');
            } catch (error) {
                console.error('Error deleting patient:', error);
                toast.error('Failed to delete patient. Try again.');
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md border border-purple-100 overflow-hidden">
            <div className="p-4 bg-purple-50 border-b border-purple-100 flex flex-col sm:flex-row sm:justify-between gap-4 items-center">
                <h2 className="text-xl font-semibold text-purple-800">Patient Registry</h2>

                <div className="relative w-full sm:w-64">
                    <input
                        type="text"
                        placeholder="Search patients..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-purple-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors w-full"
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                </div>
            </div>

            {filteredPatients.length === 0 ? (
                <div className="p-8 text-center text-gray-500 bg-gray-50">
                    <div className="text-5xl mb-3">📋</div>
                    <p className="text-lg font-medium">No patients found</p>
                    <p className="text-sm">Try a different search or add a new patient record</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-purple-100">
                        <thead className="bg-purple-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-purple-800 uppercase">Name</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-purple-800 uppercase">Age</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-purple-800 uppercase">Gender</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-purple-800 uppercase">Contact</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-purple-800 uppercase">Address</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-purple-800 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-purple-50">
                            {filteredPatients.map((p) => (
                                <tr key={p._id} className="hover:bg-purple-50 transition-colors">
                                    <td className="px-4 py-4 whitespace-nowrap font-medium">{p.name}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{p.age}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${p.gender === 'Male' ? 'bg-blue-100 text-blue-800' :
                                                p.gender === 'Female' ? 'bg-pink-100 text-pink-800' :
                                                    'bg-purple-100 text-purple-800'}`}>
                                            {p.gender}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">{p.contact}</td>
                                    <td className="px-4 py-4 whitespace-nowrap truncate max-w-xs">{p.address}</td>
                                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                                        <div className="flex justify-end flex-wrap gap-2">
                                            <button
                                                onClick={() => setSelected(p)}
                                                className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-3 py-1 rounded-md"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() => setEditing(p)}
                                                className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-md"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p._id)}
                                                className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded-md"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PatientList;
