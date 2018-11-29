const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/dbConfig');

const { authenticate, generateToken } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function test(req, res){
  res.send('Wazahh!');
}

function register(req, res) {
  // implement user registration
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hash;
  db('users')
  .insert(credentials)
  .then(ids => {
      const id = ids[0];
      db('users')
      .where({ id: id})
      .then(response => {
        const token = generateToken(response[0]);
        res.status(201).json({ username: credentials.username, token });
        console.log(credentials.username);
      })
      .catch(err => {
        console.error(err)
        res.status(500).json({message: 'You cant register'});
      });
    })
}

function login(req, res) {

}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
  }