const router = require('express').Router()
const Users = require('./user-model')

router.get('/', (req, res) => {
    Users.find()
    .then(users => {
        res.json(users)
    })
    .catch(error => res.json({message: error.message}))
})
module.exports = router