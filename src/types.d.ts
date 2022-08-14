export type Response = express.Response
export type Request = express.Request

export interface User {
    username: string, 
    email: string, 
    password: string
}