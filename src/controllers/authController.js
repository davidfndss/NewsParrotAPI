import { loginService } from "../services/authService.js"

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const logUserResponse = await loginService(email, password)
    res.status(200).send(logUserResponse)
  } catch (err) {
    res.status(err.statusCode).send({message: err.message})
  }
}

export { login } 