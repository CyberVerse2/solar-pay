import { Schema, model } from "mongoose";
import { DatabaseError } from "../../common/utils/appError.js";

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.post('save', (error, doc, next) => {
  if (error.name = 'MongoError' && error.code === 11000) {
    throw new DatabaseError('Duplicate Key error')
  }
})

const UserModel = model('User', userSchema)
export default UserModel