import React from "react";
import Employee from "../components/employee"

const AllEmployees = (props) => {
  // For each post in the array render a Post component
  return props.employees.map((employee) => <Employee employee={employee} key={employee.id} />);
};

export default AllEmployees;