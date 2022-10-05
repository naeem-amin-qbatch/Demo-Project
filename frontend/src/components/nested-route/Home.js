import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Home() {
  return (
    <>
    <div>Home Page</div>
    <div>nkdbvjbj n n
        vnjbvjvbjfv
        vfdn jfjvnjfnvfjnjvnjvnjvnfjvnfjnvfjnvjfnvjfjjfvjfvjsnvjvnjnvjkfnvjkfv
    </div>
    <Link to={'about'} className="me-3">About</Link>
    <Link to={'post'}>Post</Link>

    <Outlet/>
    </>
  )
}

export default Home