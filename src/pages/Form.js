// Import useState hook
import React, { useState } from "react";
const Form = ({ initialEmployee, handleSubmit, buttonLabel, history, employees, user }) => {
  const button = {
    backgroundColor: "navy",
    textAlign: "center",
    border: "black",
    marginTop: "5px",
    marginRight: "10px",
    marginBottom: "10px",
  }
  const [formData, setFormData] = useState(initialEmployee);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  function removeDuplicates(value, index, self){
    return self.indexOf(value) === index
  }
  
  let assigneeList = []
  
  for(let i=0; i < employees.length; i++){
    if(employees[i].assignee !== null){
    assigneeList.push(employees[i].assignee)}}

  let assigneeList2 = assigneeList.filter(removeDuplicates)

  const handleSubmisson = (event) => {
    event.preventDefault();
    formData.img = formData.img + ".png"
    handleSubmit(formData);
    history.push("/");
  };

  let pivot
  let assignPivot
  let departPivot

  if(formData.departing === "true"){
    pivot = false
  }
  else{
    formData.term_date = ""
    pivot = true
  }

  if(formData.onboarding === "false"){
    departPivot = false
  }
  else{
    formData.departing = "false"
    departPivot = true
  }

  if(buttonLabel === "Create New Employee"){
    assignPivot = true
  }
  else{
    assignPivot = false}

  return (
    <form onSubmit={handleSubmisson}>
          Full Name<input
        type="text"
        onChange={handleChange}
        value={formData.name}
        name="name"
        placeholder="full name"
        required
      />
      <div hidden={assignPivot}>Assign Active Lead</div><select hidden={assignPivot} name="assignee" placeholder="assignee" onChange={handleChange} value={formData.assignee}>
{assigneeList2.map((assignee) => <option value={assignee} >{assignee}</option>)}
      </select>
        Hire Date <input
        type="date"
        onChange={handleChange}
        value={formData.hire_date}
        name="hire_date"
        placeholder="hire date"
        required
      />
    Team<select name="team" placeholder="team" onChange={handleChange} value={formData.team} required>
        <option value="">Select Team</option>
        <option value="Administration">Administration</option>
        <option value="Design">Design</option>
        <option value="Development">Development</option>
        <option value="Operations">Operations</option>
        <option value="Technology">Technology</option>
        <option value="Training">Training</option>
        <option value="Sales">Sales</option>
      </select>
      Title<input
        type="text"
        onChange={handleChange}
        value={formData.title}
        name="title"
        placeholder="job title"
        required
      />
      Office<input
        type="text"
        onChange={handleChange}
        value={formData.office}
        name="office"
        placeholder="assigned office"
        required
      />
      Profile Photo<input
        type="text"
        onChange={handleChange}
        value={formData.img}
        name="img"
        placeholder="image link"
      />
Status<select name="onboarding" value={formData.onboarding} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Onboarding</option>
        <option value="false">Standard</option>
      </select>
Has this employee completed training? <select name="trained" value={formData.trained} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
Does this employee have access to client environments? <select name="access" value={formData.access} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
Does this employee have firm-provided equipment? <select name="equipment" value={formData.equipment} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
Is this a remote employee? 
<select name="remote" value={formData.remote} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    <div hidden={departPivot}>Is this employee set to depart? <select name="departing" value={formData.departing} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      <div hidden={pivot}>Termination Date</div><input
        type="date"
        onChange={handleChange}
        value={formData.term_date}
        name="term_date"
        placeholder="departure date"
        hidden={pivot}
      /></div>
    Notes<textarea
        type="text"
        onChange={handleChange}
        value={formData.notes}
        name="notes"
        placeholder="notes"
      />
      <input type="submit" style={button} value={buttonLabel} /><br/>
    </form>
  );
};

export default Form;