// import 'mocha'
// import chai, { expect } from 'chai'
// import SignInUseCase from '../../../src/auth/usecases/SignInUseCase'
// import IAuthRepository from '../../../src/auth/domain/IAuthRepository'
// import IPasswordService from '../../../src/auth/services/IPasswordService'
// import FakeRepository from '../helpers/FakeRepository'
// import FakePasswordService from '../helpers/FakePassWordService'
// import chaiAsPromised from 'chai-as-promised'

// chai.use(chaiAsPromised)

// describe('SignInUseCase', ()=> {
//     let sut: SignInUseCase
//     let repository: IAuthRepository
//     let passwordService: IPasswordService

//     const user = {
//         email: 'bnguihjby7.com',
//         name: 'ken',
//         id: '1234',
//         password: 'yukgjmhvgcgrd5e6r7tuyggr5e6r7u',
//         type: 'email',
//     }

//     beforeEach(() =>{
//         repository = new FakeRepository()
//         passwordService = new FakePasswordService()
//         sut = new SignInUseCase(repository, passwordService)
//     })

//     it('should throw error when user is not found', async () =>{
//         const user = {email: 'wrong@email.com', password: '1234'}

//         await expect(sut.execute(user.email,user.password)).to.be.rejectedWith('User not found')
//     })

//     it('should return user id when email and password is correct', async () =>{
//         const id = await sut.execute(user.email, user.password)
//         expect(id).to.be.equal(user.id)

    
//     })

//     it('should return user id when email is correct and type is not email', async () =>{
//         const id = await sut.execute(user.email, '')
//         expect(id).to.be.equal(user.id)

    
//     })
// })