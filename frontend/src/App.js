import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Register from './components/sign-up/sign-up';
import Login from './components/login/login';
import HomePage from './components/home-page/home-page';
import NavBar from "./components/navbar/navbar";
import MyDrawer from "./components/drawer/drawer";
import Cart from "./components/cart/cart";
import PageNotFound from "./components/page-not-found/page-not-found";

import Home from "./components/nested-route/Home";
import About from "./components/nested-route/About";
import Post from "./components/nested-route/Post";
import Detail from "./components/nested-route/postdetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/navbar' element={<NavBar />} />
        <Route path="/home" element={<HomePage />} />
        <Route path='/details/:id' element={<MyDrawer />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<PageNotFound />} />
       
        <Route path='/main' element={<Home />} >
          <Route path='about' element={<About />} />
          <Route  path='post' element={<Post />}>
            <Route path='detail' element={<Detail />} />
          </Route>
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;