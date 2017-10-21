import mongoose, { Schema } from 'mongoose'
import validator from 'validator'

import { passwordReg } from './user.validations'

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    trim: true,
    validate: {
      validate(email) {
        return validator.isEmail(email)
      }, 
      message: '{VALUE} is not a valid email!'
    },
  },
  firstName: {
    type: String,
    required: [true, 'FirstName is required!'],
    trime: true,
  },
  lastName: {
    type: String,
    required: [true, 'LastName is required!'],
    trime: true,
  },
  userName: {
    type: String,
    required: [true, 'UserName is required!'],
    trime: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    trim: true,
    minlength: [6, 'Password need to be longer!'],
    validate: {
      validator(password){
        return passwordReg.test(password)
      },
      message: '{VALUE} is not a valid password!'
    },
  },
});

export default mongoose.model('User', UserSchema)