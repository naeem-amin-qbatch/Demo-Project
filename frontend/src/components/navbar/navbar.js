import React from "react"
import {FaCartPlus} from "react-icons/fa"
import { Link } from "react-router-dom"

const NavBar = () => {

    return (
        <>
        <nav class="navbar navbar-expand-lg navbar-light bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand text-white fw-bold" href="#">Ecommerce</a>
          
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse  justify-content-end me-4" id="navbarNav">
            <ul class="navbar-nav ">
              <li class="nav-item me-2" >
               <Link to={'/cart'}><FaCartPlus style={{color:"white", fontSize:"30px"}}/></Link>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white fw-bold" href="#">Log out</a>
              </li>
          
            </ul>
          </div>
        </div>
      </nav>
      </>
    )
}

export default NavBar