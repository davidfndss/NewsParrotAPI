import { Router } from "express"
const router = Router()

import userRoute from "./userRoute.js"
import authRoute from "./authRoute.js"
import newsRoute from "./newsRoute.js"
import swaggerRoute from "./swaggerRoute.cjs"

router.use("/user", userRoute)
router.use("/login", authRoute)
router.use("/news", newsRoute)
router.use("/doc", swaggerRoute)

export { router }