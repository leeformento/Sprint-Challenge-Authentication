import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Jokes from './jokes/Jokes';
import './App.css';
import Signin from './auth/Signin';
import Signup from './auth/Signup';

const Home = props => {
  return (
    <div>
      <h1> Home </h1>
    </div>
  )
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to="/" exact>Home</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/jokes">Jokes</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/signin">Sign In</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/signup">Sign Up</NavLink>
            &nbsp;|&nbsp;
             <button onClick={this.signout}>Sign Out</button>
            </nav>
            <main>
              <Route path="/" component={Home} exact />
              <Route path="/jokes" component={Jokes} />
              <Route path="/signin" component={Signin} />
              <Route path="/signup" component={Signup} />
          </main>
          </header>
      </div>
    );
  } 
   signout = props => {
    localStorage.removeItem('jwt');
    window.location.reload();
  }
}

export default App;
