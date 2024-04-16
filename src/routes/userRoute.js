import { Router } from "express" // Router
import { create, findAll, checkUsername, checkEmail, findById, update } from "../controllers/userController.js" // Controllers
import { validId, validUser } from "../middlewares/globalMiddlewares.js" // Middlewares
import { authMiddleware } from "../middlewares/authMiddlewares.js"

const router = Router()

router.post("/signup", create) // Create user
router.get("/", authMiddleware, findAll) // Return an Array with all Users found on database

router.post("/check-username", checkUsername) // Checks if the username is available, returns boolean
router.post("/check-email", checkEmail) // Checks if the email is available, returns boolean

router.get("/:id", validId, validUser, findById) // Return the user with the _id corresponding to the :id param
router.patch("/:id", validId, validUser, authMiddleware, update) // Updates some fields of the user if approved on validation

export default router