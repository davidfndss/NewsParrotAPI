import { config } from "dotenv"
import jwt from "jsonwebtoken"
import { findByIdService } from "../services/userService.js"

config()

const authMiddleware =  (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      return res.status(401).send({ message: "Não autorizado" })
    }

    const parts = authorization.split(" ")

    const [ schema, token ] = parts

    if (schema !== "Bearer") {
      res.status(401).send({ message: "Schema inválido" })
    }
    
    if (parts.length !== 2) {
      res.status(401).send({ message: "Token inválido" })
    }

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) {
        return res.status(401).send({message: "Token inválido ou expirado"})
      }
      const user = await findByIdService(decoded.id)

      if (!user || !user.id) {
        return res.status(401).send({message: "Token inválido"})
      }

      req.userId = user._id
      req.username = user.username
      return next()
    })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export {
  authMiddleware
}