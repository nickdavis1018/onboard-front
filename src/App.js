import AllEmployees from "./pages/AllEmployees";
import SingleEmployee from "./pages/SingleEmployee";
import Form from "./pages/Form";
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";

function App(props) {

  const h1 = {
    textAlign: "center",
    margin: "10px",
  };

  const button = {
    backgroundColor: "navy",
    display: "block",
    margin: "auto"
  }

  const logout = ()=>{
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("username")
    setUser({token: null, username: null})
  }

  const url = "http://localhost:3000/employees/";

  const [employees, setEmployees] = useState([]);

  const [user, setUser] = useState({token: null, username: null})

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    const username = window.localStorage.getItem("username")
    if (token){
      setUser({token: token, username: username})
    }
    else{
      props.history.push("/signin")
    }
  }, [])

  const nullEmployee = {
    name: "",
    title: "",
    office: "",
    team: "",
    departing: "",
    onboarding: "",
    trained: "",
    access: "",
    equipment: "",
    remote: "",
    notes: "",
    hire_date: "",
    term_date: "",
    img: "",
    manager: ""
  }
  
  const [targetEmployee, setTargetEmployee] = useState(nullEmployee)

  const getEmployees = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setEmployees(data)
  }

  const addEmployees = async (newEmployee) => {
    newEmployee.manager = user.username
    newEmployee.hire_date = new Date(newEmployee.hire_date)
    if(newEmployee.term_date == null){
      newEmployee.term_date = ""
    }
    else{
      newEmployee.term_date = new Date(newEmployee.term_date)
    }
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(newEmployee),
    })
    getEmployees();
  }

  const getTargetEmployee = (employee) => {
    setTargetEmployee(employee);
    props.history.push("/edit");
  }

  const updateEmployee = async (employee) => {
    employee.hire_date = new Date(employee.hire_date)
    employee.term_date = new Date(employee.term_date)
    const response = await fetch(url + employee.id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(employee),
    });

    getEmployees();
  }

  const deleteEmployee = async (employee) => {
    const response = await fetch(url + employee.id + "/", {
      method: "delete",
      headers: 
      { 'Authorization': `Bearer ${user.token}` }
    });
    getEmployees();
    props.history.push("/");
  };

  useEffect(() => {
    getEmployees()
  }, [])

  return (
    <div className="App">
<Header user={user} logout={logout}/>
<main>
      <Switch>
      <Route exact path="/"/>
      </Switch>
  </main>
<h1 style={h1}>My Employee List</h1>
      <Link to="/new"><button style={button}>Create New Employee</button></Link>
      <Switch>
          {/* INDEX PAGE */}
          <Route
            exact
            path="/"
            render={(rp) => {
              return <AllEmployees {...rp} employees={employees} user={user.username}/>;
            }}
          />
        <Route path="/signup" render={(rp => <SignUp {...rp} />)} />
      <Route path="/signin" render={(rp => <SignIn {...rp} />)} />
          {/* SHOW PAGE */}
          <Route
            path="/employee/:id"
            render={(rp) => {
              return <SingleEmployee 
              {...rp} 
              employees={employees} 
              edit={getTargetEmployee}
              update={updateEmployee}
              deleteEmployee={deleteEmployee}
              logout={logout}
              user={user.username}
            />;
            }}
          />
          {/* NEW AND EDIT FORM PAGES */}
          <Route
            path="/new"
            render={(rp) => {
              return <Form {...rp} 
              initialEmployee={nullEmployee}
              handleSubmit={addEmployees}
              buttonLabel="Create New Employee"
              user={user.username}
            />;
            }}
          />
          <Route
            path="/edit"
            render={(rp) => {
              return <Form 
              {...rp} 
              initialEmployee={targetEmployee}
              handleSubmit={updateEmployee}
              buttonLabel="Save Edits"
              user={user.username}
            />;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;