import AllEmployees from "./pages/AllEmployees";
import SingleEmployee from "./pages/SingleEmployee";
import Form from "./pages/Form";
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
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

  const url = "http://localhost:3000/employees/";

  const [employees, setEmployees] = useState([]);

  const [user, setUser] = useState({token: null, username: null})

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"))
    const username = JSON.parse(window.localStorage.getItem("username"))
    console.log(token)
    if (token){
      setUser({token: token, username: username})
    }
  }, [])
  
  const nullEmployee = {
    subject: "",
    details: "",
  }
  
  const [targetEmployee, setTargetEmployee] = useState(nullEmployee)

  const getEmployees = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setEmployees(data)
  }


  const addEmployees = async (newEmployee) => {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
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
      <h1 style={h1}>My Employee List</h1>
      <Link to="/new"><button style={button}>Create New Employee</button></Link>
      <Switch>
            <Route exact path="/"/>
            <Route path="/signin" render={(rp => <SignIn {...rp} />)} />
            <Route path="/signup" render={(rp => <SignUp {...rp} />)} />
          </Switch>
      <Switch>
          {/* INDEX PAGE */}
          <Route
            exact
            path="/"
            render={(rp) => {
              return <AllEmployees {...rp} employees={employees} />;
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
              deleteEmployee={deleteEmployee}
              user={user}
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
              buttonLabel="Add to my list"
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
              buttonLabel="Edit"
            />;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;