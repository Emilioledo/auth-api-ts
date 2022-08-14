import UserModel from '../models/user'
import { Response, Request, User } from '../types'

const signin = (_: Request, res: Response) => {
  res.send('testing')
}

const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body
  try {
    const newUser: User = await UserModel.create({
      username,
      email,
      password,
    })
    res.status(200).json({newUser})
  } catch (error){
    console.log(error)
  }
}

export default { signin, signup }
