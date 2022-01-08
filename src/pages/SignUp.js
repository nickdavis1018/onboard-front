import React from "react"
import { Link } from "react-router-dom"

const SignUp = (props) => {
    const button = {
        backgroundColor: "navy",
        display: "block",
      }

    const blank = {
        username: "",
        password: "",
        team: "",
        role: ""
    }

    const [form, setForm] = React.useState(blank)

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const { username, password, team, role} = form
        form.username = username.replace(/['"]+/g, '')
        form.team = team.replace(/['"]+/g, '')
        form.role = role.replace(/['"]+/g, '')
        fetch(`http://localhost:3000/register`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password, team, role})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setForm(blank)
                props.history.push("/signin")
            })

    }
    return (
        <div className={"loginDiv"}>
            <h1 className="loginWelcome">Welcome to Onboard!</h1>
            <p>Sign up for free today.</p>
            <div className="authBox">
                <form className="loginBox" onSubmit={handleSubmit}>
                    <input id="inputSignup" placeholder="enter username" type="text" name="username" value={form.username} onChange={handleChange} />
                    <input id="inputSignup" placeholder="enter password" type="password" name="password" value={form.password} onChange={handleChange} />
                    <select name="team" placeholder="Team" onChange={handleChange} value={form.team} required>
        <option value="">Select Team</option>
        <option value="Administration">Administration</option>
        <option value="Design">Design</option>
        <option value="Development">Development</option>
        <option value="Operations">Operations</option>
        <option value="Technology">Technology</option>
        <option value="Training">Training</option>
        <option value="Sales">Sales</option>
      </select>
                    <select name="role" placeholder="Role" onChange={handleChange} value={form.role} required>
        <option value="">Select Role</option>
        <option value="manager">Manager</option>
        <option value="lead">Lead</option>
      </select>
                    <div className="inputButton">
                        <input style={button} className="loginButton" type="submit" value="Sign Up" /></div>
                </form>
            </div>
            <p>Already have an account? <Link to="/signin" className={"loginredirect"}>Login</Link></p>
        </div>
    )
}
export default SignUp