import UserModel from '../models/user'
import { Response, Request, User } from '../types'
import jwt from 'jsonwebtoken'

const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body
  const user = await UserModel.findOne({ username: username })
  if (!user) {
    res.status(401).json({ msg: 'user not found' })
  }
  const isMatch = await user?.comparePassword(password)
  if (!isMatch) {
    res.status(401).json({ msg: 'user or password are wrong' })
  } else {
    const token = jwt.sign({ id: user!._id }, process.env.SECRET_JWT!, {
      expiresIn: 86400,
    })
    res.status(200).json({ token: token })
  }
}

const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body
    const newUser: User = await UserModel.create({
      username,
      email,
      password,
    })
    res.status(200).json({ newUser })
  } catch (error) {
    res.status(400).json({ error })
  }
}

export default { signin, signup }
