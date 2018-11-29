import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
    state = {
        username: '',
        password:'',
    }

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
              <div>
                  <label htmlFor="username">Username</label>
              <input 
              name="username" 
              value={this.state.username}
              onChange={this.handleInputChange} 
              type="text"
              />
              </div>
              <div>
                  <label htmlFor="password">Password</label>
                  <input
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  type="password"
                  />
              </div>
              <div>
                  <button type="submit">Sign Up</button>
              </div>

          </form>
      </div>
    );
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value})
}
  handleSubmit = event => {
      event.preventDefault();
      const endpoint = 'http://localhost:3300/api/register'
      axios
      .post(endpoint, this.state)
      .then(res => {
          localStorage.setItem('jwt', res.data.token)
          this.props.history.push('/jokes');
      })
      .catch(err => {
          console.error('ERROR!', err)
      })
  }
}

export default Signup;
