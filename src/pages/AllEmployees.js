import React, { useState } from "react";
import Employee from "../components/employee"
import { Link } from "react-router-dom";

const AllEmployees = (props) => {
  const button = {
    backgroundColor: "navy",
    display: "block"
  }
  const admin = {
    marginTop: "4px",
  }
  const button2 = {
    backgroundColor: "navy",
    display: "block",
    margin: "auto",
    marginTop: "10px",
    width: "150px",
  }

  const [search, setSearch] = useState("")

  const [toggle, setToggle] = useState({set: "all"})

  const showOnboards = () => {
    setToggle({ ...toggle, set: "onboards"});
  };

const showOffboards = () => {
    setToggle({ ...toggle, set: "offboards"});
}

const showStandard = () => {
  setToggle({ ...toggle, set: "standard"});
}

const showAll = () => {
  setToggle({ ...toggle, set: "all"});
}

const loggedInUser = props.user

const loadedAll = () => {
return props.employees.filter(foundEmployee => {
  if (search === "") {
    return foundEmployee;
  } else if (foundEmployee.name.toLowerCase().includes(search.toLowerCase()) || foundEmployee.team.toLowerCase().includes(search.toLowerCase())) {
    return foundEmployee
  }
}).sort((a, b) => {
  let aTemp = a.name.toLowerCase()
  let bTemp = b.name.toLowerCase()
if (aTemp < bTemp){
  return -1;
}
if (aTemp > bTemp){
  return 1;
}
return 0;
}
).map((employee) => <Employee employee={employee} key={employee.id} />)}

const loadedOn = () => {
  return props.employees.filter(foundEmployee => {
    if (search === "") {
      return foundEmployee;
    } else if (foundEmployee.name.toLowerCase().includes(search.toLowerCase()) || foundEmployee.team.toLowerCase().includes(search.toLowerCase())) {
      return foundEmployee
    }
  }).filter(foundEmployee => {
    if (foundEmployee.onboarding === true) {
      return foundEmployee}
      else{
        return
      }}).sort((a, b) => {
    let aTemp = a.name.toLowerCase()
    let bTemp = b.name.toLowerCase()
  if (aTemp < bTemp){
    return -1;
  }
  if (aTemp > bTemp){
    return 1;
  }
  return 0;
  }
).map((employee) => <Employee employee={employee} key={employee.id} />)}

const loadedStandard = () => {
  return props.employees.filter(foundEmployee => {
    if (search === "") {
      return foundEmployee;
    } else if (foundEmployee.name.toLowerCase().includes(search.toLowerCase()) || foundEmployee.team.toLowerCase().includes(search.toLowerCase())) {
      return foundEmployee
    }
  }).filter(foundEmployee => {
    if (foundEmployee.onboarding === false && foundEmployee.departing === false) {
      return foundEmployee}
      else{
        return
      }}).sort((a, b) => {
    let aTemp = a.name.toLowerCase()
    let bTemp = b.name.toLowerCase()
  if (aTemp < bTemp){
    return -1;
  }
  if (aTemp > bTemp){
    return 1;
  }
  return 0;
  }
).map((employee) => <Employee employee={employee} key={employee.id} />)}


const loadedOff = () => {
return props.employees.filter(foundEmployee => {
  if (search === "") {
    return foundEmployee;
  } else if (foundEmployee.name.toLowerCase().includes(search.toLowerCase()) || foundEmployee.team.toLowerCase().includes(search.toLowerCase())) {
    return foundEmployee
  }
}).filter(foundEmployee => {
  if (foundEmployee.departing === true) {
    return foundEmployee}
    else{
      return
    }}).sort((a, b) => {
  let aTemp = a.name.toLowerCase()
  let bTemp = b.name.toLowerCase()
if (aTemp < bTemp){
  return -1;
}
if (aTemp > bTemp){
  return 1;
}
return 0;
}
).map((employee) => <Employee employee={employee} key={employee.id} />)}

let myRole = props.user.role
let myTeam = props.user.team
let myName = props.user.username

return (
  <section>
    <div className="main">
    <input className="searchBar" placeholder="Browse..." onChange={event => setSearch(event.target.value)} />
    {myRole.replace(/['"]+/g, '') === "manager" ? <div className="managerEmpButton"><div><h4 style={admin}>Admin Actions</h4></div><div><Link to="/new"><button style={button}>Create Employee</button></Link></div></div>: ""}
      <div className="buttonBox">
      <button style={button2} onClick={(event) => showStandard()}>Onboarded</button>
      <button style={button2} onClick={(event) => showOnboards()}>Onboarding</button>
      <button style={button2} onClick={(event) => showOffboards()}>Departing</button>
      <button style={button2} onClick={(event) => showAll()}>All</button></div>
    </div>
    <div className="content">
      {toggle.set === "all" ? <><h2>All Employees</h2> {loadedAll()} </>: toggle.set === "onboards" ? <><h2>Onboarding Employees</h2> {loadedOn()} </> : toggle.set === "offboards" ? <><h2>Offboarding Employees</h2> {loadedOff()} </> : toggle.set === "standard" ? <><h2>Onboarded Employees</h2> {loadedStandard()} </> : "Error"}
    </div>
  </section>
);
}

export default AllEmployees;
