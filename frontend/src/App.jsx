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
import PatientRecordDashboard from './patientDashboard/DashBoard'
import AdminHome from './adminDashboard/adminDashboard'
import HomePage from './publicPages/WebsitePublicPages/HomePage'
import Header from './publicPages/WebsitePublicPages/commonents/header'
import AboutPage from './publicPages/WebsitePublicPages/AboutPage'
import ServicesPage from './publicPages/WebsitePublicPages/ServicesPage'
import DentistsPage from './publicPages/WebsitePublicPages/DentistsPage'
import TestimonialsPage from './publicPages/WebsitePublicPages/TestimonialsPage'

function App() {

  return (
    <>
      <ToastContainer position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element= { <HomePage /> } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/dentists" element={<DentistsPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />

          <Route path="/appointment" element={<AppointmentForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="adminDashboard" element={<ProtectedRoute allowedRole="admin"> <AdminDashboard /> </ProtectedRoute>}>
            <Route index element={<AdminHome />} />
            <Route path='appointments' element={<AppointmentsPage />} />
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