import React from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    let location = useLocation();

    let navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        navigate('/login')
    }
    return (

        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">ListNotes</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item ">
                            <Link className={`nav-link ${location.pathname === "/" ? " active " : ""}   `} to="/"> Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? " active " : ""} `} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('auth-token') ?
                        <form className="form-inline my-2 my-lg-0">
                            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>

                            <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign up</Link>
                        </form> : <button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
                </div>
            </nav>
        </div>
    )
}

export default Navbar
