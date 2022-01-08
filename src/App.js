import AllEmployees from "./pages/AllEmployees";
import SingleEmployee from "./pages/SingleEmployee";
import MyAssignments from "./pages/MyAssignments";
import MyTeam from "./pages/MyTeam";
import Form from "./pages/Form";
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./App.css";

function App(props) {

  const logout = ()=>{
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("username")
    setUser({token: null, username: null})
  }

  const [user, setUser] = useState({token: null, username: null, team: null, role: null})

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    const username = window.localStorage.getItem("username")
    const team = window.localStorage.getItem("team")
    const role = window.localStorage.getItem("role")
    if (token){
      setUser({token: token.replace(/['"]+/g, ''), username: username.replace(/['"]+/g, ''), team: team.replace(/['"]+/g, ''), role: role.replace(/['"]+/g, '')})
    }
    else{
      props.history.push("/signin")
    }
  }, [])

  const url = "https://onboard-backend-dev.herokuapp.com/employees/";

  const [employees, setEmployees] = useState([]);

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
    assignee: "",
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
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
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
    const response = await fetch(url + employee.id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify(employee),
    });

    getEmployees();
  }

  const deleteEmployee = async (employee) => {
    const response = await fetch(url + employee.id + "/", {
      method: "delete",
      headers: 
      { "Authorization": `Bearer ${user.token}` }
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
      <Switch>
          {/* INDEX PAGE */}
          <Route
            exact
            path="/"
            render={(rp) => {
              return <AllEmployees {...rp} employees={employees} user={user}/>;
            }}
          />
        <Route path="/signup" render={(rp => <SignUp {...rp} />)} />
      <Route path="/signin" render={(rp => <SignIn {...rp} />)} />
      <Route
            path="/myassignments"
            render={(rp) => {
              return <MyAssignments
              {...rp} 
              employees={employees} 
              edit={getTargetEmployee}
              update={updateEmployee}
              deleteEmployee={deleteEmployee}
              logout={logout}
              user={user}
            />;
            }}
          />
          <Route
            path="/myteam"
            render={(rp) => {
              return <MyTeam
              {...rp} 
              employees={employees} 
              edit={getTargetEmployee}
              update={updateEmployee}
              deleteEmployee={deleteEmployee}
              logout={logout}
              user={user}
            />;
            }}
          />
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
              role={user.role}
              team={user.team}
            />;
            }}
          />
          {/* NEW AND EDIT FORM PAGES */}
          <Route
            path="/new"
            render={(rp) => {
              return <Form {...rp} 
              employees={employees} 
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
              employees={employees} 
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