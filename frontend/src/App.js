import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Register from './components/sign-up/sign-up';
import Login from './components/login/login';
import HomePage from './components/home-page/home-page';
import NavBar from "./components/navbar/navbar";
function App() {
  return (
    <Router>
      <Switch>
      <Route  path='/navbar'> <NavBar /></Route>
        <Route  exact path='/'><HomePage /> </Route>
        <Route  path='/login'><Login /></Route>
        <Route  path='/signup'> <Register /></Route>
    </Switch>
    </Router>
  );
}

export default App;