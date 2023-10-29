import React, { useEffect, useState } from "react";
import HomePage from "./components/user/HomePage";
import StudentForm from "./components/user/StudentForm";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CodeGeneration from "./components/user/CodeGenerate";
import Navbar from "./components/user/Navbar";
import AdminOptions from "./components/admin/AdminOptions";
import View from "./components/admin/View";
import Verify from "./components/admin/Verify";
import AttendeeDetails from "./components/admin/AttendeeDetails";
import Events from "./components/admin/Events";
import SuccessPage from "./components/user/Successful";
import AdminLogin from "./components/admin/AdminLogin";
function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [attendeeDetails, setAttendeeDetails] = useState(null);
  const [attendeeCode, setAttendeeCode] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem('attendeeDetails')){
      setAttendeeDetails(JSON.parse(localStorage.getItem('attendeeDetails')))
    }
    if(localStorage.getItem('attendeeCode')){
      setAttendeeCode(localStorage.getItem('attendeeCode'))
    }
    if(!localStorage.getItem('eventList')){
      localStorage.setItem('eventList',JSON.stringify([]))
    }
  },[])

  return (
    <>
      <BrowserRouter>
        <Navbar
          isAdmin={isAdmin}
          logOut={() => setIsAdmin(false)}
          logIn={() => setIsAdmin(true)}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/student-form"
            element={
              !isAdmin && attendeeCode === "" ? (
                <StudentForm
                  shareDetails={(d) => {
                    window.localStorage.setItem('attendeeDetails', JSON.stringify(d))
                    setAttendeeDetails(d)
                  }}
                  showCode={(d) => {
                    window.localStorage.setItem('attendeeCode',d)
                    setAttendeeCode(d)
                  }}
                />
              ) : !isAdmin && attendeeCode!=="" ? (<Navigate to={"/code"}/>) :
                <Navigate to={"/"} />
              
            }
          />
          <Route
            path="/code"
            element={
              !isAdmin && attendeeCode != "" ? (
                <CodeGeneration
                  code={attendeeCode}
                  attendee={attendeeDetails}
                  setSuccess={() => {
                    window.localStorage.removeItem("attendeeDetails")
                    window.localStorage.removeItem("attendeeCode")
                    setAttendeeCode("")
                    setAttendeeDetails(null)
                    setIsSuccess(true)
                  }}
                />
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
          <Route
            path="/successful"
            element={
              !isAdmin && isSuccess ? <SuccessPage/> : <Navigate to={"/"} />
            }
          />
          <Route
            path="/admin"
            element={isAdmin ? <AdminOptions /> : <Navigate to={"/"} />}
          />
          <Route
            path="/view"
            element={isAdmin ? <View /> : <Navigate to={"/"} />}
          />
          <Route
            path="/verify"
            element={
              isAdmin ? (
                <Verify
                  setAttendee={(d) => {
                    setAttendeeDetails(d);
                  }}
                />
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
          <Route
            path="/attendee-details"
            element={
              isAdmin ? (
                <AttendeeDetails attendee={attendeeDetails} />
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
          <Route
            path="/events"
            element={isAdmin ? <Events /> : <Navigate to={"/"} />}
          />
          <Route
            path="/login"
            element={<AdminLogin setAdmin={() => setIsAdmin(true)} />}
          />
          {/* <Route path="/admin" element={<AdminOptions/>} /> */}
          {/* <Route path="/view" element={<View/>} /> */}
          {/* <Route path="/verify" element={<Verify/>} /> */}
          {/* <Route path="/attendee-details" element={<AttendeeDetails/>} /> */}
          {/* <Route path="/events" element={<Events/>} /> */}
          {/* <Route path="/successful" element={<SuccessPage/>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
