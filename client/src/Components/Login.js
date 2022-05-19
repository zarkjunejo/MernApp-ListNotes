import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
const Login = (props) => {


    const [creadentails, setcreadentails] = useState({ email: "", password: "" })

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: creadentails.email, password: creadentails.password })
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save token of user 
            localStorage.setItem('auth-token', json.authtoken)
            navigate('/')

            props.showAlert("Logged In", "success")
        } else {


            props.showAlert("Invalid Creadentails", "danger")
        }
    }
    const onChange = (e) => {
        setcreadentails({ ...creadentails, [e.target.name]: e.target.value })
    }
    return (
        <div className='mt-3'>
            <h2>Welcome to ListNotes</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" name="email" onChange={onChange} value={creadentails.email} id="email" aria-describedby="emailHelp" placeholder="Enter email" />

                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" onChange={onChange} value={creadentails.passwaord} id="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
