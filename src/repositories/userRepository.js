import User from "../models/User.js"

const createRepository = (body) => {
  return User.create(body)
}

const findAllRepository = () => {
  return User.find()
}

const checkUsernameRepository = (username) => {
  return User.findOne({ username })
}

const checkEmailRepository = (email) => {
  return User.findOne({ email })
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
  checkUsernameRepository,
  checkEmailRepository,
  findByIdRepository,
  updateRepository
}