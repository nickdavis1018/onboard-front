// Import useState hook
import React, { useState } from "react";
const Form = ({ initialEmployee, handleSubmit, buttonLabel, history, user }) => {
  const [formData, setFormData] = useState(initialEmployee);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmisson = (event) => {
    event.preventDefault();
    console.log(formData)
    handleSubmit(formData);
    history.push("/");
  };

  let pivot

  if(formData.departing === "true"){
    pivot = false
  }
  else{
    pivot = true
  }

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
      Job Title<input
        type="text"
        onChange={handleChange}
        value={formData.title}
        name="title"
        placeholder="job title"
        required
      />
      Team<input
        type="text"
        onChange={handleChange}
        value={formData.team}
        name="team"
        placeholder="team"
        required
      />
      Location / Office<input
        type="text"
        onChange={handleChange}
        value={formData.office}
        name="office"
        placeholder="assigned office"
        required
      />
Is this employee set to depart? <select name="departing" value={formData.departing} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
Is this employee currently onboarding? <select name="onboarding" value={formData.onboarding} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
Has this employee completed training? <select name="trained" value={formData.trained} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
Does employee have access to client environments? <select name="access" value={formData.access} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
Does this employee have firm-provided equipment? <select name="equipment" value={formData.equipment} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
Is this a remote employee, or are they based in a company office? 
<select name="remote" value={formData.remote} onChange={handleChange} required>
        <option value="">Choose</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      Hire Date <input
        type="date"
        onChange={handleChange}
        value={formData.hire_date}
        name="hire_date"
        placeholder="hire date"
        required
      />
      <div hidden={pivot}>Termination Date</div><input
        type="date"
        onChange={handleChange}
        value={formData.term_date}
        name="term_date"
        placeholder="departure date"
        hidden={pivot}
      />
    Image Link<input
        type="text"
        onChange={handleChange}
        value={formData.img}
        name="img"
        placeholder="image link"
      />
    Notes<textarea
        type="text"
        onChange={handleChange}
        value={formData.notes}
        name="notes"
        placeholder="notes"
      />
      <input type="submit" value={buttonLabel} />


    </form>
  );
};

export default Form;