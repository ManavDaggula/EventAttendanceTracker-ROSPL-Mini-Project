import "./admin_css/adminoptions.css"
import React from 'react'
import { Link } from "react-router-dom";

const AdminOptions = () => {
  return (
    <div className="admin-main">
    <div className="admin-list">
    <Link to="/events" className="select" >EVENTS</Link>
    <Link to="/verify" className="select">VERIFY</Link>
    <Link to="/view" className="select">VIEW</Link>
    </div>
    </div>
  )
}

export default AdminOptions