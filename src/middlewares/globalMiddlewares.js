import mongoose from "mongoose"
import { findByIdService } from "../services/userService.js"
import { AppError } from "../utils/AppError.js"

// Validates the id
const validId = ( req, res, next ) => {
  const { id } = req.params
  try {
    if(!mongoose.Types.ObjectId.isValid(id)){ // if id is invalid, return the message below
      throw new AppError(400, "Usuário inválido")
    }
    next()
  } catch (err) {
    res.status(err.statusCode).send({message: err.message})
  }
}

// Validates the user
const validUser = async ( req, res, next ) => {
  const id = req.params.id
  try {   
    const user = await findByIdService(id)
    
    if(!user) throw new AppError(404, "Usuário não encontrado")
  
    req.id = id
    req.user = user
    next()
  } catch (err) {
    res.status(err.statusCode).send({message: err.message})
  }
}

export {
  validId,
  validUser
}