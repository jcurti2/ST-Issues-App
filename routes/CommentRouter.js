const Router = require('express').Router()
const controller = require('../controllers/CommentController')

Router.post('/:userId/:postId',controller.CreateComment)
Router.get('/:postId', controller.GetPostComments)

module.exports = Router