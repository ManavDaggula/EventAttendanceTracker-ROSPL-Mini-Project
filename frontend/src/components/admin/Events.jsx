import axios from "axios";
import "./admin_css/events.css"
import React, { useEffect, useRef, useState } from 'react'

const Events = () => {
  const [eventList, setEventList] = useState([])
  const newEvent = useRef(null);

  function addEvent(){
    if(newEvent.current.value.trim() && newEvent.current.value.trim()!==""){
      axios.post("http://localhost:8000/addEvent",{eventName:newEvent.current.value, eventTime: new Date()},{withCredentials: true})
      .then((data)=>{
        setEventList(prev=>[...prev, data.data])
      })
    }
    else{
      window.alert("New event name should not be empty.")
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:8000/listEvents", {withCredentials: true})
      .then((data) => {
        console.log(data.data);
        setEventList(data.data);
      })
      .catch((e) => {
        console.error(e.message)
      });

    // console.log("rendered");
  }, []);

  return (
    <>
    <div className="event-data">
        {eventList.map((data,index)=><Event key={index} event={data}/>)}
    </div>
    <div className="event-form">
      <label>Event Name</label>
      <input type="text" placeholder="enter new event name" ref={newEvent}/>
      <button onClick={addEvent}>Add Event</button>
    </div>
    </>
  )
}

function Event(props) {
  const [isRunning, setIsRunning] = useState(props.event.endTime ? false : true);

  function stopEvent(){
    axios.get(`http://localhost:8000/stopEvent?event=${props.event.name}`,{withCredentials: true})
    .then(data=>{setIsRunning(false)})
    .catch(err=>{console.error(err.message)})
  }

  function startEvent(){
    axios.get(`http://localhost:8000/startEvent?event=${props.event.name}`,{withCredentials: true})
    .then(data=>{setIsRunning(true)})
    .catch(err=>{console.error(err.message)})
  }

  return (
    <div className="eventCard">
      <span>{props.event.name}</span>
      {isRunning ? <button onClick={stopEvent}>Stop event</button>
      : <button onClick={startEvent}>Run Event</button>}
    </div>
  )
}

export default Events