const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const config = require('../api/config')

const Users = require('../users/user-model')

router.post('/register', (req, res) => {
  // implement registration
  let credentials = req.body;
  const hash = bcryptjs.hashSync(credentials.password, 12)
  credentials.password = hash

  Users.addUser(credentials)
  .then(user => {
    const token = getJwt(user)
    res.status(201).json({data: user, token})
  })
  .catch(error => {
    res.status(500).json({error: 'must enter a valid username and password'})
  })
});

router.post('/login', (req, res) => {
  // implement login
  const {username, password} = req.body

  if(req.body){
    Users.findUserBy({username: username})
    .then(([user]) => {
      if(user && bcryptjs.compareSync(password)){
        const token = getJwt(user)
        res.status(201).json({message: 'Welcome back', token})
      }else{
        res.status(401).json({message: 'Invalid credentials'})
      }
    })
    .catch(error => {
      res.status(500).json({message: error.message})
    })
  }else{
    res.status(400).json({message: 'please provide valid username and password'})
  }

});

function getJwt(user){
  const payload = {
    username : user.username,
    id : user.id
  }
  const jwtOptions = {
    expiresIn: '4h'
  }
  return jwt.sign(payload, config.jwtSecret, jwtOptions)
}


module.exports = router;
