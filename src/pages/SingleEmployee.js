import React from "react";
import { Link } from "react-router-dom";

const SingleEmployee = ({ employees, match, edit, deleteEmployee, update, user }) => {
  const id = parseInt(match.params.id);
  const employee = employees.find((employee) => employee.id === id);

  const div = {
    textAlign: "center",
    border: "3px solid green",
    width: "80%",
    margin: "30px auto",
  };
console.log(employee)

  const addAssignee = (employee) => {
    employee.assignee = user
    update(employee)
  }

  return (
    <div style={div}>
      <h1>{employee.name}</h1>
      <h2>{employee.title}</h2>
      <h2>{employee.team}</h2>
      <h2>{employee.onboarding ? "Onboarding" : "Onboarded"}</h2>
      <h2>{employee.remote ? "Remote" : "On-Site"}</h2>
      <button onClick={(event) => edit(employee)}>Edit</button>
      <button onClick={(event) => deleteEmployee(employee)}>Delete</button>
      <button onClick={(event) => addAssignee(employee)}>Assign</button>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
};

export default SingleEmployee;