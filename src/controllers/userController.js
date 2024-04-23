import { validData } from "../middlewares/userMiddlewares.js";
import { createService, findAllService, checkUsernameService, checkEmailService, findByIdService, findByUsernameService, updateService } from "../services/userService.js"

const create = async (req, res) => {
  const body = req.body;
  const validation = validData(body)
  
  if( validation.length > 0) {
    return res.status(400).send({ errors: validation })
  }

  try {
    const user = await createService(body)
    res.status(201).send(user)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const findAll = async (req, res) => {
  try {
    const users = await findAllService()
    res.send(users)
  } catch (err) {
    res.status(500).send({message: err.message })
  }
}

const checkUsername =  async (req, res) => {
  const { username } = req.body
  try {
    const response = await checkUsernameService(username)
    res.send(response)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const checkEmail =  async (req, res) => {
  const { email } = req.body
  try {
    const user = await checkEmailService(email)
    if(user) {
      res.send({ emailAvailable: false })
    } else {
      res.send({ emailAvailable: true })
    }
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const findById = async (req, res) => {
  try {
    const user = await findByIdService(
      req.params.id, 
      String(req.userId)
    )
    res.send(user)
  } catch (err) {
    res.status(500).send({message: err.message })
  }
}

const findByUsername = async (req, res) => {
  try {
    const user = await findByUsernameService(req.params.username)
    res.send(user)
  } catch (err) {
    res.status(500).send({message: err.message })
  }
}

const update = async (req, res) => {
  const loggedUserId = req.userId
  const userIdToUpdate = req.id
  const body = req.body

  validData(body)
  
  try {
    const successMsg = await updateService(loggedUserId, userIdToUpdate, body) 
    res.send(successMsg)
  } catch (err) {
    res.status(500).send({message: err.message })
  }
}

export { create, findAll, checkUsername, checkEmail, findById, findByUsername, update }