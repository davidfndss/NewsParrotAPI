import mongoose from "mongoose"
import { findByIdService } from "../services/userService.js"

// Validates the id
const validId = ( req, res, next ) => {
  const { id } = req.params
  try {
    if(!mongoose.Types.ObjectId.isValid(id)){ // if id is invalid, return the message below
      return res.status(400).send({ message: "Usuário inválido" })
    }
    next()
  } catch (err) {
    res.status(500).send({message: err.message})
  }
}

// Validates the user
const validUser = async ( req, res, next ) => {
  const id = req.params.id
  try {   
    const user = await findByIdService(id)
    
    if(!user){return res.status(400).send({ message: "Usuário não encontrado" })}
  
    req.id = id
    req.user = user
    
    next()
  } catch (err) {
    res.status(500).send({message: err.message})
  }
}

export {
  validId,
  validUser
}