import React, { Component } from 'react';
import axios from 'axios';

class Jokes extends Component {
    state = {
        jokes: []
    }
  render() {
    return (
      <div>
          <h2>List of Jokes</h2>
          <ul>
             {this.state.jokes.map(joke => (
                <li key={joke.id}>{joke.setup}<br /> {joke.punchline}</li>
             ))}
          </ul>
      
      </div>
    );
  }
  componentDidMount() {
      const token = localStorage.getItem('jwt');
      const endpoint = 'http://localhost:3300/api/jokes'
      const options = {
          headers: {
              Authorization: token,
          }
      };
      axios
      .get(endpoint, options)
      .then(res => {
          console.log(res.data);
          this.setState({ jokes: res.data})
      })
      .catch(err => {
          console.error('ERROR!', err)
      })
  }
}



export default Jokes;
