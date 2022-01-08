import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = (props) => {

    const button = {
        backgroundColor: "navy",
        display: "block",
      }
    const blank = {
        username: "",
        password: "",
    }
    const [form, setForm] = React.useState(blank)

    const [error, setError] = useState(undefined)

  const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const { username, password } = form
        fetch(`https://onboard-backend-dev.herokuapp.com/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
            .then( async (response) => {
                const result = await response.json()
                return result
            })
            .then(data => {
                console.log(data)
                window.localStorage.setItem("token", JSON.stringify(data.token))
                window.localStorage.setItem("username", JSON.stringify(data.user.username))
                window.localStorage.setItem("team", JSON.stringify(data.user.team))
                window.localStorage.setItem("role", JSON.stringify(data.user.role))
                setForm(blank)
                props.history.push("/")
                window.location.href = "/"
            })
    }

return (
    <div className={"loginDiv"}>
        <h1 className="loginWelcome">Welcome to On/board!</h1>
        <p>Login with your account below.</p>
        <div className="authBox">
            <form className="loginBox" onSubmit={handleSubmit}>
                <input id="inputSignup" placeholder="Username" type="text" name="username" value={form.username} onChange={handleChange} />
                <input id="inputSignup" placeholder="Password" type="password" name="password" value={form.password} onChange={handleChange} />
                <div className="inputButton">
                    <input style={button} className="loginButton" type="submit" value="Login" /></div>
            </form>                     
        </div>
        <p>Don't have an account? <Link to="/signup" className={"loginredirect"} >Sign Up</Link></p>
    </div>
)
}
export default SignIn
