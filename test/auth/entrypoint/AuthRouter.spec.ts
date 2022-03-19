import express from 'express'
import AuthRepository from '../../../src/auth/data/repository/AuthRepository'
import BcryptPasswordService from '../../../src/auth/data/services/BcryptPasswordService'
import JwtTokenService from '../../../src/auth/data/services/JwtTokenService'
import IAuthRepository from '../../../src/auth/domain/IAuthRepository'
import AuthRouter from '../../../src/auth/entrypoint/AuthRouter'
import FakeRepository from '../helpers/FakeRepository'
import request from 'supertest'
import { expect } from 'chai'

describe('AuthRouter' , ()=> {
    let repository: IAuthRepository
    let app: express.Application

    const user = {
        email: 'lyn@mail.com',
        id: '123',
        name: 'barrel',
        password: 'pass123',
        type: 'email'
    }

    beforeEach(()=>{
        repository = new FakeRepository()
        let tokenService = new JwtTokenService('privatekey')
        let passwordService = new BcryptPasswordService()

        app = express()
        app.use(express.json())
        app.use(express.urlencoded({extended: true}))
        app.use(
            '/auth', AuthRouter.configure(repository, tokenService, passwordService)
        )
    })

    it('sould return 404 when user id is not found', async()=> {
        await request(app).post('/auth/signin').send({}).expect(404)
    })


    it('sould return 200 when user id is found', async()=> {
        await request(app).post('/auth/signin').send({
            email: user.email , password: user.password
        }).set('Accept' , 'application/json')
        .expect('Content-type' , /json/)
        .expect(200)
        .then((res) => {
            expect(res.body.auth_token).to.not.be.empty
        })
    })
    it('should return errors', async () => {
        //act
        await request(app)
          .post('/auth/signup')
          .send({ email: '', password: user.password, auth_type: 'email' })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(422)
          .then((res) => {
            expect(res.body.errors).to.not.be.empty
          })
      })

    it('sould create user and return token', async()=> {
        let email = 'my@email.com'
        let name = 'test user'
        let password = 'pass123'
        let type = 'email'
        await request(app).post('/auth/signup').send({
            name:name, email: email , password: password,auth_type:type
        }).set('Accept' , 'application/json')
        .expect('Content-type' , /json/)
        .expect(200)
        .then((res) => {
            expect(res.body.auth_token).to.not.be.empty
        })
    })
})