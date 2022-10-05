import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
function Post() {
  return (
    <div>
    <div>Post page</div>
    <Link to={'detail'}>Post details</Link>
    <Outlet/>
    </div>
  )
}

export default Post