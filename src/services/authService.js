import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { loginRepository } from "../repositories/authRepository.js"
import { AppError } from "../utils/AppError.js"

const secret = process.env.SECRET_JWT // Secret private key
const generateToken = (id) => jwt.sign({id: id}, secret, {expiresIn: 86400}) // the token lasts 24 hours


const loginService = async (email, password) => {
    const user = await loginRepository(email)
    if (!user) throw new AppError(400, "E-mail ou senha inválidos")

    const passwordIsValid = await bcrypt.compare(password, user.password)
    if(passwordIsValid === false) throw new AppError(400, "E-mail ou senha inválidos") 
  
    const token = generateToken(user.id)
    return {
      token: token,
      user: {
          id: user._id
      }
    }
}

export { loginService, generateToken }