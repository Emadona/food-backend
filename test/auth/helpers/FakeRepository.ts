import IAuthRepository from "../../../src/auth/domain/IAuthRepository"; 
import User from "../../../src/auth/domain/User";
export default class FakeRepository implements IAuthRepository {

    public users = [
        {
            email: 'lyn@mail.com',
            name: 'barrel',
            id: '123',
            password: 'pass123',
            type: 'email'
        },
        {
            email: 'hftyjghvngchty0.com',
            name: 'pen',
            id: '1235',
            password: 'ghfyjujhvngcht67tuhght6r7u',
            type: 'google',
        }
    ]

public async find(email: string): Promise<User> {
        const user = this.users.find((x) => x.email === email)
        if(!user) return Promise.reject('User not found')

        return new User(
            user?.id,
            user?.name,
            user?.email,
            user?.password,
            user?.type
        )
    }
public async add(name: string, email: string, password: string, type: string): Promise<string> {
        const max = 9999
        const min = 1000
        const id =(Math.floor(Math.random() * (+max - +min))+ +min).toString()

        this.users.push({
            email: email,
            name: name,
            id: id,
            password: password,
            type: type
        })
        return id
    }
    
}