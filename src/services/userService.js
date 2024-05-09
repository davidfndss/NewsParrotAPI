import { createRepository, findByUsernameRepository, checkEmailRepository,  findByIdRepository, updateRepository } from "../repositories/userRepository.js"
import { generateToken } from "./authService.js"

const createService = async (body) => {
  const { name, username, email, password, avatar, background } = body;
  if (!name || !username || !email || !password) throw new Error("Preencha todos os campos para efetuar o registro")

  const existingUsername = await findByUsernameRepository( username )
  if (existingUsername) throw new Error("Já existe outra conta com este nome de usuário")

  const existingEmail = await checkEmailRepository( email )
  if (existingEmail) throw new Error("Já existe outra conta com este E-mail")

  const user = await createRepository(body)
  if (!user) throw new Error("Não foi possível criar usuário")

  const token = generateToken(user._id)

  return {
    message: "usuário registrado com sucesso",
    user: {
      id: user._id,
      name,
      username,
      email,
      avatar,
      background
    },
    token
  }
}

const checkUsernameService = async (username) =>  {
  if (username.length < 3) {
    return { usernameAvailable: false }
  }
  const user = await findByUsernameRepository(username)
  
  if(user) {
    return({ usernameAvailable: false })
  } else {
    return({ usernameAvailable: true })
  }
}

const checkEmailService = async (email) =>  {
  const user = await checkEmailRepository(email)
  return user
}

const findByIdService = async (paramsId, userId) => {
  
  if (!paramsId) throw new Error("Envie um id pelos parâmetros para buscar pelo usuário")

  const user = await findByIdRepository(paramsId)
  if (!user) throw new Error("Usuário não encontrado")
  
  if(!userId || paramsId === userId) {
    return user
  } else {
    // If its not the Own user searching, the response will contain only the fields: id, name, username, avatar and background
    return {
      id: user._id,
      name: user.name,
      username: user.username, 
      avatar: user.avatar, 
      background: user.background
    }
  } 
}

const findByUsernameService = async (username) => {
  
  if (!username) throw new Error("Envie um nome de usuário pelos parâmetros para buscar pelo usuário")

  const user = await findByUsernameRepository(username)
  if (!user) throw new Error("Usuário não encontrado")
  
  // If its not the Own user searching, the response will contain only the fields: id, name, username, avatar and background
  return {
    id: user._id,
    name: user.name,
    username: user.username, 
    avatar: user.avatar, 
    background: user.background
  }
  
}

const updateService = async (loggedUserId, userIdToUpdate, body) => {
  if (String(loggedUserId) !== userIdToUpdate) throw new Error("Você não possui permissão para atualizar este usuário")
  const {name, username, email, password, avatar, background} = body
  if (!name && !username && !email && !password && !avatar && !background) throw new Error("Preencha pelo menos um campo para atualizar o cadastro")
  const updatedUser = await updateRepository(
    userIdToUpdate,
    name,
    username,
    email,
    password,
    avatar,
    background
  )
  return { updatedUser, message: "Usuário atualizado com sucesso" }
}

export { createService,  checkUsernameService, checkEmailService, findByIdService, findByUsernameService, updateService }