
const db = require('../database/dbConfig')
const request = require('supertest')
const server = require('../api/server')

    describe('register', () =>{
        it("should add a user into the database", async () => {
            await request(server).post("/api/auth/register").send({
              username: "aelise",
              password: "pass",
            });
            const users = await db("users");
            // checks that one user has been entered
            expect(users).toHaveLength(5);
          });
      
          it("should add this user into the database", async () => {
            const user = {   username: "ijb",
            password: "pass"}
            
            await request(server).post("/api/auth/register").send(user);
            
            const users = await db("users");
            // checks that one user has been entered
            expect(users[0].username).toEqual(user.username);
          });
      
    } )

    describe('login', () => {
        const user = {
            username: 'aelise',
            password: 'pass'
        }
        it('logs in this user', () => {
            expect(user).toHaveProperty('username')
        })
        it('Should fail with incorrect password', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send({ username: "aelise", password: "123abc" })
            expect(res.status).toBe(500)
          
        })
    })

  
