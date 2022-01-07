import React from "react"
import { Link } from "react-router-dom"

const Employee = ({employee}) => {
    const div = {
        textAlign: "center",
        border: "3px solid",
        margin: "10px auto",
        width: "80%"
    }
    return <div style={div}>
        <Link to={`/employee/${employee.id}`}>
            <h1>{employee.name}</h1>
            <div className="generalInfo">
            <h4>{employee.title}</h4>
            <h4>{employee.team}</h4>
            </div>
            <h4>{employee.departing ? "Departing" : <h4>{employee.onboarding ? "Onboarding" : "Onboarded"}</h4>}</h4>
        </Link>
    </div>
}

export default Employee