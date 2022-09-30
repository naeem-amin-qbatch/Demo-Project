import { BrowserRouter as Router, Route, Routes, useRouteMatch, useParams } from "react-router-dom";
import './App.css';
import Register from './components/sign-up/sign-up';
import Login from './components/login/login';
import HomePage from './components/home-page/home-page';
import NavBar from "./components/navbar/navbar";
import MyDrawer from "./components/drawer/drawer";
import Cart from "./components/cart/cart";
import { Link } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/navbar' element={<NavBar />} />
        <Route path="home" element={<HomePage />}>
          <Route path='home/details/:id' element={<MyDrawer />} />
        </Route>
        <Route path='cart' element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;