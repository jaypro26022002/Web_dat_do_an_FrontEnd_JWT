import './App.scss';
import Nav from './components/Navigation/Navi';
import Login from './components/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Register from './components/Register/Register';


function App() {
  return (
    <Router>
      <div className='app-container'>
        {/* <Nav /> */}
        <Switch>
          <Route path="/news">
            News
          </Route>
          <Route path="/contact">
            Contact
          </Route>
          <Route path="/about">
            About
          </Route>
          <Route path="/" exact>
            Home
          </Route>
          <Route path="/register" >
            <Register />
          </Route>
          <Route path="/login" >
            <Login />
          </Route>
          <Route path="*">
            Not found 404
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
