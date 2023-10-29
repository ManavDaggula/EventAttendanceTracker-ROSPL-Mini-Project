import "./admin_css/attendeedetails.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AttendeeDetails = (props) => {
  const navigate = useNavigate();
  function validate() {
    axios
      .post(
        "/api/verifyAttendee",
        { eventName: props.attendee.event.name, code: props.attendee.code },
        { withCredentials: true }
      )
      .then((data) => {
        console.log(data);
        navigate("/verify");
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <>
      <div className="attendee-details">
        <div className="details-content">
          <p className="label">Name</p>
          <div className="label-value">
            <p>{props.attendee.name}</p>
          </div>
          <p className="label">Department</p>
          <div className="label-value">
            <p>{props.attendee.department}</p>
          </div>
          <p className="label">Year</p>
          <div className="label-value">
            <p>{props.attendee.year}</p>
          </div>
          <p className="label">Div</p>
          <div className="label-value">
            <p>{props.attendee.div}</p>
          </div>
          <p className="label">Roll</p>
          <div className="label-value">
            <p>{props.attendee.roll}</p>
          </div>
          <p className="label">Event</p>
          <div className="label-value">
            <p>{props.attendee.event.name}</p>
          </div>
        </div>
        <button className="button" onClick={validate}>
          Verify
        </button>
      </div>
    </>
  );
};

export default AttendeeDetails;
