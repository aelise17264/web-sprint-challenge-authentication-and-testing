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


function findById(id){
    return db('users').where({id}).first()
}

async function addUser(user){
    const [id] = await db('users').insert(user)
    return findById(id)
}