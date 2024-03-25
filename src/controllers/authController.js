import { loginService } from "../services/authService.js"

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const token = await loginService(email, password)
    res.status(200).send({token: token})
  } catch (err) {
    res.status(500).send({message: err.message})
  }
}

export { login } 