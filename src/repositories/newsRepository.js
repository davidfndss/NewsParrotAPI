import News from "../models/News.js"

const createRepository = (body) => {
  return News.create(body)
}

const findAllRepository = (offset, limit) => {
  return News.find().sort({ date: -1 }).skip(offset).limit(limit).populate("user")
}

const countNewsRepository = () => {
  return News.countDocuments()
}

const findByIdRepository = (id) => {
  return News.findById({ _id: id }).populate("user")
}

const updateRepository = (id, title, text, banner) => {
  return News.findOneAndUpdate( // Finds one document with the ( _id === id ), the document will be updated with the new values for the fields title, text and banner, and will return the updated document
    { _id: id },
    { title, text, banner },
    { new: true, rawResult: true }
  )
}

const deleteByIdRepository = (id) => {
  return News.findByIdAndDelete({ _id: id })
}

const topNewsRepository = () => {
  return News.findOne().sort({ _id: -1 })
}

const searchByTitleRepository = (title) => {
  return News.find({
    title: {$regex: `${title || ""}`, $options: "i"},
  })
  .sort({_id: -1})
  .populate("user")
}

const findByUserIdRepository = (id) => {
  return News.find({ user: id }).sort({_id: -1}).populate("user")
}

const likeNewsRepository = (newsId, userId, username) => {
  return News.findOneAndUpdate({ _id: newsId, "likes.userId": { $nin: [userId] } }, // this filter dont let the user likes the post more than once
  { $push:
    { likes: { username, userId, createdAt: new Date() } } // pushes on the array likes, an object that contains the username, userId and the actual date
  })
}

// removes a like, if the user liked the post before
const dislikeNewsRepository = (newsId, userId) => {
  return News.findOneAndUpdate({ _id: newsId},
  { $pull:
    { likes: { userId } }
  })
}

const addCommentRepository = (newsId, userId, comment, user) => {
  // manually generates an ID for the comment
  const commentId = Math.floor(Date.now() * Math.random()).toString(36)

  return News.findOneAndUpdate({ _id: newsId }, 
  { $push:
    { comments: {  commentId, userId, comment, user, createdAt: new Date() } } 
  })
}

const deleteCommentRepository = (newsId, commentId, userId) => {
  return News.findOneAndUpdate({ _id: newsId }, 
  { $pull:
    { comments: { commentId, userId } } 
  })
}

export { createRepository, findAllRepository, countNewsRepository, findByIdRepository, updateRepository, deleteByIdRepository, topNewsRepository, searchByTitleRepository, findByUserIdRepository, likeNewsRepository, dislikeNewsRepository, addCommentRepository, deleteCommentRepository }