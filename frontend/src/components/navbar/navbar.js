import React from "react"
import {FaCartPlus} from "react-icons/fa"
import { Link } from "react-router-dom"
import {Outlet} from "react-router-dom"

const NavBar = () => {

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand text-white fw-bold" href="#">Ecommerce</a>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse  justify-content-end me-4" id="navbarNav">
            <ul className="navbar-nav ">
              <li className="nav-item me-2" >
               <Link to={'/cart'}><FaCartPlus style={{color:"white", fontSize:"30px"}}/></Link>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white fw-bold" href="#">Log out</a>
              </li>
          
            </ul>
          </div>
        </div>
      </nav>
      <Outlet/>
      </>
    )
}

export default NavBar