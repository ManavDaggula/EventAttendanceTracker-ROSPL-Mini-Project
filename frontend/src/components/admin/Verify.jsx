import axios from "axios";
import "./admin_css/verify.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Verify = (props) => {
  const navigate = useNavigate()

  // const [attendee, setAttendee] = useState()
  // const promptRef = useRef(null)
  const [code, setCode] = useState("");
  const [event, setEvent] = useState("");
  const [eventList, setEventList] = useState([]);

  function validate() {
    if(event==""){
      window.alert("Select an event");
      return false;
    }
    if (code == "") {
      window.alert("Enter a code");
      return false;
    }
    if (!code.match(/^[a-zA-Z0-9]{4,4}$/)) {
      window.alert("Invalid code");
      return false;
    }

    return true;
  }

  function getAttendee() {
    if (validate()) {
      axios.get(`/api/getAttendee?eventName=${event}&code=${code.toUpperCase()}`,{withCredentials:true})
      .then(data=>{
        console.log(data)
        props.setAttendee(data.data)
        navigate("/attendee-details")
      })
      .catch(err=>{
        console.error(err.message)
        window.alert("No Such Record.")
      })
    } else {
    }
  }

  useEffect(() => {
    axios
      .get("/api/listRunningEvents")
      .then((data) => {
        console.log(data.data);
        setEventList(data.data);
      })
      .catch((e) => console.error(e.message));

    console.log("rendered");
  }, []);

  return (
    <div className="verify-attendee">
      <h3>Select Event</h3>
      <select
        name="event"
        id=""
        onChange={(e) => {
          setEvent(e.target.value);
        }}
        defaultValue={"none"}
      >
        <option value="none" disabled hidden>
          Select an Event
        </option>
        {eventList.map((event, index) => {
          return (
            <option key={index} value={event.name}>
              {event.name}
            </option>
          );
        })}
      </select>
      <h3>Enter Attendee Code</h3>
      <input maxLength={4} onChange={(e) => setCode(e.target.value)} />
      <button className="button" onClick={getAttendee}>
        CHECK
      </button>
    </div>
  );
};

export default Verify;
