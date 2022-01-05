// Import useState hook
import React, { useState } from "react";
const Form = ({ initialEmployee, handleSubmit, buttonLabel, history }) => {

  const [formData, setFormData] = useState(initialEmployee);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmisson = (event) => {
    event.preventDefault();
    handleSubmit(formData);
    history.push("/");
  };

  return (
    <form onSubmit={handleSubmisson}>
      <input
        type="text"
        onChange={handleChange}
        value={formData.name}
        name="name"
        placeholder="full name"
      />
      <input
        type="text"
        onChange={handleChange}
        value={formData.title}
        name="title"
        placeholder="job title"
      />
            <input
        type="text"
        onChange={handleChange}
        value={formData.office}
        name="office"
        placeholder="assigned office"
      />
        Departing? <input
        type="checkbox"
        onChange={handleChange}
        value={formData.departing}
        name="departing"
      />
        Onboarding? <input
        type="checkbox"
        onChange={handleChange}
        value={formData.onboarding}
        name="onboarding"
      />
       Trained? <input
        type="checkbox"
        onChange={handleChange}
        value={formData.trained}
        name="trained"
      />
        Accounts? <input
        type="checkbox"
        onChange={handleChange}
        value={formData.accounts}
        name="accounts"
      />
        Equipment? <input
        type="checkbox"
        onChange={handleChange}
        value={formData.equipment}
        name="equipment"
      />
        Remote? <input
        type="checkbox"
        onChange={handleChange}
        value={formData.remote}
        name="remote"
      />
        <input
        type="date"
        onChange={handleChange}
        value={formData.hire_date}
        name="hire_date"
        placeholder="hire date"
      />
            <input
        type="date"
        onChange={handleChange}
        value={formData.term_date}
        name="term_date"
        placeholder="departure date"
      />
    <input
        type="text"
        onChange={handleChange}
        value={formData.img}
        name="img"
      />
      <input
        type="text"
        onChange={handleChange}
        value={formData.notes}
        name="notes"
      />
    <input
        type="text"
        onChange={handleChange}
        value={formData.user_id}
        name="user_id"
      />
      <input type="submit" value={buttonLabel} />
    </form>
  );
};

export default Form;