import React, { useState } from "react"
import './login.css'

import axios from "axios"
import { useHistory } from "react-router-dom"

const Login = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        })
    }
    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/users/login", user).then(res =>history.push('/')).catch(e => alert('invalid details'))
    }

    return (
        <div className="register">
            {console.log(user)}
            <form className="">
                <div className="bg-primary rounded">
                    <h2 className="text-center text-white pt-1 pb-1">Login</h2>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" name="email" value={user.email} className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" name="password" value={user.password} className="form-control" id="inputPassword" placeholder="Password" onChange={handleChange} />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-outline-primary ps-4 pe-4" onClick={(e) => login(e)}>Login</button>
                </div>
                <a href="/signup" className="link-primary d-flex justify-content-end"><small>Create Account</small></a>
            </form>
        </div>
    )
}

export default Login