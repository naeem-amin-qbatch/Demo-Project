import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Register from './components/sign-up/sign-up';
import Login from './components/login/login';
import HomePage from './components/home-page/home-page';
import NavBar from "./components/navbar/navbar";
import Sidebar from "./components/product-details/product-details"; 
import Cart from "./components/cart/cart"
function App() {
  return (
    <Router>
      <Switch>
        <Route  path='/navbar'> <NavBar/></Route>
        <Route  exact path='/'><Login/></Route>
        <Route  path='/signup'><Register/></Route>
        <Route  path='/home'><HomePage/></Route>
        <Route  path='/details/:id'><Sidebar/></Route>
        <Route  path='/cart'><Cart/></Route>

    </Switch>
    </Router>
  );
}

export default App;