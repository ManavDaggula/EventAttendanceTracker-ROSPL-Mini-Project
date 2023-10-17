import "./admin_css/view.css"
import React, { useEffect, useState } from 'react'
import axios from "axios";
function View() {
    const [event, setEvent] = useState('');
    const [eventList, setEventList] = useState([])
    const [attendeeList, setAttendeeList] = useState([])

    useEffect(() => {
        axios
          .get("http://localhost:8000/listEvents", {withCredentials: true})
          .then((data) => {
            console.log(data.data);
            setEventList(data.data);
          })
          .catch((e) => console.error(e.message));
    
        // console.log("rendered");
      }, []);

      useEffect(()=>{
        // console.log(event)
        if(event!="none"){
          axios.get("http://localhost:8000/listAttendees?event="+event, {withCredentials: true})
          .then((data)=>{
            console.log(data)
            setAttendeeList(data.data);
          })
          .catch((err)=>{
            // window.alert(err);
            console.error(err)
          })
        }
      },[event])

    return (
      <><h3>Select Event</h3>
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
        <div className="content">
            
        <table className="view-attendees">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Roll</th>
                    <th>Div</th>
                    <th>Year</th>
                    <th>Event</th>
                </tr>
            </thead>
            <tbody>
                {attendeeList.map((data, index) =>
                    <tr key={index}>
                        <td>{data.name}</td>
                        <td>{data.department}</td>
                        <td>{data.roll}</td>
                        <td>{data.div}</td>
                        <td>{data.year}</td>
                        <td>{event}</td>
                    </tr>
                )}
            </tbody>

        </table>
        </div>
        </>
    )
}

export default View