import React, { useState } from 'react'
import HomePage from './components/user/HomePage'
import StudentForm from './components/user/StudentForm'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CodeGeneration from './components/user/CodeGenerate'
import Navbar from './components/user/Navbar'
import AdminOptions from './components/admin/AdminOptions'
import View from './components/admin/View'
import Verify from './components/admin/Verify'
import AttendeeDetails from './components/admin/AttendeeDetails'
import Events from './components/admin/Events'
import SuccessPage from './components/user/Successful'
function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [attendeeDetails, setAttendeeDetails] = useState(null);
  const [attendeeCode, setAttendeeCode] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <>
     <BrowserRouter>
     <Navbar isAdmin={isAdmin} logOut={()=>setIsAdmin(false)} logIn={()=>setIsAdmin(true)}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student-form" element={!isAdmin && attendeeCode==="" ? <StudentForm shareDetails={(d)=>setAttendeeDetails(d)} showCode={(d)=>setAttendeeCode(d)}/> : <Navigate to={"/"}/> }/>
        <Route path="/code" element={!isAdmin && attendeeCode!==""? <CodeGeneration code={attendeeCode} attendee={attendeeDetails}/> : <Navigate to={"/"}/> } />
        <Route path="/successful" element={!isAdmin && isSuccess ? <SuccessPage /> : <Navigate to={"/"}/> } />
        <Route path="/admin" element={isAdmin ? <AdminOptions /> : <Navigate to={"/"}/> } />
        <Route path="/view" element={isAdmin ? <View /> : <Navigate to={"/"}/> } />
        <Route path="/verify" element={isAdmin ? <Verify /> : <Navigate to={"/"}/> } />
        <Route path="/attendee-details" element={isAdmin ? <AttendeeDetails /> : <Navigate to={"/"}/> } />
        <Route path="/events" element={isAdmin ? <Events /> : <Navigate to={"/"}/> } />
        {/* <Route path="/admin" element={<AdminOptions/>} /> */}
        {/* <Route path="/view" element={<View/>} /> */}
        {/* <Route path="/verify" element={<Verify/>} /> */}
        {/* <Route path="/attendee-details" element={<AttendeeDetails/>} /> */}
        {/* <Route path="/events" element={<Events/>} /> */}
        {/* <Route path="/successful" element={<SuccessPage/>} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
