import mongoose from "mongoose"
const Schema = mongoose.Schema

import bcrypt from "bcrypt"

const UserSchema = new Schema({
  name: { 
    type: String, 
    required:true 
  },
  username: { 
    type: String, 
    unique:true,
    required:true 
  },
  email: { 
    type: String, 
    unique:true,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false // Hides the password on database queries
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  avatar: { 
    type: String, 
    default: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106"
  },
  background: { 
    type: String, 
    default: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
  }
});

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
}) // the pre function calls a middleware before the operation on the first parameter (ex: "save")

const User = mongoose.model('User', UserSchema);

export default User 