const { Post } = require('../models')

const CreatePost = async (req, res) => {
    try {
        let userId = parseInt(req.params.userId)
        let postBody = {
            userId,
            ...req.body,
        }
        let post = await Post.create(postBody)
        res.send(post)
    } catch (error) {
        throw error
    }
}

const GetAllPosts = async (req,res) => {
    try{
        let posts = await Post.findAll()
        res.send(posts)
    } catch (error){
        throw error
    }
}

const GetPostById = async (req, res) => {
  try {
    const id = req.params.id
    const user = await Post.findOne({ where: {id:id} })
    res.send(user)
  } catch (error) {
    throw error
  }
}

const DeleteUserPost = async (req, res) => {
    try {
      let id = +req.params.id
      await Post.destroy({ where: { id: id } })
      res.send({ message: `Deleted post with an id of ${id}` })
    } catch (error) {
      throw error
    }
  }
  
  const UpdateUserPost = async (req, res) => {
    try {
      let id = parseInt(req.params.id)
      let UpdatedPost = await Post.update(req.body,{
        where: { id: id },
        returning: true
      })
      res.send(UpdatedPost)
    } catch (error) {
      throw error
    }
  }

module.exports = {
    CreatePost,
    GetAllPosts,
    DeleteUserPost,
    UpdateUserPost,
    GetPostById
}