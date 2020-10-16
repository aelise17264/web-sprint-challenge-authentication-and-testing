const db = require('../database/dbConfig')

module.exports = {
    find,
    addUser,
    findUserBy,
    findById
}

function find(){
    return db('users').select('id', 'username').orderBy('id')
}

function findUserBy(filter){
    return db('users').where(filter)
}

function addUser(user){
return db('users').insert(user)
}

function findById(id){
    return db('users').where({id}).first()
}