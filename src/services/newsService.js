import {
  createRepository,
  findAllRepository,
  countNewsRepository,
  findByIdRepository,
  topNewsRepository,
  updateRepository,
  deleteByIdRepository,
  searchByTitleRepository,
  findByUserIdRepository,
  likeNewsRepository,
  dislikeNewsRepository,
  addCommentRepository,
  deleteCommentRepository
} from "../repositories/newsRepository.js";

const createService = async (userId, title, text, banner) => {
  if (!userId || !title || !text || !banner)
    throw new Error("Preencha todos os campos antes de enviar post");

  const News = await createRepository({
    user: userId,
    title,
    text,
    banner,
  });

  return News;
};

const findAllService = async (limit, offset, currentUrl) => {
  // offset == starter point, limit == maximum number of items.
  // convert the strings to numbers
  limit = Number(limit);
  offset = Number(offset);

  if (!limit) {
    limit = 5;
  }
  if (!offset) {
    offset = 0;
  }

  const news = await findAllRepository(offset, limit);
  const total = await countNewsRepository();

  const next = offset + limit;
  const nextUrl =
    next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl =
    previous != null
      ? `${currentUrl}?limit=${limit}&previous=${previous}`
      : null;

  return {
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,
    results: news.map((item) => ({
      id: item._id,
      title: item.title,
      text: item.text,
      banner: item.banner,
      likes: item.likes,
      comments: item.comments,
      name: item.user.name,
      username: item.user.username,
      userAvatar: item.user.avatar,
    })),
  };
};

const topNewsService = async () => {
  const news = await topNewsRepository();

  if (!news) throw new Error("Não tem nenhum post registrado");

  return {
    news: {
      id: news.id,
      title: news.title,
      text: news.text,
      banner: news.banner,
      likes: news.likes,
      comments: news.comments,
      name: news.comments,
      username: news.username,
      avatar: news.avatar,
    },
  };
};

const findByIdService = async (id) => {
  const news = await findByIdRepository(id);

  if (!news) throw new Error("Noticia inexistente");

  return { news };
};

const updateService = async (id, title, text, banner, userId) => {
  if (!title && !banner && !text)
    throw new Error("Preencha pelo menos um campo para atualizar");

  const news = await findByIdRepository(id);

  if (!news ) throw new Error("Não foi possível atualizar a notícia");

  if (String(news.user._id) !== String(userId)) throw new Error("Você não possui autorização para atualizar essa notícia");

  const updatedNews = await updateRepository(id, title, text, banner);

  return updatedNews;
};

const deleteByIdService = async (id, userId) => {
  const news = await findByIdRepository(id);
  if (!news) {
    throw new Error("Não foi possível encontrar a notícia")
  } else {
    if (String(news.user._id) !== String(userId)) {

      throw new Error("Você não possui permissão para excluir essa notícia") 
    } else {
      await deleteByIdRepository(id);
      return {
        message: "Notícia excluída com sucesso!",
      }
    }
  }
}

const searchByTitleService = async (title) => {

    const news = await searchByTitleRepository(title);

    if (news.length === 0) {
      return { message: "Não foi encontrada nenhuma notícia com esse título" }
    }
  
    return {
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        username: item.user.username,
        userAvatar: item.user.avatar,
      }))
    }
  
};

const findByUserIdService = async (id) => {

    const news = await findByUserIdRepository(id);

    return {
      results: news.map((item) => ({
        id: item._id,
        title: item.title,
        text: item.text,
        banner: item.banner,
        likes: item.likes,
        comments: item.comments,
        name: item.user.name,
        username: item.user.username,
        userAvatar: item.user.avatar,
      })),
    }
};

const likeNewsService = async (newsId, userId, username) => {
    const newsLiked = await likeNewsRepository(newsId, userId, username);

    if (!newsLiked) {
      await dislikeNewsRepository(newsId);
      return { message:"Curtida removida com sucesso!"}
    };
    
    return { message: "Notícia curtida com sucesso!" }
};

const addCommentService = async (newsId, userId, comment) => {

    if (!comment) {
      throw new Error("Escreva uma mensagem para comentar")
    }

    await addCommentRepository(newsId, userId, comment);

    return { message: "comentário adicionado com sucesso!" }
}

const deleteCommentService = async (newsId, commentId, userId) => {
  const news = await findByIdRepository(newsId)
  if (!news) throw new Error("Noticia inexistente")
  
  const comment = news.comments.find( comment => comment.commentId === commentId )

  if (!comment || !commentId) throw new Error("Comentário inválido")

  if (String(comment.userId) !== String(userId)) throw new Error("Você não pode deletar este comentário")

  await deleteCommentRepository( newsId, commentId, userId);

  return { message: "Comentário removido com sucesso!" };
};

export {
  createService,
  findAllService,
  topNewsService,
  findByIdService,
  updateService,
  deleteByIdService,
  searchByTitleService,
  findByUserIdService,
  likeNewsService,
  addCommentService,
  deleteCommentService,
};
