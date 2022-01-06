import React from "react"
import { Link } from "react-router-dom"

const SignUp = (props) => {

    const blank = {
        username: "",
        password: "",
    }

    const [form, setForm] = React.useState(blank)

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const { username, password} = form
        fetch(`http://localhost:3000/register`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password})
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
                    <input id="inputSignup" placeholder="Username" type="text" name="username" value={form.username} onChange={handleChange} />
                    <input id="inputSignup" placeholder="Password" type="password" name="password" value={form.password} onChange={handleChange} />
                    <div className="inputButton">
                        <input className="loginButton" type="submit" value="Sign Up" /></div>
                </form>
            </div>
            <p>Already have an account? <Link to="/signin" className={"loginredirect"}>Login</Link></p>
        </div>
    )
}
export default SignUp