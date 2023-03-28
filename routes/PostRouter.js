const Router = require('express').Router()
const controller = require('../controllers/PostController')

Router.post('/:userId',controller.CreatePost)
Router.get('/', controller.GetAllPosts)
Router.delete('/:id', controller.DeleteUserPost)
Router.put('/:id', controller.UpdateUserPost)
Router.get('/:id', controller.GetPostById)
// Router.get('/:userId', controller.GetPostByUser)

module.exports = Router