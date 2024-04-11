import { createService, findAllService, findByIdService, updateService } from "../services/userService.js"

const create = async (req, res) => {
  const body = req.body;
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

const findById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await findByIdService(id)
    res.send(user)
  } catch (err) {
    res.status(500).send({message: err.message })
  }
}

const update = async (req, res) => {
  const loggedUserId = req.userId
  const userIdToUpdate = req.id
  const body = req.body
  
  try {
    const successMsg = await updateService(loggedUserId, userIdToUpdate, body) 
    res.send(successMsg)
  } catch (err) {
    res.status(500).send({message: err.message })
  }
}

export { create, findAll, findById, update }