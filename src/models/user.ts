import { Schema, model } from 'mongoose'
import { User } from '../types'
import bcrypt from 'bcryptjs'

const UserSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

UserSchema.pre('save', function (next) {
  const user = this

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError)
          }
          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

UserSchema.methods.comparePassword = async function(password: string): Promise<Boolean> {
  return await bcrypt.compare(password, this.password)
}

const UserModel = model<User>('UserModel', UserSchema)

export default UserModel
