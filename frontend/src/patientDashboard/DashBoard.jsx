import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PatientForm from './PatientForm';
import PatientProfile from './PatientProfile';
import PatientList from './PateintList';



const PatientRecordDashboard = () => {
    const [patients, setPatients] = useState([]);
    const [selected, setSelected] = useState(null);
    const [editing, setEditing] = useState(null);

    const fetchPatients = async () => {
        const { data } = await axios.get('http://localhost:8080/api/patients');
        setPatients(data);
    };

    useEffect(() => { fetchPatients(); }, []);

    return (
        <div>
            <h1>Hospital Management</h1>
            {!selected ? (
                <>
                    <PatientForm
                        patient={editing}
                        fetchPatients={fetchPatients}
                        setEditing={setEditing}
                    />
                    <PatientList
                        patients={patients}
                        fetchPatients={fetchPatients}
                        setSelected={setSelected}
                        setEditing={setEditing}
                    />
                </>
            ) : (
                <PatientProfile patient={selected} clearSelected={() => setSelected(null)} />
            )}
        </div>
    );
};

export default PatientRecordDashboard;
