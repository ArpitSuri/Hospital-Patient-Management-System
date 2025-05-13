import { useState } from 'react'
import './App.css'
import AppointmentForm from './components/AppointmentForm'
import AdminDashboard from './adminDashboard/adminLayout'
import AppointmentsPage from './adminDashboard/appointmentPage'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DoctorsPage from './adminDashboard/doctorPage'
import DepartmentsPage from './adminDashboard/departmentPage'
import ProtectedRoute from './Helpers/ProtectedRoute'
import Login from './publicPages/Login'
import HomePage from './publicPages/HomePage'
import Header from './components/Header'
import Dashboard from './patientDashboard/DashBoard'
import PatientRecordDashboard from './patientDashboard/DashBoard'


function App() {

  return(
    <>
      <ToastContainer position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <HomePage />} />
          <Route path="/appointment" element={<AppointmentForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="adminDashboard" element={<ProtectedRoute allowedRole="admin"> <AdminDashboard /> </ProtectedRoute>}>
            <Route  index element={<AppointmentsPage />} />
            <Route path="doctors" element={<DoctorsPage />} />
            <Route path="departments" element={<DepartmentsPage />} />
            <Route path="patientRecord" element={<PatientRecordDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )

}

export default App
