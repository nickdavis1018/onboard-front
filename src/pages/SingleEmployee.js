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

  const addAssignee = (employee) => {
    employee.assignee = user.replace(/['"]+/g, '');
    update(employee)
  }

  const cancelAssignment = (employee) => {
    employee.assignee = ""
    update(employee)
  }

  const completeTrain = (employee) => {
    employee.trained = true
    update(employee)
  }

  const startTrain = (employee) => {
    employee.trained = false
    update(employee)
  }

  const completeAccounts = (employee) => {
    employee.access = true
    update(employee)
  }

  const noAccounts = (employee) => {
    employee.access = false
    update(employee)
  }

  const equipmentProvided = (employee) => {
    employee.equipment = true
    update(employee)
  }

  const awaitingEquipment = (employee) => {
    employee.equipment = false
    update(employee)
  }

  const completeOnboard = (employee) => {
    employee.onboarding = false
    update(employee)
  }

  const startOnboard = (employee) => {
    employee.onbarding = true
    update(employee)
  }

  const returnAssignee = () => {
    return <>
    {employee.onboarding === true ? <button onClick={(event) => completeOnboard(employee)}>Complete Onboard</button> : <button onClick={(event) => startOnboard(employee)}>Onboard</button> }
    {employee.access === true ? <button onClick={(event) => noAccounts(employee)}>Terminate Accounts</button> : <button onClick={(event) => completeAccounts(employee)}>Create Accounts</button> }
    {employee.equipment === true ? <button onClick={(event) => awaitingEquipment(employee)}>Remove Equipment</button> : <button onClick={(event) => equipmentProvided(employee)}>Provide Equipment</button> }
    {employee.trained === true ? <button onClick={(event) => completeTrain(employee)}>Start Training</button> : <button onClick={(event) => startTrain(employee)}>End Training</button> }
    </>
  }


  return (
    <div style={div}>
      <h1>{employee.name}</h1>
      <div>Assigned Lead: {employee.assignee === "" ? "Unassigned" : employee.assignee}</div>
      <img className="showImage" src={employee.img} alt={employee.name} /><br />
      <div className="employeeDetail">
      Job Title<h2>{employee.title}</h2>
      Team<h2>{employee.team}</h2>
      Office<h2>{employee.office}</h2>
      Hire Date<h2>{employee.hire_date}</h2>
      Departure Status <h2>{employee.departing ? "Departing" : "Not Departing"}</h2>
      {employee.departing ? <> Departure Date<h2>{employee.term_date}</h2></>: ""}
      Onboarding Status <h2>{employee.onboarding ? "Onboarding" : "Onboarded"}</h2>
      Location<h2>{employee.remote ? "Remote" : "On-Site"}</h2>
      Accounts<h2>{employee.access ? "Active" : "Inactive"}</h2>
      Training<h2>{employee.trained ? "Completed" : "Incomplete"}</h2>
      Equipment<h2>{employee.equipment ? "Firm" : "Personal"}</h2>
      </div>
      <button onClick={(event) => edit(employee)}>Edit</button>
      <button onClick={(event) => deleteEmployee(employee)}>Delete</button>
      {employee.assignee === "" ? <button onClick={(event) => addAssignee(employee)}>Assign</button> : <button onClick={(event) => cancelAssignment(employee)}>Remove Assignment</button> }
      {employee.assignee === user.replace(/['"]+/g, '') || employee.manager === user.replace(/['"]+/g, '') ? returnAssignee() : "No Access to Change" }
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
};

export default SingleEmployee;