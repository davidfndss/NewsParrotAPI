import { createRepository, findAllRepository, checkUsernameRepository, checkEmailRepository, findByIdRepository, updateRepository } from "../repositories/userRepository.js"
import { generateToken } from "./authService.js"

const createService = async (body) => {
  const { name, username, email, password, avatar, background } = body;
  if (!name || !username || !email || !password) throw new Error("Preencha todos os campos para efetuar o registro")

  const existingUsername = await checkUsernameRepository( username )
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
      background,
    },
    token
  }
}

const findAllService = async () => {
  const users = await findAllRepository()
  if (users.length == 0) throw new Error("Não existe usuários cadastrados")
  return users
}

const checkUsernameService = async (username) =>  {
  if (username.length < 3) {
    return { usernameAvailable: false }
  }

  const user = await checkUsernameRepository(username)
  return user
}

const checkEmailService = async (email) =>  {
  const user = await checkEmailRepository(email)
  return user
}

const findByIdService = async (id) => {
    const user = await findByIdRepository(id)
    return user
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

export { createService, findAllService, checkUsernameService, checkEmailService, findByIdService, updateService }