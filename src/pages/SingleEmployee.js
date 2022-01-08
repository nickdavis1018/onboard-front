import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal"


const SingleEmployee = ({ employees, match, edit, deleteEmployee, update, user, team, role}) => {
  const id = parseInt(match.params.id);
  const employee = employees.find((employee) => employee.id === id);
  const [visible, setVisible] = useState(false)


  const toggleVisibility = () => setVisible((s) => !s);

  const button = {
    backgroundColor: "navy",
    display: "block",
    margin: "auto",
    border: "black",
    marginTop: "5px",
    marginRight: "10px",
    marginBottom: "10px",
    width: "200px",
  }

  const buttonRed = {
    backgroundColor: "maroon",
    display: "block",
    margin: "auto",
    border: "black",
    marginTop: "5px",
    marginRight: "10px",
    marginBottom: "10px",
    width: "200px",
  }

  const buttonGreen = {
    backgroundColor: "darkgreen",
    display: "block",
    margin: "auto",
    border: "black",
    marginTop: "5px",
    marginRight: "10px",
    marginBottom: "10px",
    width: "200px",
  }

  const employeeName = {
    backgroundColor: "hsl(206, 84%, 20%)",
    color: "white",
  }

  const label = {
    backgroundColor: "hsl(206, 84%, 20%)",
    color: "white",
  }

  const button2 = {
    backgroundColor: "navy",
    display: "block",
    margin: "auto",
    marginTop: "10px",
    border: "black",  
  }
  const admin = {
    marginTop: "4px",
  }
  const div = {
    textAlign: "center",
    border: "3px solid navy",
    width: "80%",
    margin: "30px auto",
  };

  const div2 = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const div3 = {
    border: "1px solid black",
  };

  const showImage = {
    height: "250px",
    width: "150px",
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

  const beginDepart = (employee) => {
    employee.onboarding = false
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    employee.term_date = tomorrow
    employee.departing = true
    update(employee)
  }

  const notDeparting = (employee) => {
    employee.departing = false
    employee.term_date = ""
    update(employee)
  }

  const endOnboard = (employee) => {
    employee.onboarding = false
    employee.equipment = true
    employee.access = true
    employee.trained = true
    update(employee)
  }

  const beginOnboard = (employee) => {
    employee.onboarding = true
    employee.departing = false
    employee.term_date = ""
    employee.equipment = false
    employee.access = false
    employee.trained = false
    update(employee)
  }

  function reverseDate(str) {
    return new Date(str).toDateString().toString().slice(4)
    
}

  return (
    <> <Modal visible={visible}><h1>WARNING!</h1><p style ={label}>Terminating an employee cannot be undone. Ensure that this employee's access has been revoked and equipment has been returned before proceeding.</p>
    <div><button style={buttonRed} onClick={(event) => deleteEmployee(employee)}>Terminate</button><button style={button} onClick={toggleVisibility}>Cancel</button></div></Modal>  
    <div>{role.replace(/['"]+/g, '') === "manager" ? <div className="manager"><h4>Admin Actions</h4><div className="manager2"><Link className="managerButton" to="/new"><button style={button}>Create Employee</button></Link></div></div>: ""}
         {role.replace(/['"]+/g, '') === "manager" ? <div className="manager"><h4>Manager Actions</h4><div className="manager2"><button style={button} onClick={(event) => edit(employee)}>Modify Existing</button><button style={buttonRed} onClick={toggleVisibility}>Terminate Existing</button></div></div> : ""}
         {role.replace(/['"]+/g, '') === "manager" || employee.assignee === user.replace(/['"]+/g, '') ? <div className="manager"><h4>Lead Actions</h4><div className="manager2">{employee.onboarding === true ? <button style={buttonGreen} onClick={(event) => endOnboard(employee)}>Complete Onboard</button> : <button style={button} onClick={(event) => beginOnboard(employee)}>Start Onboard</button>}{employee.departing === true ? <button style={button} onClick={(event) => notDeparting(employee)}>Cancel Departure</button> : <button style={buttonRed} onClick={(event) => beginDepart(employee)}>Initiate Departure</button> }</div></div> : ""}
         <div className="manager"><h4>Standard Actions</h4><div className="manager2"><Link className="linkButton" to="/">
        <button style={button}>Back to Index</button>
      </Link>{employee.assignee === "" ? <button style={button} onClick={(event) => addAssignee(employee)}>Claim Assignment</button> : <button style={buttonRed} onClick={(event) => cancelAssignment(employee)}>Remove Assignment</button>}</div></div>
    <div style={div}>
      <h1 style={employeeName}>{employee.name}</h1>
      <div>Assigned To:<h2>{employee.assignee === "" ? "Unassigned" : employee.assignee}</h2>Status<h2>{employee.departing ? "Departing" : employee.onboarding ? "Onboarding" : "Onboarded"}</h2></div>
      {employee.departing ? <> Departure Date<h2>{reverseDate(employee.term_date)}</h2></>: ""}
      <img style={showImage} src={employee.img} alt={employee.name} /><br />
      <div className="employeeDetail">
      <div style={div3}><p style={label}>Accounts</p>
      <div className="divInfo"><h2>{employee.access ? "Accounts Active" : "Accounts Disabled"}</h2>
      <div className="divInfo2">{employee.access === true ? <button style={button} onClick={(event) => noAccounts(employee)}>Disable Accounts</button> : <button style={button} onClick={(event) => completeAccounts(employee)}>Activate Accounts</button> }</div></div></div>
      <div style={div3}>
        <p style={label}>Equipment</p> 
      <div className="divInfo">
      <h2>{employee.equipment ? "Equipment Issued" : "Equipment Not Issued"}</h2>
      <div className="divInfo2">{employee.equipment === true ? <button style={button} onClick={(event) => awaitingEquipment(employee)}>Return Equipment</button> : <button style={button} onClick={(event) => equipmentProvided(employee)}>Provide Equipment</button> }</div></div></div>
      <div style={div3}>
        <p style={label}>Training</p>
      <div className="divInfo">
      <h2>{employee.trained ? "Training Complete" : "Training Incomplete"}</h2>
      <div className="divInfo2">{employee.trained === true ? <button style={button} onClick={(event) => startTrain(employee)}>Schedule Training</button> : <button style={button} onClick={(event) => completeTrain(employee)}>Complete Training</button> }</div></div></div>
      </div>
      <p style={label}>Hire Date</p><h2>{reverseDate(employee.hire_date)}</h2>
      <p style={label}>Title</p><h2>{employee.title}</h2><p style={label}>Team</p><h2>{employee.team}</h2>
      <p style={label}>Office</p><h2>{employee.office}</h2>
      <p style={label}>Location</p><h2>{employee.remote ? "Remote" : "On-Site"}</h2>
      <p style={label}>Manager Notes</p><h2>{employee.notes}</h2>
    </div></div></>
  );
};

export default SingleEmployee;