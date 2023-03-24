const Router = require('express').Router()
const controller = require('../controllers/PostController')

Router.post('/:userId',controller.CreatePost)

module.exports = Router