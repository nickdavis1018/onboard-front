import React from "react"
import { Link } from "react-router-dom";
import "../App.css";

function Header({ user, logout }){

const logInCheck = () => {
return <div className="header2">
<Link className="whiteLink" to="/">All Employees</Link>
<Link className="whiteLink" to="/myteam">My Team</Link>
<Link className="whiteLink" to="/myassignments">My Assignments</Link>
<Link className="whiteLink" to="/signin"><div onClick={(event) => logout()}>Logout</div></Link>
</div>
}

const loggedOut = () => {
return <div className="header2">
<Link className="whiteLink" to="/signin">Login</Link>   
<Link className="whiteLink" to="/signup">Register</Link></div> 
}

return <><div className="header"><h1 className="titlePage">On/board</h1>  
{user.token ? logInCheck() : loggedOut()}
</div>
</> 
}

export default Header