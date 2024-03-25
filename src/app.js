import express from "express"
import cors from "cors"
import connectDatabase from "./database/db.js"
import { router } from "./routes/index.js"

const app = express()

// Config
  // Cors 
  app.use(cors()) // To avoid the Error: Access to XMLHttpRequest at ... has been blocked by CORS policy
  // Database
  connectDatabase()
  // Express
  app.use(express.json()) //this allows the api to send and receive json files
  app.use(express.urlencoded({ extended: true })); //  handle URL-encoded form data with extended parsing capabilities
  // Routes
  app.use(router)

export { app }