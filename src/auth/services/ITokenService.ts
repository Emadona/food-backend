export default interface ITokenService {
    encode(paylod: string | object): string | object
    decode(token: string | object): string | object
}