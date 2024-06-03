import { Router } from "express" // Router
import {  create, findAll, topNews, findById, update, deleteById, searchByTitle, findByUserId,  likeNews, addComment, deleteComment } from "../controllers/newsController.js" // Controllers
import { authMiddleware } from "../middlewares/authMiddlewares.js"

const router = Router()

router.post("/add", authMiddleware, create) // Post news
router.get("/", findAll) // Get news with pagination, Starts at (takeoff) and returns (limit) news
router.get("/top", topNews) // Get the latest news posted

router.get("/search", searchByTitle) // Search news by the title query param
router.get("/search-by-user/:id", authMiddleware, findByUserId) // Search News posted by the user with the id param on the path

router.get("/:id", authMiddleware, findById) // Gets the news by id
router.patch("/update/:id", authMiddleware, update)// Update the news if authorized
router.delete("/delete/:id", authMiddleware, deleteById) // Delete the news if authorized

router.patch("/like/:id", authMiddleware, likeNews) // Like / unlike news

router.patch("/:id/comment", authMiddleware, addComment) // comment news
router.patch("/:newsId/comment/:commentId/delete", authMiddleware, deleteComment) // delete comment from news

export default router