import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

    const [creadentails, setcreadentails] = useState({ name: "", email: "", password: "", cpassword: "" })

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        // const { name, email, password, cpassword } = creadentails
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: creadentails.name, email: creadentails.email, password: creadentails.password, cpassword: creadentails.cpassword })
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save token of user 
            localStorage.setItem('auth-token', json.authtoken)
            navigate('/login');
            props.showAlert("SuccessFully Created Account", "success")
        } else {
            props.showAlert("Invalid Creadentails", "danger")
        }
    }
    const onChange = (e) => {
        setcreadentails({ ...creadentails, [e.target.name]: e.target.value })
    }
    return (
        <div className='container mt-2'>

            <h2>Create a account to Use  Notebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} name="name" ria-describedby="emailHelp" placeholder="Enter Name" />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} required minLength={5} name="password" placeholder="Password" />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="cpassword">Confrim Password</label>
                    <input type="password" className="form-control" id="cpassword" onChange={onChange} required minLength={5} name="cpassword" placeholder="Confirm Password" />
                </div>
                <button disabled={creadentails.name.length < 5 || creadentails.email.length < 5 || creadentails.password.length < 5 || creadentails.cpassword.length < 5 || creadentails.password !== creadentails.cpassword} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
