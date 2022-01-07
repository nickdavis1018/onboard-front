import React, { useState } from "react";
import Employee from "../components/employee"

const AllEmployees = (props) => {
  const [search, setSearch] = useState("")
  const loaded = () => {
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

return (
  <section>
    <div className="main">
      <input className="searchBar" placeholder="Browse..." onChange={event => setSearch(event.target.value)} />
    </div>
    <div className="content">
      {props.user ? loaded() : "whoopsie"}
    </div>
  </section>
);
}

export default AllEmployees;