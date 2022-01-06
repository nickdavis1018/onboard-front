import React from "react"
import { Link } from "react-router-dom";

function Header({ user, logout }){

const logInCheck = () => {
return <>
<Link to="/">All Employees</Link>
<Link to="/myteam">My Team</Link>
<Link to="/myassignments">My Assignments</Link>
<Link to="/signin"><div onClick={(event) => logout()}>Logout</div></Link>
</>
}

const loggedOut = () => {
return <>
<Link to="/signin">Login</Link>   
<Link to="/signup">Register</Link></> 
}

return <><h1>On/|\board</h1>  
{user.token ? logInCheck() : loggedOut()} 
</> 
}

export default Header