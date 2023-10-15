import React from 'react'
import HomePage from './components/user/HomePage'
import StudentForm from './components/user/StudentForm'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CodeGeneration from './components/user/CodeGenerate'
import Navbar from './components/user/Navbar'
import AdminOptions from './components/admin/AdminOptions'
import View from './components/admin/View'
import Verify from './components/admin/Verify'
import AttendeeDetails from './components/admin/AttendeeDetails'
import Events from './components/admin/Events'
import SuccessPage from './components/user/Successful'
function App() {

  return (
    <>
     <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student-form" element={<StudentForm />} />
        <Route path="/code" element={<CodeGeneration />} />
        <Route path="/admin" element={<AdminOptions/>} />
        <Route path="/view" element={<View/>} />
        <Route path="/verify" element={<Verify/>} />
        <Route path="/attendee-details" element={<AttendeeDetails/>} />
        <Route path="/events" element={<Events/>} />
        <Route path="/successful" element={<SuccessPage/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
