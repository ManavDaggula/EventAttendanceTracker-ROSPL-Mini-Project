import "./admin_css/view.css"
import React, { useEffect, useState } from 'react'
function View() {
    const [attendeeList, setAttendeeList] = useState([])
    return (
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
                        <td>{data.dept}</td>
                        <td>{data.roll}</td>
                        <td>{data.div}</td>
                        <td>{data.year}</td>
                        <td>{data.event}</td>
                    </tr>
                )}
            </tbody>

        </table>
        </div>
    )
}

export default View