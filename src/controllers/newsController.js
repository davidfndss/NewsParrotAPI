import { createService, findAllService, topNewsService, findByIdService, updateService, deleteByIdService, searchByTitleService, findByUserIdService, likeNewsService, addCommentService, deleteCommentService } from "../services/newsService.js"

const create = async (req, res) => {
  const { title, text, banner } = req.body 
  const userId = req.userId
  try {
    const News = await createService(userId, title, text, banner)
    return res.status(200).send({ message: "Postado com sucesso", News: News })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const findAll = async (req, res) => {
    let { limit, offset } = req.query //gets the limit and offset values from the query params as strings
    const currentUrl = req.baseUrl
  try { 
    const news = await findAllService(offset, limit, currentUrl)
    return res.send(news)
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
}

const topNews = async (req, res) => {
  try {
    const news = await topNewsService()
    return res.send(news)
  } catch (err) {
    res.status(500).send({message: err.message})
  }
}

const findById = async (req, res) => {  
  const id = req.params.id
  try { 
    const news = await findByIdService(id)
    return res.status(200).send(news)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const update = async (req, res) => {
  const { id } = req.params
  const { title, text, banner } = req.body
  const userId = req.userId
  try { // Arrume isso aqui que ta dando ruim
    const news = await updateService(id, title, text, banner, userId)
    return res.send({ 
      message: "Post atualizado com sucesso!", 
      news
    })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const deleteById = async (req, res) => {
  const { id } = req.params
  const userId = req.userId
  try { 
    const successfulyDeletedMessage = await deleteByIdService(id, userId)

    return res.send(successfulyDeletedMessage)
  } catch (err) {
    res.status(500).send({message: err.message })
  }
}

const searchByTitle = async (req, res) => {
  const { title } = req.query
  try { 

    const news = await searchByTitleService(title)

    return res.send(news)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const findByUserId = async (req, res) => {
  const { id } = req.params
  try { 

    const news = await findByUserIdService(id)

    return res.send(news)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const likeNews = async (req, res) => {
  const newsId = req.params.id
  const { userId, username } = req
  try {
    const newsLiked = await likeNewsService(newsId, userId, username)
    
    res.status(200).send(newsLiked)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const addComment = async (req, res) => {
  const newsId = req.params.id
  const userId = req.userId
  const { comment } = req.body
  try {
    const successMsg = await addCommentService(newsId, userId, comment)
    res.status(200).send(successMsg)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const deleteComment = async (req, res) => {
  const { newsId, commentId } = req.params
  const userId = req.userId
  try {
    const successMsg = await deleteCommentService(newsId, commentId, userId)
    
    return res.send(successMsg)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export { create, findAll, topNews, findById, update, deleteById, searchByTitle, findByUserId, likeNews, addComment, deleteComment }