export type Response = express.Response
export type Request = express.Request

export interface User extends mongoose.Document {
  id: number
  username: string
  email: string
  password: string
  comparePassword: (password: string) => Promise<Boolean>
}
