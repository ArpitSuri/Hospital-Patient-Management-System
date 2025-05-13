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
        if (patient) {
            await axios.put(`http://localhost:8080/api/patients/${patient._id}`, form);
            setEditing(false);
        } else {
            await axios.post('http://localhost:8080/api/patients', form);
        }
        fetchPatients();
        setForm({ name: '', age: '', gender: '', contact: '', address: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{patient ? 'Edit' : 'Add'} Patient</h2>
            {['name', 'age', 'gender', 'contact', 'address'].map((f) => (
                <input
                    key={f}
                    name={f}
                    placeholder={f}
                    value={form[f]}
                    onChange={handleChange}
                    required
                />
            ))}
            <button type="submit">{patient ? 'Update' : 'Add'} Patient</button>
        </form>
    );
};

export default PatientForm;
