import React, { useState, useEffect } from "react"
import './login.css'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import loginOptions from "./login-validations";
import { userLogin } from "../../redux/slices/user";
import { useDispatch } from "react-redux";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = async (data) => {
        console.log('login data: ', data)
        try {
            const response = dispatch(userLogin(data));
            console.log('login dispatch response.data: ', response.data)
            navigate('/home');

        } catch (err) {
            console.log('Error occured in login dispatch: ', err)
            alert('Invalid Email or Password')
        }


    }
    return (
        <div className='center d-flex justify-content-center align-items-center'>
            <div className="login">
                <form onSubmit={handleSubmit(handleLogin)}>

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