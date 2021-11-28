import React from 'react'
import { BrowserRouter as Redirect, Router, Link } from "react-router-dom";
const Navigation = () => {
    function LogOut(){
        sessionStorage.setItem("logged", "false");

    }
    return (
        <div className="navigation">
            <ul>
                <li><Link to="/"><button className="button">Home</button></Link></li>
                <li><Link to="/info"><button className="button">Chat</button></Link></li>
                <li><Link to="/login"><button className="button" onClick={LogOut}>Log Out</button></Link></li>
            </ul>
        </div>
    )
}


export default Navigation
