import React, { useState } from "react"
import './sign-up.css'
import axios from 'axios'


const Register = () => {
const [user, setUser] = useState({
    name:'',
    email:'',
    phone:'',
    password:'',
})

    const handleChange = (e) => {
     const { name,value } = e.target;
     setUser({
       ...user,
       [name]: value,
     })
    }

    const register = (e) => {
        console.log('register btn clivked', e)
        e.preventDefault();
        const { name, email, phone, password } = user;
        if( name && email && phone && password ){
            axios.post('http://localhost:3000/users/adduser',user).then(res => console.log(res) )
        }else{
         console.log('Invalid')
        }
    }
    return (
        <div className="register">
            <form className="">
                <div className="bg-primary rounded">
                <h2 className="text-center text-white pt-1 pb-1">Register</h2>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1">Name</label>
                    <input type="name" name="name" value={user.name} className="form-control" id="inputName" aria-describedby="emailHelp" placeholder="Please Enter Your Name" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" name="email" value={user.email} className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Please Enter Your Email" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1">Phone no</label>
                    <input type="phone" name="phone" value={user.phone} className="form-control" id="inputPhoneNo" aria-describedby="emailHelp" placeholder="Please Enter Your Phone" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" name="password" value={user.password} className="form-control" id="inputPassword" placeholder="Please Enter Your Password" onChange={handleChange}/>
                </div>
                <div className="text-center">
                    <button className="btn btn-outline-primary ps-4 pe-4" onClick={(e) => register(e)}>Register</button>
                </div>
                <a href="/login" className="link-primary d-flex justify-content-end" ><small>Already have account</small></a>

            </form>
        </div>
    )
}

export default Register