import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const PatientList = ({ patients, fetchPatients, setSelected, setEditing }) => {

    const [searchQuery, setSearchQuery] = useState('');

    const filteredPatients = patients.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.gender.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            try {
                await axios.delete(`http://localhost:8080/api/patients/${id}`);
                fetchPatients();
                alert('Patient deleted successfully.');
            } catch (error) {
                console.error('Error deleting patient:', error);
                alert('Failed to delete patient. Try again.');
            }
        }
    };

    return (
        <div>
            <h2>All Patients</h2>

            <input
                type="text"
                placeholder="Search by name, contact or gender..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: '10px', padding: '5px', width: '300px' }}
            />

            {filteredPatients.length === 0 ? (
                <p>No patients found. Please add one.</p>
            ) : (
                <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Contact</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map((p) => (
                            <tr key={p._id}>
                                <td>{p.name}</td>
                                <td>{p.age}</td>
                                <td>{p.gender}</td>
                                <td>{p.contact}</td>
                                <td>{p.address}</td>
                                <td>
                                    <button onClick={() => setSelected(p)}>👁️ View</button>{' '}
                                    <button onClick={() => setEditing(p)}>✏️ Edit</button>{' '}
                                    <button onClick={() => handleDelete(p._id)}>🗑️ Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PatientList;
