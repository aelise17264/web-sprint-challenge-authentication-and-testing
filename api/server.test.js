const supertest = require('supertest')
const server = require('./server')

describe('server.js', () => {
    describe('Get /', () => {
        it('should return 200 ok', () => {
            return supertest(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
    })
})
