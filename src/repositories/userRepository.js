import User from "../models/User.js"

const createRepository = (body) => {
  return User.create(body)
}

const findAllRepository = () => {
  return User.find()
}

const findByIdRepository = (id) => {
  return User.findById(id)
}

const updateRepository = (id, name, username, email, password, avatar, background) => {
   return User.findOneAndUpdate({ _id: id },{ name, username, email, password, avatar, background })
}


export {
  createRepository,
  findAllRepository,
  findByIdRepository,
  updateRepository
}