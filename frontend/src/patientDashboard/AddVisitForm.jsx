import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddVisitForm = ({ patientId, refreshPatient }) => {
    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedDept, setSelectedDept] = useState('');
    const [doctor, setDoctor] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [visitDate, setVisitDate] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchDepartments = async () => {
            const res = await axios.get('http://localhost:8080/api/departments');
            setDepartments(res.data);
        };
        fetchDepartments();
    }, []);

    useEffect(() => {
        const fetchDoctors = async () => {
            if (selectedDept) {
                const res = await axios.get(`http://localhost:8080/api/doctors/department/${selectedDept}`);
                setDoctors(res.data);
            } else {
                setDoctors([]);
            }
        };
        fetchDoctors();
    }, [selectedDept]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('diagnosis', diagnosis);
        formData.append('visitDate', visitDate);
        formData.append('departmentId', selectedDept);
        formData.append('doctorId', doctor);
        if (image) formData.append('prescriptionImage', image);

        try {
            await axios.post(`http://localhost:8080/api/patients/${patientId}/add-visit`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            refreshPatient();
            setDiagnosis('');
            setVisitDate('');
            setImage(null);
            setSelectedDept('');
            setDoctor('');
        } catch (err) {
            console.error(err);
            alert('Failed to add visit.');
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h3>Add New Visit</h3>

            <label>Visit Date:</label>
            <input type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} required />

            <br />

            <label>Diagnosis:</label>
            <input type="text" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} required />

            <br />

            <label>Department:</label>
            <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} required>
                <option value="">Select Department</option>
                {departments.map((d) => (
                    <option key={d._id} value={d._id}>{d.name}</option>
                ))}
            </select>

            <br />

            <label>Doctor:</label>
            <select value={doctor} onChange={(e) => setDoctor(e.target.value)} required disabled={!selectedDept}>
                <option value="">Select Doctor</option>
                {doctors.map((doc) => (
                    <option key={doc._id} value={doc._id}>{doc.name}</option>
                ))}
            </select>

            <br />

            <label>Prescription Image:</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

            <br /><br />

            <button type="submit">Add Visit</button>
        </form>
    );
};

export default AddVisitForm;
