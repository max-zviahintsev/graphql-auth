import mongoose from 'mongoose'
const { Schema, model } = mongoose
import argon2 from 'argon2'
import { User } from '../types.ts'

const userSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await argon2.hash(this.password)
  next()
})

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await argon2.verify(this.password, candidatePassword)
}

const userModel = model<User>('User', userSchema, 'users')

export default userModel
