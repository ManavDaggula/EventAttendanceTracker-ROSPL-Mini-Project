import "./admin_css/attendeedetails.css"
import React from 'react'
import { Link } from "react-router-dom";

const AttendeeDetails = () => {
  return (
    <>
        <div className="attendee-details">
        <div className="details-content">
        <p className="label">Name</p>
        <div className="label-value"><p>Bhakti</p></div>
        <p className="label">Department</p>
        <div className="label-value"><p>IT</p></div>
    <p className="label">Year</p>
    <div className="label-value"><p>2023</p></div>
    <p className="label">Div</p>
    <div className="label-value"><p>A</p></div>
    <p className="label">Roll</p>
    <div className="label-value"><p>123</p></div>
    <p className="label">Event</p>
    <div className="label-value"><p>abcdsf</p></div>
    </div>
    <Link to="/code" className="button">Verify</Link>
        
    </div>
   </>
  )
}

export default AttendeeDetails