import React from "react";
import { Link } from "react-router-dom";

const SingleEmployee = ({ employees, match, edit, deleteEmployee }) => {
  const id = parseInt(match.params.id);
  const employee = employees.find((employee) => employee.id === id);

  const div = {
    textAlign: "center",
    border: "3px solid green",
    width: "80%",
    margin: "30px auto",
  };

  return (
    <div style={div}>
      <h1>{employee.name}</h1>
      <button onClick={(event) => edit(employee)}>Edit</button>
      <button onClick={(event) => deleteEmployee(employee)}>Delete</button>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
};

export default SingleEmployee;