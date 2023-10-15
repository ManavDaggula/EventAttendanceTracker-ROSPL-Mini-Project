import "./user_css/studentform.css"
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function StudentForm(props){

        const [event_list, setEventList] = useState([])
        const [name,setName] = useState('')
        const [event,setEvent] = useState('')
        const [department,setDepartment] = useState('Information Technology')
        const [roll,setRoll] = useState('')
        const [div,setDiv] = useState('A')
        const [year,setYear] = useState('F.E.')
      
        async function getEventList(){
          let data = await fetch("http://localhost:8000/getEvents")
          data = await data.json()
          return data;
        }
      
      
        useEffect(()=>{
          fetch("http://localhost:8000/getEvents")
          .then(data=>data.json())
          .then(data=>{setEventList(data);console.log(event_list);setEvent(event_list[0])})
          
          console.log("rendered")
        },[])
      
        function registerAttendee(){
          let form = document.getElementById("attendeeRegistration")
          
          let formData = {
            name:name,
            event:event,
            department:department,
            roll:roll,
            div:div,
            year:year
          }
          console.log(formData)
          axios.post("http://localhost:8000/newAttendee",formData)
          .then((code)=>{
            console.log(code)
            code = code.data
            props.shareDetails(formData)
            props.showCode(code)
          })
          .catch((err)=>{
            console.log(err)
            window.alert("Attendee already exists.")
          })
        }

    return(
      <>
        <div className="attendance-form">
            <h1>Enter Your Details To Mark Your Presence</h1>
            <div className="contact-form">
            <form className="form" action="http://localhost:8000/newAttendee" method='POST' id='attendeeRegistration'>
            <label htmlFor="name">Name</label>
            <input type="text" name='name' onChange={(e)=>{setName(e.target.value)}}/>
            <label htmlFor="department">Department</label>
        <select name="department" onChange={(e)=>{setDepartment(e.target.value)}}>
          <option value="I.T.">Information Technology.</option>
          <option value="C.S.">Computer Science</option>
          <option value="Mech.">Mechanical Engineering</option>
          <option value="Mech.">Instrumentation</option>
          <option value="Mech.">AIDS</option>
        </select>
        <label htmlFor="year">Year</label>
        <select name="year" onChange={(e)=>{setYear(e.target.value)}}>
          <option value="F.E.">F.E.</option>
          <option value="S.E.">S.E.</option>
          <option value="T.E.">T.E.</option>
          <option value="B.E.">B.E.</option>
        </select>
        <label htmlFor='div'>Div</label>
        <select name="div" id="" onChange={(e)=>{setDiv(e.target.value)}}>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
        <label htmlFor="roll">Roll</label>
        <input type="text" name='roll' onChange={(e)=>{setRoll(e.target.value)}}/>
        <label htmlFor="event">Event</label>
        <select name="event" id="" onChange={(e)=>{setEvent(e.target.value)}}>
          <option value='none' selected disabled hidden>Select an Event</option>
          {event_list.map((event,index)=>{
            return <option key={index} value={event}>{event}</option>
          })}
        </select>
        </form>
        <Link to="/code" className="button"  onClick={(e)=>{e.preventDefault();registerAttendee()}}>Register</Link>
            
        </div>
        </div>
        </>
    )
}