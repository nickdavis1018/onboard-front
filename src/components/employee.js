import React from "react"
import { Link } from "react-router-dom"

const Employee = ({employee}) => {
    const div = {
        textAlign: "center",
        border: "3px solid",
        margin: "10px auto",
        width: "80%"
    }
    const showImage = {
        height: "400px",
        width: "300px",
      };

    return <div style={div}>
        <Link to={`/employee/${employee.id}`}>
        <h1>{employee.name}</h1>
        <div className="flexCard">
            <h3>{employee.title}</h3>
            <h3>{employee.team}</h3></div>
            {employee.assignee ? <><h4>Assigned: {employee.assignee}</h4></> : "Unassigned"}
            <h4>{employee.departing ? "Departing" : employee.onboarding ? "Onboarding" : "Onboarded"}</h4>
            <img style={showImage} src={employee.img} alt={employee.name} />
        </Link>
    </div>
}

export default Employee