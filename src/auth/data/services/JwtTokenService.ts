import Jwt from 'jsonwebtoken'
import ITokenService from "../../services/ITokenService";

export default class JwtTokenService implements ITokenService {
    constructor(private readonly privatekey: string) {}
    encode(paylod: string | object): string | object {
        let token = Jwt.sign({ data: paylod}, this.privatekey, {
            issuer:'com.foodapp',
            expiresIn: '1h'
        })
        return token
    }
    decode(token: string): string | object {
        try{
            const decoded = Jwt.verify(token,this.privatekey) 
            return decoded
        }catch(err){
            return ''
        }
    }

}