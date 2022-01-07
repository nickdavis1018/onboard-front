import React, { useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Employee from "../components/employee"

const MyTeam = (props) => {
    const button = {
        backgroundColor: "navy",
        display: "block",
        margin: "auto"
      }
  const [search, setSearch] = useState("")
  const loaded = () => {
  return props.employees.filter(foundEmployee => {
    if (search === "") {
      return foundEmployee;
    } else if (foundEmployee.name.toLowerCase().includes(search.toLowerCase()) || foundEmployee.team.toLowerCase().includes(search.toLowerCase())) {
      return foundEmployee
    }
  }).filter(foundEmployee => {
    if (`"${foundEmployee.team}"` === props.user.team) {
      return foundEmployee;
    }
    else {
      return
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

return (
  <section>
    <div className="main">
      <input className="searchBar" placeholder="Browse..." onChange={event => setSearch(event.target.value)} />
      <Link to="/new"><button style={button}>Create Employee</button></Link>
      <button style={button}>Show Onboards</button>
      <button style={button}>Show Offboards</button>
      <button style={button}>All</button>
    </div>
    <div className="content">
      {props.user ? loaded() : "whoopsie"}
    </div>
  </section>
);
}

export default MyTeam;