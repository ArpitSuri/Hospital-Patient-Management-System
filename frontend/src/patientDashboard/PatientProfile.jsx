import React, { useEffect, useState } from 'react';
import AddVisitForm from './AddVisitForm';
import axios from 'axios';

const PatientProfile = ({ patient, clearSelected }) => {
    const [fullPatient, setFullPatient] = useState(null);

    const refresh = async () => {
        const { data } = await axios.get(`http://localhost:8080/api/patients/${patient._id}`);
        setFullPatient(data);
    };

    useEffect(() => {
        if (patient) refresh();
    }, [patient]);

    if (!fullPatient) return <div>Loading...</div>;

    return (
        <div>
            <h2>{fullPatient.name}'s Profile</h2>
            <p>Age: {fullPatient.age} | Gender: {fullPatient.gender}</p>
            <p>Contact: {fullPatient.contact}</p>
            <AddVisitForm patientId={fullPatient._id} refreshPatient={refresh} />
            <h3>Visit History</h3>
            <ul>
                {fullPatient.visits.map((v, i) => (
                    <li key={i}>
                        <b>{v.visitDate.slice(0, 10)}</b> - {v.diagnosis}
                        { console.log(v.prescriptionImage, v.prescriptionImageUrl) 
                    }
                        {v.prescriptionImageUrl && (
                            <img src={`http://localhost:8080${v.prescriptionImageUrl}`} alt="presc" width="100" />
                        )}
                    </li>
                ))}
            </ul>
            <button onClick={clearSelected}>Back</button>
        </div>
    );
};

export default PatientProfile;
