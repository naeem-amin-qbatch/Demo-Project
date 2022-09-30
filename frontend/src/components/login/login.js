import React, { useState, useEffect } from "react"
import './login.css'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import loginOptions from "./login-validations";

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleRegistration = async (data) => {
        console.log('data', data);
        // let result = await  axios.post("http://localhost:3000/users/login", data);
        // console.log(result)
        // if (result){
        //     navigate('/home')
        // } else {
        // console.log("error")
        // }
       
        axios.post("http://localhost:3000/users/login", data)
            .then(res => navigate('/home'))
            .catch(e => alert('Invalid Email or Pasword'))
    }
    return (
        <div className='center d-flex justify-content-center align-items-center'>
        <div className="login">
            <form onSubmit={handleSubmit(handleRegistration)}>
                
                <div>
                    <h2 className="text-center fw-bold">Login</h2>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input type="email"
                        name="email" {...register('email', loginOptions.email)}
                        className="form-control"
                        id="inputEmail"
                        placeholder="Enter an email" />
                    <small className="text-danger">
                        {errors?.email && errors.email.message}
                    </small>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                        name="password" {...register('password', loginOptions.password)}
                        className="form-control"
                        id="inputPassword"
                        placeholder="Enter Password" />
                    <small className="text-danger">
                        {errors?.password && errors.password.message}
                    </small>
                </div>

                <div className="d-grid gap-2">
                    <button className="btn btn-primary">Login</button>
                </div>

                <a href="/signup" className="link-primary d-flex justify-content-end mt-2"><small>Create Account</small></a>
            </form>
        </div>
        </div>
    )

};
export default Login